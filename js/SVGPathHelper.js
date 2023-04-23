

class MoveToAbs extends Object
{
    constructor(x,y)
    {
        super();
        if(x != null && x != undefined && y != null && y != undefined)
        {
            this.x = Number(x);
            this.y = Number(y);
        }
        else throw "not support " + (typeof x) + " or " + (typeof y)
    }

    toString()
    {
        return "M" + this.x  + "," + this.y;
    }
}

class MoveToRel extends Object
{
    constructor(dx,dy)
    {
        super();
        if(dx != null && dx != undefined && dy != null && dy != undefined)
        {
            this.dx = Number(dx);
            this.dy = Number(dy);
        }
        else throw "not support " + (typeof dx) + " or " + (typeof dy)
    }

    toString()
    {
        return "m" + this.dx + "," + this.dy;
    }
}

class LineToAbs extends Object
{
    constructor(x,y)
    {
        super();
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

    toString()
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
    }
}

class LineToRel extends Object
{
    constructor(dx,dy)
    {
        super();
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
    }
}

class BezierAbs_3p extends Object
{
    constructor(src_control_x,src_control_y,des_control_x,des_control_y,des_x,des_y)
    {
        super();
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

    toString()
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

class BezierRel_3p extends Object
{
    constructor(src_control_dx,src_control_dy,des_control_dx,des_control_dy,des_dx,des_dy)
    {
        super();
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

    toString()
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

class BezierAbs_2p extends Object
{
    constructor(control_x,control_y,des_x,des_y)
    {
        super();
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

class BezierRel_2p extends Object
{
    constructor(control_dx,control_dy,des_dx,des_dy)
    {
        super();
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

class EllipticAbs extends Object
{
    constructor(rx,ry,des_x,des_y,angle,is_large_arc,is_sweep)
    {
        super();
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

    toString()
    {
        return  "A" +
                this.rx + "," + this.ry + "," + this.angle + "," +
                (this.is_large_arc ? 1 : 0) + "," +
                (this.is_sweep ? 1 : 0) + "," +
                this.des_x + "," + this.des_y;
    }
}

class EllipticRel extends Object
{
    constructor(rx,ry,des_dx,des_dy,angle,is_large_arc,is_sweep)
    {
        super();
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

    toString()
    {
        return  "a" +
                this.rx + "," + this.ry + "," + this.angle + "," +
                (this.is_large_arc ? 1 : 0) + "," +
                (this.is_sweep ? 1 : 0) + "," +
                this.des_dx + "," + this.des_dy;
    }
}

class Path extends Object
{
    constructor(other)
    {
        super();
        if(other && other.prototype === this.prototype){
            this.path = other.path.copyWithin(0,0)
        }else{
            this.path = [];
        }
    }
    
    toString()
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

    createElement()
    {
        let svg_path = document.createElementNS('http://www.w3.org/2000/svg','path')
        svg_path.setAttribute('d', this.toString());
        return svg_path;
    }

    moveToAbs(x,y)
    {
        this.path.push(new MoveToAbs(x,y));
        return this;
    }

    moveToRel(dx,dy)
    {
        this.path.push(new MoveToRel(dx,dy));
        return this;
    }

    lineToAbs(x,y)
    {
        this.path.push(new LineToAbs(x,y));
        return this;
    }

    lineToRel(dx,dy)
    {
        this.path.push(new LineToRel(dx,dy));
        return this;
    }

    bezierAbs_3p(src_control_x,src_control_y,des_control_x,des_control_y,des_x,des_y)
    {
        this.path.push(new BezierAbs_3p(src_control_x,src_control_y,des_control_x,des_control_y,des_x,des_y));
        return this;
    }

    bezierRel_3p(src_control_dx,src_control_dy,des_control_dx,des_control_dy,des_dx,des_dy)
    {
        this.path.push(new BezierRel_3p(src_control_dx,src_control_dy,des_control_dx,des_control_dy,des_dx,des_dy));
        return this;
    }

    bezierAbs_2p(control_x,control_y,des_x,des_y)
    {
        this.path.push(new BezierAbs_2p(control_x,control_y,des_x,des_y));
        return this;
    }

    bezierRel_2p(control_dx,control_dy,des_dx,des_dy)
    {
        this.path.push(new BezierRel_2p(control_dx,control_dy,des_dx,des_dy));
        return this;
    }

    ellipticAbs(rx,ry,des_x,des_y,angle,is_large_arc,is_sweep)
    {
        this.path.push(new EllipticAbs(rx,ry,des_x,des_y,angle,is_large_arc,is_sweep));
        return this;
    }

    ellipticRel(rx,ry,des_dx,des_dy,angle,is_large_arc,is_sweep)
    {
        this.path.push(new EllipticRel(rx,ry,des_dx,des_dy,angle,is_large_arc,is_sweep));
        return this;
    }

    ClosePath()
    {
        this.path.push("Z");
        return this;
    }
}

export
{
    Path
}