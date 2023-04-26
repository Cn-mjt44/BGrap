<template>

  
  <b-map-viewer/>

  <div ref="MenuEle" id="Menu" class="plane">
    <div class="ctx ThinScrollbar">
      
      <!-- <div style="height: 600px;">aaa</div> -->
    </div>
  </div>
  <div ref="InfoEle" id="Info" class="plane">
    <div class="ctx ThinScrollbar">
      <!-- <div style="height: 200%;">bbb</div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';
import {border_radius} from '../CSSDataSet';

// let menuHeight : Ref<String> = ref<String>("auto");
let MenuEle : Ref<HTMLElement>= ref<HTMLElement>(null!)
let InfoEle : Ref<HTMLElement>= ref<HTMLElement>(null!)

  function resizeEvent()
  {
    MenuEle.value.style.height = null!;
    InfoEle.value.style.borderTopLeftRadius = null!;
    InfoEle.value.style.borderTopRightRadius = null!;
    MenuEle.value.style.borderBottomLeftRadius = null!;
    MenuEle.value.style.borderBottomRightRadius = null!;
    let height = MenuEle.value.clientHeight;
    MenuEle.value.style.height="calc(min(max(35% - " + border_radius() * 3 + "px, 2cm),100% - 1.5cm - " + border_radius() * 3 + "px))";
    console.log(height);
    console.log(MenuEle.value.clientHeight);
    if(MenuEle.value.clientHeight > height)
    {
      MenuEle.value.style.height = null!;
      if(screen.width >= 640 && screen.width < 1024 && MenuEle.value.clientHeight - height < border_radius())
      {
        InfoEle.value.style.borderTopLeftRadius = '0';
        InfoEle.value.style.borderTopRightRadius = '0';
        MenuEle.value.style.borderBottomLeftRadius = '0';
        MenuEle.value.style.borderBottomRightRadius = '0';
      }
    }
    else if(screen.width >= 640 && screen.width < 1024)
    {
      InfoEle.value.style.borderTopLeftRadius = '0';
      InfoEle.value.style.borderTopRightRadius = '0';
      MenuEle.value.style.borderBottomLeftRadius = '0';
      MenuEle.value.style.borderBottomRightRadius = '0';
    }
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
  height: 35%;
}

.plane#Info
{
  top: var(--border-radius);
  right: var(--border-radius);  
  width: calc(min(15cm,100% - var(--border-radius) * 2));
  height: 35%;
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
    min-width: 7.5cm;
    max-width: calc(min(15cm,100% - var(--border-radius) * 2));
    box-shadow: 0 -4px 4px 0 var(--primary-border-color-active);
  }

  .plane#Info
  {
    top: calc(min(max(35% - var(--border-radius), var(--border-radius) * 2 + 2cm),100% - 1.5cm - var(--border-radius)));
    right: var(--border-radius);  
    width: 20%;
    height: auto;
    bottom:1.5cm;
    min-width: 7.5cm;
    max-width: calc(min(15cm,100% - var(--border-radius) * 2));
    box-shadow: 0 4px 4px 0 var(--primary-border-color-active);
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

