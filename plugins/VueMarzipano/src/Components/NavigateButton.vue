<template>
  <div class="navigationButton cursor-pointer" @click="navigate()">
    <img :src="imageSrc" alt="">
  </div>
</template>

<script setup lang="ts">

import {GetImage} from "../helpers.ts";

const props = defineProps({
  buttonData : Object,
})

import {computed, inject} from "vue";

const enableAutoRotate = inject('enableAutoRotate')

const currentScene = inject('currentScene')

const imageSrc = computed(() =>  GetImage(props.buttonData.imageName))

function navigate() {
  const currentPitch = currentScene.value.view.pitch() * 180 / Math.PI;
  const currentYaw = currentScene.value.view.yaw() * 180 / Math.PI;
  const currentFov = currentScene.value.view.fov();

  if(props.buttonData.yFactor) {
    const targetPitch = currentPitch + props.buttonData.yFactor;
    currentScene.value.view.setPitch(targetPitch * Math.PI / 180);
  }

  if(props.buttonData.xFactor) {
    const targetYaw = currentYaw + props.buttonData.xFactor
    currentScene.value.view.setYaw(targetYaw * Math.PI / 180);
  }

  if(props.buttonData.zoomFactor) {
    currentScene.value.view.setFov(currentFov * props.buttonData.zoomFactor);
  }

  enableAutoRotate.value = false
}

</script>

<style scoped>
</style>