<template>
    <svg ref="linksGrap" id="links"  :width="SVGInfo.w" :height="SVGInfo.h" @click="selectLine(-1)" @mousemove="drag($event)" @contextmenu="$event.preventDefault()">
        <template v-for="(i,index) in SVGInfo.l" :key="index">
            <path class="line" :d="i.l.toString()" @click="selectLine(index);$event.stopPropagation()"/>
            <path class="arrow" :d="i.a.toString()"/>
        </template>
    </svg>
    <div ref="cards" id="cards" :style="'width : ' + SVGInfo.w + 'px; height : ' + SVGInfo.h + 'px;'" @contextmenu="$event.preventDefault()">
        <template v-for="(i,index) in nodes" :key="index">
            <div class="card" :style="'left : ' + i.postion.x + 'px; top : ' + i.postion.y + 'px;'" @click="selectCard(index,-1)" @mousemove="drag($event)">
                <h3 class="Lable">{{ i.name ?? '' }}</h3>
                <div class="Info">{{ i.info ?? '' }}</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>

    import { SVGPath } from "../SVGPathHelper";
    import { type Ref, ref, onMounted} from "vue";
    let linksGrap : Ref<SVGPathElement | undefined> = ref<SVGPathElement>();
    let cards : Ref<HTMLDivElement | undefined> = ref<HTMLDivElement>();
    const props = defineProps({
        nodes :{
            type: Array<{
                    name:string|undefined,
                    info:string|undefined,
                    postion:
                    {
                        x:number,
                        y:number
                    }
                }>,
            default:[
                {
                    name:"test1",
                    info:"Test1 info",
                    postion:{
                        x:0,
                        y:0
                    }
                },
                {
                    name:"test2",
                    info:"Test2 info",
                    postion:{
                        x:200,
                        y:0
                    }
                },
                {
                    name:"test3",
                    info:"Test3 info",
                    postion:{
                        x:200,
                        y:200
                    }
                },
                {
                    name:"test4",
                    info:"Test4 info",
                    postion:{
                        x:400,
                        y:200
                    }
                },
                {
                    name:"test5",
                    info:"Test5 info",
                    postion:{
                        x:350,
                        y:800
                    }
                },
            ]
        },
        links:{
            type:Array<{from:number,to:number}>,
            default:[
                {
                    from:0,
                    to:1
                },
                {
                    from:1,
                    to:2
                },
                {
                    from:0,
                    to:2
                },
                {
                    from:0,
                    to:3
                },
                {
                    from:1,
                    to:3
                },
                {
                    from:2,
                    to:3
                },
                {
                    from:0,
                    to:4
                },
                {
                    from:2,
                    to:4
                },
            ]
        }
    })
    let SVGInfo : Ref<{w:number,h:number,l:Array<{l:SVGPath,a:SVGPath}>}> = ref<{w:number,h:number,l:Array<{l:SVGPath,a:SVGPath}>}>({w:0,h:0,l:new Array<{l:SVGPath,a:SVGPath}>()});
    

    const emits = defineEmits<{
        (event:'selectCard',from : number,to : number):void,
        (event:'selectLine',value : number):void
    }>()

    function selectCard(from : number,to : number)
    {
        if(cards.value != null)
        {
            for(let i = 0; i < cards.value.children.length; i++)
            {
                // if(i == from && cards.value.children[i].classList.contains('from')) from = -1;
                // if(i == to && cards.value.children[i].classList.contains('to')) to = -1;
                cards.value.children[i].classList.remove('from')
                cards.value.children[i].classList.remove('to')
            }
            if(from >= 0 || to >= 0) selectLine(-1);
            if(from >= 0) cards.value.children[from].classList.add('from')
            if(to >= 0) cards.value.children[to].classList.add('to')
            emits('selectCard', from, to)
        }
    }

    function selectLine(value : number)
    {
        if(linksGrap.value != null)
        {
            emits('selectLine', value)
            // console.log(value)
            for(let i = 0; i < linksGrap.value.children.length / 2; i++)
            {
                linksGrap.value.children[i * 2].classList.remove('selected')
            }
            if(value >= 0)
            {
                selectCard(props.links[value].from,props.links[value].to)
                linksGrap.value.children[value * 2].classList.add('selected')
            }
            else selectCard(-1,-1)
        }
    }

    function drag(event : MouseEvent)
    {
        // console.dir(event)
        if(event.buttons == 2) window.scrollBy(-event.movementX,-event.movementY)
    }


    function genSVGPaths()
    {
        // let paths = new Array<SVGPath>();
        console.log('paths');
        if(cards.value)
        {
            let info = {w:0,h:0,l:new Array<{l:SVGPath,a:SVGPath}>()};
            for(let i = 0; i < cards.value.children.length; i++)
            {
                let item : HTMLDivElement= cards.value.children[i] as HTMLDivElement;
                if(item.constructor == HTMLDivElement)
                {
                    info.w = Math.max(info.w,item.offsetLeft + item.offsetWidth);
                    info.h = Math.max(info.h,item.offsetTop + item.offsetHeight);
                }
            }
            let lines = info.l;
            for(let i of props.links)
            {
                let from = props.nodes[i.from];
                let to = props.nodes[i.to];

                let fromEL : HTMLDivElement = cards.value.children[i.from] as HTMLDivElement;
                let toEL : HTMLDivElement = cards.value.children[i.to] as HTMLDivElement;

                let fromRect = 
                {
                    sx : from.postion.x,
                    sy : from.postion.y,
                    dx : from.postion.x + fromEL.offsetWidth,
                    dy : from.postion.y + fromEL.offsetHeight,
                    cx : from.postion.x + fromEL.offsetWidth / 2,
                    cy : from.postion.y + fromEL.offsetHeight / 2,
                };
                let toRect = 
                {
                    sx : to.postion.x,
                    sy : to.postion.y,
                    dx : to.postion.x + toEL.offsetWidth,
                    dy : to.postion.y + toEL.offsetHeight,
                    cx : to.postion.x + toEL.offsetWidth / 2,
                    cy : to.postion.y + toEL.offsetHeight / 2,
                };

                let fromConnectPoints = [
                    {
                        x : fromRect.cx,
                        y : fromRect.sy
                    },
                    {
                        x : fromRect.sx,
                        y : fromRect.cy
                    },
                    {
                        x : fromRect.cx,
                        y : fromRect.dy
                    },
                    {
                        x : fromRect.dx,
                        y : fromRect.cy
                    },
                ]

                let toConnectPoints = [
                    {
                        x : toRect.cx,
                        y : toRect.sy
                    },
                    {
                        x : toRect.sx,
                        y : toRect.cy
                    },
                    {
                        x : toRect.cx,
                        y : toRect.dy
                    },
                    {
                        x : toRect.dx,
                        y : toRect.cy
                    },
                ]

                let fromConnectPoint=fromConnectPoints[0]
                let toConnectPoint=toConnectPoints[0]
                let fromConnectPointIndex=0
                let toConnectPointIndex=0
                let claced = Infinity;

                fromConnectPoints.forEach((fromValue, fromIndex)=>
                {
                    toConnectPoints.forEach((toValue, toIndex)=>
                    {
                        let cache = Math.max(Math.abs(fromValue.x - toValue.x), 1) * Math.max(Math.abs(fromValue.y - toValue.y),1);
                        if(cache <= claced)
                        {
                            fromConnectPoint = fromValue;
                            toConnectPoint = toValue;
                            fromConnectPointIndex = fromIndex;
                            toConnectPointIndex = toIndex;
                            claced = cache;
                        }
                    })
                })

                let line = 
                new SVGPath(null!)
                .moveToAbs(fromConnectPoint.x,fromConnectPoint.y)
                .bezierAbs_3p(
                    (fromConnectPointIndex % 2 != 0) ? toConnectPoint.x : fromConnectPoint.x,
                    (fromConnectPointIndex % 2 != 0) ? fromConnectPoint.y : toConnectPoint.y,
                    (toConnectPointIndex % 2 != 0) ? fromConnectPoint.x : toConnectPoint.x,
                    (toConnectPointIndex % 2 != 0) ? toConnectPoint.y : fromConnectPoint.y,
                    toConnectPoint.x,toConnectPoint.y
                )
                
                let vectorInfo = line.vectorInfoAt(1.5);
                let deltaLength = Math.sqrt(vectorInfo.dx * vectorInfo.dx + vectorInfo.dy * vectorInfo.dy);
                if(deltaLength <= 0)
                {
                    vectorInfo.dx = toConnectPoint.x - fromConnectPoint.x;
                    vectorInfo.dy = toConnectPoint.y - fromConnectPoint.y;
                    deltaLength = Math.sqrt(vectorInfo.dx * vectorInfo.dx + vectorInfo.dy * vectorInfo.dy);
                }
                vectorInfo.dx /= deltaLength;
                vectorInfo.dy /= deltaLength;
                //  x   y
                //| dx -dy| x'
                //| dy  dx| y'
                lines.push(
                    {
                        l:line,
                        a:new SVGPath(null!)
                        .moveToAbs(
                            vectorInfo.x,
                            vectorInfo.y
                        )
                        .lineToRel(
                            vectorInfo.dx * (-13.8564) - vectorInfo.dy * 8,
                            vectorInfo.dy * (-13.8564) + vectorInfo.dx * 8,
                        )
                        .lineToRel(
                            vectorInfo.dy * 16,
                            - vectorInfo.dx * 16,
                        )
                        .closePath()
                    }
                )
            }
            SVGInfo.value = info;
        }
    }
    onMounted(()=>{
        // if(cards.value != null)
        // {
        //     // window.addEventListener('resize', resizeEvent);
        // }
        genSVGPaths();
        // document.addEventListener('contextmenu',contextmenu)
    })

</script>

<style scoped>
    #cards,
    #links
    {
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;
        border-top: 50vh solid transparent;
        border-bottom: 50vh solid transparent;
        top: 0;
    }
    #cards
    {
        pointer-events: none;
        position: absolute;
    }
    #cards > *
    {
        position: absolute;
        pointer-events:all
    }
    #links > path.line
    {
        stroke: var(--primary-border-color-hover);
        stroke-width: 4px;
        fill-opacity: 0;
        pointer-events:stroke;
        transition: 250ms;
    }
    #links > path.arrow
    {
        stroke: var(--primary-border-color);
        stroke-width: 2px;
        fill: var(--primary-border-color);
        transition: 250ms;
        pointer-events:none;
    }
    #links > path.line.selected,
    #links > path.line:hover
    {
        stroke: var(--emphasize-border-color);
        stroke-width: 5px;
    }
    
    #links > path.line.selected + path.arrow,
    #links > path.line:hover + path.arrow
    {
        stroke: var(--emphasize-border-color);
        stroke-width: 5px;
    }

    #cards > .card
    {
        position: absolute;
        border: var(--primary-border-color) solid 2px;
        border-radius: var(--border-radius);
        min-width: 3cm;
        max-width: 7.5cm;
        min-height: 3cm;
        max-height: 7.5cm;
        overflow: hidden;
        background-color: var(--default-background-color-hover);
    }

    #cards > .card.from
    {
        border: var(--emphasize-border-color) solid 2px;
        box-shadow: 0 0 4px 4px var(--emphasize-border-color-active);
    }

    #cards > .card.from> .Lable
    {
        background-color: var(--emphasize-border-color);
    }

    #cards > .card.to
    {
        border: var(--emphasize-border-color) solid 2px;
        box-shadow: 0 0 4px 4px var(--primary-border-color-active);
    }

    #cards > .card.to> .Lable
    {
        background-color: var(--emphasize-border-color);
    }
    

    #cards > .card > .Lable
    {
        width: 100%;
        margin: 0;
        text-align: center;
        background-color: var(--primary-border-color);
    }
    #cards > .card > .Info
    {
        width: 100%;
    }
</style>