<template>
  <div class="titleBar ">
    <h1 class="sceneName">{{ sanitize(currentScene?.data.name) }}</h1>
  </div>
</template>
<script setup>
import {inject} from "vue";
const currentScene = inject('currentScene')

function sanitize(s) {
  return s?.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}
</script>

<style>
h1 {
  font-size: 24px !important;
}

.titleBar {
  z-index: 10;
  position: absolute;
  top: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  background-color: rgba(25, 45, 56, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.sceneName {
  color: white;
}
</style>