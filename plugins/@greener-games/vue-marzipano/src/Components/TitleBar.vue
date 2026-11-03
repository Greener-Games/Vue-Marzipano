<template>
  <div class="title-bar">
    <h1 class="scene-name">{{ sanitize(currentScene?.data.name) }}</h1>
  </div>
</template>

<script setup lang="ts">
  import { useMarzipanoContext } from '../context';

  const { currentScene } = useMarzipanoContext();

  function sanitize(s: string | undefined) {
    return s?.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }
</script>

<style>
  h1 {
    font-size: 24px !important;
  }

  .title-bar {
    z-index: 10;
    position: absolute;
    top: 0;
    height: 40px;
    width: 100%;
    text-align: center;
    background-color: rgb(25 45 56 / 80%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scene-name {
    color: white;
  }
</style>
