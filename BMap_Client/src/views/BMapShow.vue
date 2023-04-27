<template>

  
  <b-map-viewer :nodes="nodes" :links="links" @selectCard="selectCard"/>

  <div ref="MenuEle" id="Menu" class="plane" v-show="shouldMenuEleShow()" :key="update.toString()">
    <div class="ctx ThinScrollbar">
      
      <div style="height: 600px;">aaa</div>
    </div>
  </div>
  <div ref="InfoEle" id="Info" class="plane" v-show="fromSelected >= 0 || toSelected >= 0">
    <div class="ctx ThinScrollbar">
      <!-- <div style="height: 200%;">bbb</div> -->
        <div v-if="fromSelected >= 0">
          <h3>{{ nodes[fromSelected].name }}</h3>
          <div>
            <p>{{ nodes[fromSelected].info }}</p>
          </div>
        </div>
        <div v-if="toSelected >= 0">
          <h3>{{ nodes[toSelected].name }}</h3>
          <div>
            <p>{{ nodes[toSelected].info }}</p>
          </div>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref, type Ref } from 'vue';

// let menuHeight : Ref<String> = ref<String>("auto");
const MenuEle : Ref<HTMLElement>= ref<HTMLElement>(null!);
const InfoEle : Ref<HTMLElement>= ref<HTMLElement>(null!);
const nodes : Ref<
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

const links : Ref<Array<{from:number,to:number}>> = ref<Array<{from:number,to:number}>>(
  [
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
);

const fromSelected : Ref<number> = ref<number>(-1);
const toSelected : Ref<number> = ref<number>(-1);
let update : Ref<boolean> = ref<boolean>(false);


function resizeEvent()
{
  update.value = true;
}

function selectCard(from : number,to : number)
{
  // console.log(from + "," + to);
  fromSelected.value = from;
  toSelected.value = to;
}

function shouldMenuEleShow():boolean
{
  return (fromSelected.value < 0 && toSelected.value < 0) || screen.width >= 640;
}

onMounted(()=>
{
  // console.dir(MenuEle.value);
  window.addEventListener('resize',resizeEvent);
  resizeEvent();
  console.log('mounted');
  window.scrollTo(0,0)
});

onBeforeUnmount(()=>{
  window.removeEventListener('resize',resizeEvent)
  console.log('umount');
})

onUpdated(()=>
{
  update.value = false;
  console.log('update')
})

</script>

<style scoped>

.plane
{
  position: fixed;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
  border-radius: var(--border-radius) ;
  padding-top: var(--border-radius);
  padding-bottom: var(--border-radius);
  /* background-color: var(--default-background-color-hover); */
  box-shadow: 0 0 4px 0 var(--primary-border-color-active);
  background-image: radial-gradient(transparent 1px,var(--default-background-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.plane>.ctx
{
  position: relative;
  left: 4px;
  /* width: calc(100% + 4px); */
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.plane#Menu
{
  top: var(--border-radius);
  right: var(--border-radius); 
  width: calc(min(15cm,100% - var(--border-radius) * 2));
  height: 38.2%;
}

.plane#Info
{
  top: var(--border-radius);
  right: var(--border-radius);  
  width: calc(min(15cm,100% - var(--border-radius) * 2));
  height: 38.2%;
}

.plane#Info>.ctx>div>h3
{
  text-align: center;
}

.plane#Info>.ctx>div:nth-child(1)>h3
{
  background-color: var(--emphasize-border-color-active);
}
.plane#Info>.ctx>div:nth-child(2)>h3
{
  background-color: var(--primary-border-color-active);
}


@media (min-width: 640px) {


  /* input[name="plane"]::after
  {
    content: "";
    display: block;
    position: relative;
    width: 1cm;
    height: 1cm;
    background-color: var(--primary-background-color);
    z-index: 1;
  } */

  .plane#Menu
  {
    top: var(--border-radius);
    right: var(--border-radius); 
    width: 20%;
    /* height: calc(min(max(35% - 1.5cm, 2cm),100% - 3cm)); */
    /* height: auto; */
    max-height: max(38.2% - var(--border-radius) * 3.5, var(--border-radius) * 2 + .5cm);
    min-width: 7.5cm;
    max-width: calc(min(15cm,100% - var(--border-radius) * 2));
    box-shadow: 0 0 4px 0 var(--primary-border-color-active);
  }

  .plane#Info
  {
    top: max(38.2%, var(--border-radius) * 2 + .5cm);
    right: var(--border-radius);  
    width: 20%;
    height: auto;
    bottom:1.5cm;
    min-width: 7.5cm;
    max-width: calc(min(15cm,100% - var(--border-radius) * 2));
    box-shadow: 0 0 4px 0 var(--primary-border-color-active);
  }

}
@media (min-width: 1024px) {
  
  #Head
  {
    top:0;
    bottom: auto;
  }

  #Head::after
  {
    top: 1.25cm;
  }

  /* input[name="plane"]::after
  {
    content: "";
    display: block;
    position: relative;
    width: 1cm;
    height: 1cm;
    background-color: var(--primary-background-color);
    z-index: 1;
  } */

  .plane#Menu
  {
    top: 1.5cm;
    left: calc(max(5%, var(--border-radius)));
    width: 20%;
    /* height: calc(min(max(35% - 1.5cm, 2cm),100% - 3cm)); */
    min-width: 7.5cm;
    max-width: calc(min(15cm,100% - max(10%, var(--border-radius) * 2)));
  box-shadow: 0 0 4px 0 var(--primary-border-color-active);
  }

  .plane#Info
  {
    top: 1.5cm;
    right: calc(max(5%, var(--border-radius)));
    width: 20%;
    height: calc(min(max(60% - 1.5cm, 25cm),100% - 1.5cm - var(--border-radius) * 3));
    min-width: 7.5cm;
    max-width: calc(min(15cm,100% - max(10%, var(--border-radius) * 2)));
    box-shadow: 0 0 4px 0 var(--primary-border-color-active);
  }

  .plane#Menu>.ctx
  {
    transform: scaleX(-1);
    left: auto;
    right: 4px;
  }

  .plane#Menu>.ctx>*
  {
    transform: scaleX(-1);
  }
}
</style>

