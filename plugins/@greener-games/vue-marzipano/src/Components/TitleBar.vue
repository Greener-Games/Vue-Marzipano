<template>
  <div class="title-bar">
    <h1 class="scene-name">{{ currentScene?.data.name }}</h1>
  </div>
</template>

<script setup lang="ts">
  import { useMarzipanoContext } from '../context';

  const { currentScene } = useMarzipanoContext();
</script>

<style>
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
    margin: 0;
    font-size: 24px;
    color: white;
  }
</style>
