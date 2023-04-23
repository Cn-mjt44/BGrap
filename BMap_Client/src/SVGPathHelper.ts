

interface SVGPathNode{
    vectorInfoAt(t:number,x:number,y:number,dx:number,dy:number,index:number,path:SVGPath):{x:number,y:number,dx:number,dy:number}
}

class MoveToAbs implements SVGPathNode
{
    public x:number;
    public y:number;

    constructor(x : number | string,y : number | string)
    {
        if(x != null && x != undefined && y != null && y != undefined)
        {
            this.x = Number(x);
            this.y = Number(y);
        }
        else throw "not support " + (typeof x) + " or " + (typeof y)
    }
    vectorInfoAt(): { x: number; y: number; dx: number; dy: number; } {
        return {x:this.x,y:this.y,dx:0,dy:0};
    }

    toString()
    {
        return "M" + this.x  + "," + this.y;
    }
}

class MoveToRel implements SVGPathNode
{
    public dx:number;
    public dy:number;

    constructor(dx:number | string,dy:number | string)
    {
        if(dx != null && dx != undefined && dy != null && dy != undefined)
        {
            this.dx = Number(dx);
            this.dy = Number(dy);
        }
        else throw "not support " + (typeof dx) + " or " + (typeof dy)
    }
    vectorInfoAt(t: number, x: number, y: number): { x: number; y: number; dx: number; dy: number; } {
        return {x:this.dx + x,y:this.dy + y,dx:0,dy:0};
    }

    toString()
    {
        return "m" + this.dx + "," + this.dy;
    }
}

class LineToAbs implements SVGPathNode
{
    public x:number | undefined;
    public y:number | undefined;
    constructor(x: number | string | undefined,y : number | string | undefined)
    {
        let err = true;
        if(x != null && x != undefined)
        {
            this.x = Number(x);
            err = false;
        }
        if(y != null && y != undefined)
        {
            this.y = Number(y);
            err = false;
        }
        if(err) throw "not support " + (typeof x) + " or " + (typeof y)
    }
    vectorInfoAt(t: number, x: number, y: number): { x: number; y: number; dx: number; dy: number; } {
        const dx = (this.x ?? x) - x;
        const dy = (this.y ?? y) - y;
        return {x:x + dx * t,y:y + dy * t,dx:dx,dy:dy};
    }

    toString() : string
    {
        if(this.x != null && this.x != undefined)
        {
            if(this.y != null && this.y != undefined)
            {
                return "L" + this.x + "," + this.y;
            }
            else
            {
                return "H" + this.x;
            }
        }
        else if(this.y != null && this.y != undefined)
        {
            return "V" + this.y;
        }
        return "";
    }
}

class LineToRel implements SVGPathNode
{
    public dx : number | undefined;
    public dy : number | undefined;

    constructor(dx : number | string | undefined,dy : number | string | undefined)
    {
        let err = true;
        if(dx != null && dx != undefined)
        {
            this.dx = Number(dx);
            err = false;
        }
        if(dy != null && dy != undefined)
        {
            this.dy = Number(dy);
            err = false;
        }
        if(err) throw "not support " + (typeof dx) + " or " + (typeof dy)
    }
    vectorInfoAt(t: number, x: number, y: number): { x: number; y: number; dx: number; dy: number; } {
        const dx = this.dx ?? 0;
        const dy = this.dy ?? 0;
        return {x:x + dx * t,y:y + dy * t,dx:dx,dy:dy};
    }

    toString()
    {
        if(this.dx != null && this.dx != undefined)
        {
            if(this.dy != null && this.dy != undefined)
            {
                return "l" + this.dx + "," + this.dy;
            }
            else
            {
                return "h" + this.dx;
            }
        }
        else if(this.dy != null && this.dy != undefined)
        {
            return "v" + this.dy;
        }
        return "";
    }
}

class BezierAbs_3p implements SVGPathNode
{
    public dcx: number;
    public dcy: number;
    public des_x: number;
    public des_y: number;
    private _scx: number | undefined;
    private _scy: number | undefined;
    public get scx(): number | undefined {
        return this._scx;
    }
    public set scx(value: number | string | undefined) {
        if(value != null && value != undefined)
        {
            this._scx = Number(value);
            if(this._scy== null || this._scy == undefined) this._scy = 0;
        }
        else
        {
            if(this._scx== null || this._scx == undefined) this._scx = null!;
            if(this._scy== null || this._scy == undefined) this._scy = null!;
        }
    }
    public get scy(): number | undefined {
        return this._scy;
    }
    public set scy(value: number | undefined) {
        if(value != null && value != undefined)
        {
            this._scy = Number(value);
            if(this._scx== null || this._scx == undefined) this._scx = 0;
        }
        else
        {
            if(this._scy== null || this._scy == undefined) this._scy = null!;
            if(this._scx== null || this._scx == undefined) this._scx = null!;
        }
    }
    public constructor(
        src_control_x: number | string | undefined,
        src_control_y: number | string | undefined,
        des_control_x: number | string,
        des_control_y: number | string,
        des_x: number | string,
        des_y: number | string
        )
    {
        if (
            des_control_x != null && des_control_x != undefined && 
            des_control_y != null && des_control_y != undefined &&
            des_x != null && des_x != undefined && 
            des_y != null && des_y != undefined
        )
        {
            this.dcx = Number(des_control_x);
            this.dcy = Number(des_control_y);
            this.des_x = Number(des_x);
            this.des_y = Number(des_y);
            if (
                src_control_x != null && src_control_x != undefined && 
                src_control_y != null && src_control_y != undefined 
            )
            {
                this.scx = Number(src_control_x);
                this.scy = Number(src_control_y);
            }
        }
        else throw "not support type in " + 
            (typeof des_control_x) + ", " + (typeof des_control_y) + ", " +
            (typeof des_x) + ", " + (typeof des_y)
    }

    vectorInfoAt(t:number,x:number,y:number,dx:number,dy:number,index:number,path:SVGPath):{x:number,y:number,dx:number,dy:number} {
        let _dx = 0;
        let _dy = 0;
        const prevNode = path.path[index - 1];
        if(
            prevNode != null && prevNode != undefined &&
            (
                prevNode.constructor == BezierAbs_3p || prevNode.constructor == BezierRel_3p ||
                prevNode.constructor == BezierAbs_2p || prevNode.constructor == BezierRel_2p
            )
        )
        {
            _dx = x + dx;
            _dy = y + dy;
        }
        const scx = this.scx ?? _dx;
        const scy = this.scy ?? _dy;
        const oneMineT = 1 - t;
        const oneMineT_3_t_0 = oneMineT * oneMineT * oneMineT;
        const oneMineT_2_t_1 = oneMineT * oneMineT * t;
        const oneMineT_1_t_2 = oneMineT * t * t;
        const oneMineT_0_t_3 = t * t * t;
        function c(p1: number,p2: number,p3: number,p4: number)
        {
            return p1 * oneMineT_3_t_0 + p2 * oneMineT_2_t_1 + p3 * oneMineT_1_t_2 + p4 * oneMineT_0_t_3;
        }
        const s1 =-oneMineT * oneMineT;
        const s2 = oneMineT * (1 - 3 * t);
        const s3 = t * (2 - 3 * t);
        const s4 = t * t;
        function dc(p1: number,p2: number,p3: number,p4: number)
        {
            return p1 * s1 + p2 * s2 + p3 * s3 + p4 * s4;
        }
        return{
            x:c(x,scx,this.dcx,this.des_x),
            y:c(y,scy,this.dcy,this.des_y),
            dx:dc(x,scx,this.dcx,this.des_x),
            dy:dc(y,scy,this.dcy,this.des_y),
        }

    }

    public toString()
    {
        if (
            this.scx != null && this.scx != undefined && 
            this.scy != null && this.scy != undefined 
        )
        {
            return  "C" +
                this.scx    + "," + this.scy    + "," +
                this.dcx    + "," + this.dcy    + "," +
                this.des_x  + "," + this.des_y;
        }
        else
        {
            return  "S" +
                this.dcx    + "," + this.dcy    + "," +
                this.des_x  + "," + this.des_y;
        }
    }
}

class BezierRel_3p implements SVGPathNode
{
    public dcdx: number;
    public dcdy: number;
    public des_dx: number;
    public des_dy: number;
    private _scdx: number | undefined;
    private _scdy: number | undefined;
    public get scdx(): number | undefined {
        return this._scdx;
    }
    public set scdx(value: number | string | undefined) {
        if(value != null && value != undefined)
        {
            this._scdx = Number(value);
            if(this._scdy== null || this._scdy == undefined) this._scdy = 0;
        }
        else
        {
            if(this._scdx== null || this._scdx == undefined) this._scdx = null!;
            if(this._scdy== null || this._scdy == undefined) this._scdy = null!;
        }
    }
    public get scdy(): number | undefined {
        return this._scdy;
    }
    public set scdy(value: number | undefined) {
        if(value != null && value != undefined)
        {
            this._scdy = Number(value);
            if(this._scdx== null || this._scdx == undefined) this._scdx = 0;
        }
        else
        {
            if(this._scdy== null || this._scdy == undefined) this._scdy = null!;
            if(this._scdx== null || this._scdx == undefined) this._scdx = null!;
        }
    }
    public constructor(
        src_control_dx: number | string | undefined,
        src_control_dy: number | string | undefined,
        des_control_dx: number | string,
        des_control_dy: number | string,
        des_dx: number | string,
        des_dy: number | string
        )
    {
        if (
            des_control_dx != null && des_control_dx != undefined && 
            des_control_dy != null && des_control_dy != undefined &&
            des_dx != null && des_dx != undefined && 
            des_dy != null && des_dy != undefined
        )
        {
            this.dcdx = Number(des_control_dx);
            this.dcdy = Number(des_control_dy);
            this.des_dx = Number(des_dx);
            this.des_dy = Number(des_dy);
            if (
                src_control_dx != null && src_control_dx != undefined && 
                src_control_dy != null && src_control_dy != undefined 
            )
            {
                this.scdx = Number(src_control_dx);
                this.scdy = Number(src_control_dy);
            }
        }
        else throw "not support type in " + 
            (typeof des_control_dx) + ", " + (typeof des_control_dy) + ", " +
            (typeof des_dx) + ", " + (typeof des_dy)
    }

    vectorInfoAt(t:number,x:number,y:number,dx:number,dy:number,index:number,path:SVGPath):{x:number,y:number,dx:number,dy:number} {
        let _dx = 0;
        let _dy = 0;
        const prevNode = path.path[index - 1];
        if(
            prevNode != null && prevNode != undefined &&
            (
                prevNode.constructor == BezierAbs_3p || prevNode.constructor == BezierRel_3p ||
                prevNode.constructor == BezierAbs_2p || prevNode.constructor == BezierRel_2p
            )
        )
        {
            _dx = dx;
            _dy = dy;
        }
        const scx = x + (this.scdx ?? _dx);
        const scy = y + (this.scdy ?? _dy);
        const oneMineT = 1 - t;
        const oneMineT_3_t_0 = oneMineT * oneMineT * oneMineT;
        const oneMineT_2_t_1 = oneMineT * oneMineT * t;
        const oneMineT_1_t_2 = oneMineT * t * t;
        const oneMineT_0_t_3 = t * t * t;
        function c(p1: number,p2: number,p3: number,p4: number)
        {
            return p1 * oneMineT_3_t_0 + p2 * oneMineT_2_t_1 + p3 * oneMineT_1_t_2 + p4 * oneMineT_0_t_3;
        }
        const s1 =-oneMineT * oneMineT;
        const s2 = oneMineT * (1 - 3 * t);
        const s3 = t * (2 - 3 * t);
        const s4 = t * t;
        function dc(p1: number,p2: number,p3: number,p4: number)
        {
            return p1 * s1 + p2 * s2 + p3 * s3 + p4 * s4;
        }
        return{
            x:c(x,scx,x + this.dcdx,x + this.des_dx),
            y:c(y,scy,y + this.dcdy,y + this.des_dy),
            dx:dc(x,scx,x + this.dcdx,x + this.des_dx),
            dy:dc(y,scy,y + this.dcdy,y + this.des_dy),
        }

    }

    public toString()
    {
        if (
            this.scdx != null && this.scdx != undefined && 
            this.scdy != null && this.scdy != undefined 
        )
        {
            return  "c" +
                this.scdx   + "," + this.scdy   + "," +
                this.dcdx   + "," + this.dcdy   + "," +
                this.des_dx + "," + this.des_dy;
        }
        else
        {
            return  "s" +
                this.dcdx   + "," + this.dcdy   + "," +
                this.des_dx + "," + this.des_dy;
        }
    }
}

class BezierAbs_2p implements SVGPathNode
{
    public des_x: number;
    public des_y: number;
    private _cx: number | undefined;
    private _cy: number | undefined;
    public get cx(): number | undefined {
        return this._cx;
    }
    public set cx(value: number | string | undefined) {
        if(value != null && value != undefined)
        {
            this._cx = Number(value);
            if(this._cy== null || this._cy == undefined) this._cy = 0;
        }
        else
        {
            if(this._cx== null || this._cx == undefined) this._cx = null!;
            if(this._cy== null || this._cy == undefined) this._cy = null!;
        }
    }
    public get cy(): number | undefined {
        return this._cy;
    }
    public set cy(value: number | undefined) {
        if(value != null && value != undefined)
        {
            this._cy = Number(value);
            if(this._cx== null || this._cx == undefined) this._cx = 0;
        }
        else
        {
            if(this._cy== null || this._cy == undefined) this._cy = null!;
            if(this._cx== null || this._cx == undefined) this._cx = null!;
        }
    }
    constructor(
        control_x: number | string | undefined,
        control_y: number | string | undefined,
        des_x: number | string,
        des_y: number | string
        )
    {
        if (
            des_x != null && des_x != undefined && 
            des_y != null && des_y != undefined
        )
        {
            this.des_x = Number(des_x);
            this.des_y = Number(des_y);
            if (
                control_x != null && control_x != undefined && 
                control_y != null && control_y != undefined 
            )
            {
                this.cx = Number(control_x);
                this.cy = Number(control_y);
            }
        }
        else throw "not support type in " + 
            (typeof des_x) + ", " + (typeof des_y)
    }
    
    vectorInfoAt(t:number,x:number,y:number,dx:number,dy:number,index:number,path:SVGPath):{x:number,y:number,dx:number,dy:number} {
        let _dx = 0;
        let _dy = 0;
        const prevNode = path.path[index - 1];
        if(
            prevNode != null && prevNode != undefined &&
            (
                prevNode.constructor == BezierAbs_3p || prevNode.constructor == BezierRel_3p ||
                prevNode.constructor == BezierAbs_2p || prevNode.constructor == BezierRel_2p
            )
        )
        {
            _dx = x + dx;
            _dy = y + dy;
        }
        const cx = this.cx ?? _dx;
        const cy = this.cy ?? _dy;
        const oneMineT = 1 - t;
        const oneMineT_2_t_0 = oneMineT * oneMineT;
        const oneMineT_1_t_1 = oneMineT * t;
        const oneMineT_0_t_2 = t * t;
        function c(p1: number,p2: number,p3: number)
        {
            return p1 * oneMineT_2_t_0 + p2 * oneMineT_1_t_1 + p3 * oneMineT_0_t_2;
        }
        const s1 =-oneMineT;
        const s2 = 1 - 2 * t;
        const s3 = t;
        function dc(p1: number,p2: number,p3: number)
        {
            return p1 * s1 + p2 * s2 + p3 * s3;
        }
        return{
            x:c(x,cx,this.des_x),
            y:c(y,cy,this.des_y),
            dx:dc(x,cx,this.des_x),
            dy:dc(y,cy,this.des_y),
        }
    }

    toString()
    {
        if (
            this.cx != null && this.cx != undefined && 
            this.cy != null && this.cy != undefined 
        )
        {
            return  "Q" +
                this.cx     + "," + this.cy     + "," +
                this.des_x  + "," + this.des_y;
        }
        else
        {
            return  "T" +
                this.des_x  + "," + this.des_y;
        }
    }
}

class BezierRel_2p implements SVGPathNode
{
    public des_dx: number;
    public des_dy: number;
    private _cdx: number | undefined;
    private _cdy: number | undefined;
    public get cdx(): number | undefined {
        return this._cdx;
    }
    public set cdx(value: number | string | undefined) {
        if(value != null && value != undefined)
        {
            this._cdx = Number(value);
            if(this._cdy== null || this._cdy == undefined) this._cdy = 0;
        }
        else
        {
            if(this._cdx== null || this._cdx == undefined) this._cdx = null!;
            if(this._cdy== null || this._cdy == undefined) this._cdy = null!;
        }
    }
    public get cdy(): number | undefined {
        return this._cdy;
    }
    public set cdy(value: number | undefined) {
        if(value != null && value != undefined)
        {
            this._cdy = Number(value);
            if(this._cdx== null || this._cdx == undefined) this._cdx = 0;
        }
        else
        {
            if(this._cdy== null || this._cdy == undefined) this._cdy = null!;
            if(this._cdx== null || this._cdx == undefined) this._cdx = null!;
        }
    }
    constructor(
        control_dx: number | string | undefined,
        control_dy: number | string | undefined,
        des_dx: number | string,
        des_dy: number | string
        )
    {
        if (
            des_dx != null && des_dx != undefined && 
            des_dy != null && des_dy != undefined
        )
        {
            this.des_dx = Number(des_dx);
            this.des_dy = Number(des_dy);
            if (
                control_dx != null && control_dx != undefined && 
                control_dy != null && control_dy != undefined 
            )
            {
                this.cdx = Number(control_dx);
                this.cdy = Number(control_dy);
            }
        }
        else throw "not support type in " + 
            (typeof des_dx) + ", " + (typeof des_dy)
    }
    
    
    vectorInfoAt(t:number,x:number,y:number,dx:number,dy:number,index:number,path:SVGPath):{x:number,y:number,dx:number,dy:number} {
        let _dx = 0;
        let _dy = 0;
        const prevNode = path.path[index];
        if(
            prevNode != null && prevNode != undefined &&
            (
                prevNode.constructor == BezierAbs_3p || prevNode.constructor == BezierRel_3p ||
                prevNode.constructor == BezierAbs_2p || prevNode.constructor == BezierRel_2p
            )
        )
        {
            _dx = dx;
            _dy = dy;
        }
        const cx = x + (this.cdx ?? _dx);
        const cy = y + (this.cdy ?? _dy);
        const oneMineT = 1 - t;
        const oneMineT_2_t_0 = oneMineT * oneMineT;
        const oneMineT_1_t_1 = oneMineT * t;
        const oneMineT_0_t_2 = t * t;
        function c(p1: number,p2: number,p3: number)
        {
            return p1 * oneMineT_2_t_0 + p2 * oneMineT_1_t_1 + p3 * oneMineT_0_t_2;
        }
        const s1 =-oneMineT;
        const s2 = 1 - 2 * t;
        const s3 = t;
        function dc(p1: number,p2: number,p3: number)
        {
            return p1 * s1 + p2 * s2 + p3 * s3;
        }
        return{
            x:c(x,cx,x + this.des_dx),
            y:c(y,cy,y + this.des_dy),
            dx:dc(x,cx,x + this.des_dx),
            dy:dc(y,cy,y + this.des_dy),
        }
    }

    toString()
    {
        if (
            this.cdx != null && this.cdx != undefined && 
            this.cdy != null && this.cdy != undefined 
        )
        {
            return  "q" +
                this.cdx     + "," + this.cdy     + "," +
                this.des_dx  + "," + this.des_dy;
        }
        else
        {
            return  "t" +
                this.des_dx  + "," + this.des_dy;
        }
    }
}

class EllipticAbs implements SVGPathNode
{
    public rx: number;
    public ry: number;
    public des_x: number;
    public des_y: number;
    public angle: number;
    public is_large_arc: boolean;
    public is_sweep: boolean;

    constructor(
        rx: number | string,
        ry: number | string,
        des_x: number | string,
        des_y: number | string,
        angle: number | string,
        is_large_arc: boolean | string,
        is_sweep: boolean | string
        )
    {
        if (
            rx != null && rx != undefined && 
            ry != null && ry != undefined &&
            des_x != null && des_x != undefined && 
            des_y != null && des_y != undefined
        )
        {
            this.rx = Number(rx);
            this.ry = Number(ry);
            this.des_x = Number(des_x);
            this.des_y = Number(des_y);
            this.angle = 0;
            this.is_large_arc = false;
            this.is_sweep = false;
            if (angle != null && angle != undefined)
            {
                this.angle = Number(angle);
            }
            if (is_large_arc != null && is_large_arc != undefined)
            {
                this.is_large_arc = Boolean(is_large_arc);
            }
            if (is_sweep != null && is_sweep != undefined)
            {
                this.is_sweep = Boolean(is_sweep);
            }
        }
        else throw "not support type in " + 
            (typeof rx) + ", " + (typeof ry) + ", " +
            (typeof des_x) + ", " + (typeof des_y)
    }
    vectorInfoAt(t: number, x: number, y: number): { x: number; y: number; dx: number; dy: number; } {
        throw new Error("Method not implemented.");
    }

    toString()
    {
        return  "A" +
                this.rx + "," + this.ry + "," + this.angle + "," +
                (this.is_large_arc ? 1 : 0) + "," +
                (this.is_sweep ? 1 : 0) + "," +
                this.des_x + "," + this.des_y;
    }
}

class EllipticRel implements SVGPathNode
{
    public rx: number;
    public ry: number;
    public des_dx: number;
    public des_dy: number;
    public angle: number;
    public is_large_arc: boolean;
    public is_sweep: boolean;

    constructor(
        rx: number | string,
        ry: number | string,
        des_dx: number | string,
        des_dy: number | string,
        angle: number | string,
        is_large_arc: boolean | string,
        is_sweep: boolean | string
        )
    {
        if (
            rx != null && rx != undefined && 
            ry != null && ry != undefined &&
            des_dx != null && des_dx != undefined && 
            des_dy != null && des_dy != undefined
        )
        {
            this.rx = Number(rx);
            this.ry = Number(ry);
            this.des_dx = Number(des_dx);
            this.des_dy = Number(des_dy);
            this.angle = 0;
            this.is_large_arc = false;
            this.is_sweep = false;
            if (angle != null && angle != undefined)
            {
                this.angle = Number(angle);
            }
            if (is_large_arc != null && is_large_arc != undefined)
            {
                this.is_large_arc = Boolean(is_large_arc);
            }
            if (is_sweep != null && is_sweep != undefined)
            {
                this.is_sweep = Boolean(is_sweep);
            }
        }
        else throw "not support type in " + 
            (typeof rx) + ", " + (typeof ry) + ", " +
            (typeof des_dx) + ", " + (typeof des_dy)
    }
    vectorInfoAt(t: number, x: number, y: number): { x: number; y: number; dx: number; dy: number; } {
        throw new Error("Method not implemented.");
    }

    toString()
    {
        return  "a" +
                this.rx + "," + this.ry + "," + this.angle + "," +
                (this.is_large_arc ? 1 : 0) + "," +
                (this.is_sweep ? 1 : 0) + "," +
                this.des_dx + "," + this.des_dy;
    }
}

class ClosePath implements SVGPathNode
{

    vectorInfoAt(t: number, x: number, y: number, dx: number, dy: number, index: number, path: SVGPath): { x: number; y: number; dx: number; dy: number; } {
        let moveToNode : number = -1;
        const oneMineT = 1 - t;
        for(let i = index - 1; i >= 0; i--)
        {
            const current = path.path[i];
            if(
                current != null && current != undefined &&
                (
                    current.constructor == MoveToAbs || current.constructor == MoveToRel
                )
            )
            {
                moveToNode = i;
                break;
            }
        }
        if(moveToNode >= 0)
        {
            const des = path.vectorInfoAt(moveToNode);
            return {x: des.x * t + x * oneMineT, y: des.y * t + y * oneMineT, dx: des.x - x, dy: des.y - y}
        }
        throw "not found the MoveTo node in path"
        
    }
    

}

class SVGPath
{

    public path : Array<SVGPathNode>

    public constructor(other : SVGPath | undefined)
    {
        if(other != null && other != undefined){
            this.path = other.path.copyWithin(0,0)
        }else{
            this.path = new Array<SVGPathNode>();
        }
    }

    public vectorInfoAt(t:number):{x:number,y:number,dx:number,dy:number}
    {
        const index : number = Math.floor(t);
        
        // for(let i = 0; i < index; i++)
        // {

        // }


        return {x:0,y:0,dx:0,dy:0};
    }

    public toString()
    {
        let result = ""
        this.path.forEach(element => {
            if(element != null && element != undefined)
            {
                result += element;
            }
        });
        return result;
    }

    public createElement()
    {
        const svg_path = document.createElementNS('http://www.w3.org/2000/svg','path')
        svg_path.setAttribute('d', this.toString());
        return svg_path;
    }

    public checkAndFixPath()
    {
        if(this.path.length <= 0) this.moveToAbs(0,0)
        else if(
            this.path[0] != null && this.path[0] != undefined &&
            (
                this.path[0].constructor == MoveToAbs || this.path[0].constructor == MoveToRel
            )
        ) this.path.unshift(new MoveToAbs(0,0))
    }

//#region Lambda Style Method
    public moveToAbs(x: string | number,y: string | number)
    {
        this.path.push(new MoveToAbs(x,y));
        return this;
    }

    public moveToRel(dx: string | number,dy: string | number)
    {
        this.path.push(new MoveToRel(dx,dy));
        return this;
    }

    public lineToAbs(x: string | number | undefined,y: string | number | undefined)
    {
        this.checkAndFixPath();
        this.path.push(new LineToAbs(x,y));
        return this;
    }

    public lineToRel(dx: string | number | undefined,dy: string | number | undefined)
    {
        this.checkAndFixPath();
        this.path.push(new LineToRel(dx,dy));
        return this;
    }

    public bezierAbs_3p(src_control_x: string | number | undefined,src_control_y: string | number | undefined,des_control_x: string | number,des_control_y: string | number,des_x: string | number,des_y: string | number)
    {
        this.checkAndFixPath();
        this.path.push(new BezierAbs_3p(src_control_x,src_control_y,des_control_x,des_control_y,des_x,des_y));
        return this;
    }

    public bezierRel_3p(src_control_dx: string | number | undefined,src_control_dy: string | number | undefined,des_control_dx: string | number,des_control_dy: string | number,des_dx: string | number,des_dy: string | number)
    {
        this.checkAndFixPath();
        this.path.push(new BezierRel_3p(src_control_dx,src_control_dy,des_control_dx,des_control_dy,des_dx,des_dy));
        return this;
    }

    public bezierAbs_2p(control_x: string | number | undefined,control_y: string | number | undefined,des_x: string | number,des_y: string | number)
    {
        this.checkAndFixPath();
        this.path.push(new BezierAbs_2p(control_x,control_y,des_x,des_y));
        return this;
    }

    public bezierRel_2p(control_dx: string | number | undefined,control_dy: string | number | undefined,des_dx: string | number,des_dy: string | number)
    {
        this.checkAndFixPath();
        this.path.push(new BezierRel_2p(control_dx,control_dy,des_dx,des_dy));
        return this;
    }

    public ellipticAbs(rx: string | number,ry: string | number,des_x: string | number,des_y: string | number,angle: string | number,is_large_arc: string | boolean,is_sweep: string | boolean)
    {
        this.checkAndFixPath();
        this.path.push(new EllipticAbs(rx,ry,des_x,des_y,angle,is_large_arc,is_sweep));
        return this;
    }

    public ellipticRel(rx: string | number,ry: string | number,des_dx: string | number,des_dy: string | number,angle: string | number,is_large_arc: string | boolean,is_sweep: string | boolean)
    {
        this.checkAndFixPath();
        this.path.push(new EllipticRel(rx,ry,des_dx,des_dy,angle,is_large_arc,is_sweep));
        return this;
    }

    public closePath()
    {
        this.checkAndFixPath();
        this.path.push(new ClosePath());
        return this;
    }
    //#endregion
}

export
{
    SVGPath
}