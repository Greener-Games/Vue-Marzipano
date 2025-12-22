<template>
  <div class="hotspot" @click="TriggerSceneSwitch">
    <img class="hotspot-img cursor-pointer" :src=imageSrc alt="">
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, inject} from "vue";
import {GetImage} from "../helpers.ts";

const props = defineProps({
  hotspot: {
    type: Object,
    required: true
  }
});

const scenes: any = inject('scenes')
const marzipanoViewFunctions = inject('marzipanoViewFunctions') // Inject the switchScene function

const data = inject('data')
const imageSrc = computed(() => props.hotspot?.imageOverride ? GetImage(props.hotspot?.imageOverride) : GetImage(data?.icons?.defaultNavigationIcon))

// Switch to the selected scene
function TriggerSceneSwitch() {
  marzipanoViewFunctions.switchScene(findSceneById(props.hotspot.target));
}

function findSceneById() {
  for (let i = 0; i < scenes.value.length; i++) {
    if (scenes.value[i].data.id === props.hotspot.target) {
      return scenes.value[i]
    }
  }
  return null
}
</script>

<style scoped lang="scss">
.hotspot {
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;

  .hotspot-img {
    width: 100%;
    height: 100%;
  }
}
</style>