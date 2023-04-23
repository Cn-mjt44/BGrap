<template>
    <svg ref="linksGrap" id="links" :width="SVGInfo.w" :height="SVGInfo.h">
        <template v-for="i in SVGInfo.l" :key="i">
            <path class="line" :d="i.toString()"/>
        </template>
    </svg>
    <div ref="cards" id="cards" :style="'width : ' + SVGInfo.w + 'px; height : ' + SVGInfo.h + 'px;'">
        <template v-for="i in nodes" :key="i">
            
            <div class="card" :style="'left : ' + i.postion.x + 'px; top : ' + i.postion.y + 'px;'">
                <h3 class="Lable">{{ i.name ?? '' }}</h3>
                <div class="Info">{{ i.info ?? '' }}</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>

    import { SVGPath } from "../SVGPathHelper";
    import { type Ref, ref, onMounted, onBeforeUpdate, onBeforeUnmount, onUpdated } from "vue";
    let linksGrap : Ref<SVGPathElement | undefined> = ref<SVGPathElement>();
    let cards : Ref<HTMLDivElement | undefined> = ref<HTMLDivElement>();
    let nodes : Ref<
        Array<{
                name:string|undefined,
                info:string|undefined,
                postion:
                {
                    x:number,
                    y:number
                }
            }>
        > = ref<
        Array<{
                name:string|undefined,
                info:string|undefined,
                postion:
                {
                    x:number,
                    y:number
                }
            }>
        >([
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
    ]);

    let links : Ref<Array<{from:number,to:number}>> = ref<Array<{from:number,to:number}>>([
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
    ])
    let SVGInfo : Ref<{w:number,h:number,l:Array<SVGPath>}> = ref<{w:number,h:number,l:Array<SVGPath>}>({w:0,h:0,l:new Array<SVGPath>()})

    function genSVGPaths()
    {
        // let paths = new Array<SVGPath>();
        console.log('paths');
        if(cards.value)
        {
            let info = {w:0,h:0,l:new Array<SVGPath>()};
            for(let i = 0; i < cards.value.children.length; i++)
            {
                let item : HTMLDivElement= cards.value.children[i] as HTMLDivElement;
                info.w = Math.max(info.w,item.offsetLeft + item.offsetWidth);
                info.h = Math.max(info.h,item.offsetTop + item.offsetHeight);
            }
            let lines = info.l;
            for(let i of links.value)
            {
                let from = nodes.value[i.from];
                let to = nodes.value[i.to];

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

                
                lines.push(
                    new SVGPath(null!)
                    .moveToAbs(fromConnectPoint.x,fromConnectPoint.y)
                    .bezierAbs_3p(
                        (fromConnectPointIndex % 2 != 0) ? toConnectPoint.x : fromConnectPoint.x,
                        (fromConnectPointIndex % 2 != 0) ? fromConnectPoint.y : toConnectPoint.y,
                        (toConnectPointIndex % 2 != 0) ? fromConnectPoint.x : toConnectPoint.x,
                        (toConnectPointIndex % 2 != 0) ? toConnectPoint.y : fromConnectPoint.y,
                        toConnectPoint.x,toConnectPoint.y
                    )
                );
                lines.push(
                    new SVGPath(null!)
                    .moveToAbs(
                        toConnectPoint.x,
                        toConnectPoint.y
                    )
                    .lineToRel(
                        (toConnectPointIndex % 2 != 0) ? Math.sign(fromConnectPoint.x - toConnectPoint.x) * 8 : 8,
                        (toConnectPointIndex % 2 != 0) ? 8 : Math.sign(fromConnectPoint.y - toConnectPoint.y) * 8,
                    )
                    .lineToRel(
                        (toConnectPointIndex % 2 != 0) ? 0 : -16,
                        (toConnectPointIndex % 2 != 0) ? -16 : 0,
                    )
                    .closePath()
                    
                )
            }
            SVGInfo.value = info;
        }
    }

    onMounted(()=>{
        if(cards.value != null)
        {
            // window.addEventListener('resize', resizeEvent);
            genSVGPaths();
        }
    })

    // onBeforeUpdate(()=>{
    //     if(cards.value != null)
    //     {
    //         genPaths();
    //     }
    // })

    // onUpdated(()=>
    // {
    //     genSVGPaths()
    // })

    // onBeforeUnmount(()=>
    // {
    //     if(cards.value != null)
    //     {
    //         window.removeEventListener('resize', resizeEvent);
    //     }
    // })

</script>

<style scoped>
    #cards,
    #links
    {
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;
        border-top: 50vh solid transparent;
        top: 0;
    }
    #cards
    {
        position: absolute;
    }
    #links > path.line:nth-child(2n+1)
    {
        stroke: var(--emphasize-border-color);
        stroke-width: 4px;
        fill-opacity: 0;
    }
    #links > path.line:nth-child(2n)
    {
        fill: var(--emphasize-border-color);
    }
    #links > path.line:nth-child(2n+1):hover
    {
        stroke: var(--emphasize-border-color);
        stroke-width: 5px;
    }
    
    #links > path.line:nth-child(2n+1):hover + path.line:nth-child(2n)
    {
        fill: var(--primary-border-color);
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

    @media (min-width: 640px) {
        
        #cards,
        #links
        {
            border-left: 50vw solid transparent;
            border-right: 50vw solid transparent;
            border-top: 1.5cm solid transparent;
            border-bottom: 0;
        }
    }
</style>