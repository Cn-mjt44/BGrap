<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElIcon } from 'element-plus';
import {Plus} from '@element-plus/icons-vue'
// import { onMounted, ref, type Ref } from 'vue';
</script>
<template>
  <nav id="Head">
    <!-- <a href="/BMapShow">BMapShow</a> -->
    <el-icon style="height: auto; width: auto;"><Plus style="width: 1cm; height: 1cm;" /></el-icon>
    <span>
      <RouterLink to="/">Home</RouterLink> | <RouterLink to="/BMapShow">BMapShow</RouterLink>
    </span>
    <span style="direction: rtl;">abv</span>
    
  </nav>
  <div id="RouterView">
    <RouterView />
  </div>
  <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
</template>
<style>

  #Head
  {
    bottom: 0;
    position: fixed;
    height: 1.25cm;
    left: 0;
    right: 0;
    /* background-color: var(--default-background-color-hover); */
    background-image:
    radial-gradient(transparent 1px,var(--default-background-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: blur(4px);
    
    /* linear-gradient(90deg, 
    rgb(0,0,0,0),
      var(--default-background-color-hover) calc(min(20%,640px)),
      var(--default-background-color-hover) calc(100% - min(20%,640px)),
      rgb(0,0,0,0) 100%); */
    display: grid;
    grid-template: 1.25cm / 1.25cm calc(50% - 1.25cm) 50%;
    padding-left: max(5%, var(--border-radius));
    padding-right: max(5%, var(--border-radius));
    align-items: center;
    z-index: 1;
    box-shadow: 0 0 4px 2px var(--primary-border-color-active);
  }

  #RouterView
  {
    position: absolute;
    border-bottom: calc(1.25cm + 2px) solid transparent;
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

  #RouterView
  {
    top: calc(1.25cm + 2px);
    bottom: 0;
  }
}
</style>