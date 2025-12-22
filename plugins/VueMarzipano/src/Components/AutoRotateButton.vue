<template>
  <div class="autorotateToggle cursor-pointer" @click="toggle">
    <img v-if="!enableAutoRotate" :src=imageSrcOff alt="">
    <img v-else :src=imageSrcOn alt="">
  </div>
</template>
<script setup>
import {computed, inject, onMounted, ref, watch} from "vue";
import {GetImage} from "../helpers";

const props = defineProps({
  buttonData : Object,
})

const imageSrcOn = computed(() =>  GetImage(props.buttonData?.imageOn))
const imageSrcOff = computed(() =>  GetImage(props.buttonData?.imageOff))

const viewer = inject('viewer')
const currentScene = inject('currentScene')

const enableAutoRotate = inject('enableAutoRotate')
const autorotateSettings = inject('autorotateSettings')

onMounted(() =>
{
  Set(enableAutoRotate)
})

function Set(state)
{
  enableAutoRotate.value = state
  if (enableAutoRotate.value)
  {
    startAutorotate();
  }
  else
  {
    stopAutorotate()
  }
}

function toggle()
{
  enableAutoRotate.value = !enableAutoRotate.value

  if (enableAutoRotate.value)
  {
    startAutorotate();
  }
  else
  {
    stopAutorotate()
  }
}

watch(() => enableAutoRotate.value, (newVal, oldVal) => {
Set(enableAutoRotate.value)
});

watch(() => currentScene.value, (newVal, oldVal) => {
  stopAutorotate()
  startAutorotate()
});

function startAutorotate()
{
  if (!enableAutoRotate.value) {
    return;
  }
  viewer.value?.startMovement(autorotateSettings);
  viewer.value?.setIdleMovement(3000, autorotateSettings);
}

function stopAutorotate() {
  viewer.value?.stopMovement();
  viewer.value?.setIdleMovement(Infinity);
}

</script>

<style>
</style>