<template>
  <div ref="panoElement" class="pano">
    <slot name="titleBar">
      <TitleBar/>
    </slot>
    <Hotspot v-for="hotspot in allHotspots" :key="hotspot.id" :id="hotspot.id" :hotspotInfo="hotspot"
             @click="switchScene(findSceneById(hotspot.target))"/>
    <slot name="contentButtons">
      <div class="control-buttons">
        <div class="button-layout" style="gap: 1rem">
          <vue-marzipano-button v-for="button in navigationButtons" :key="button.type + (button.imageName || '')" class="marzipano-button" :buttonData="button"/>
        </div>
      </div>
    </slot>
    <slot name="scenes">
      <scene-list @select-scene="switchScene(findSceneById($event.id))"/>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {computed, defineExpose, onMounted, onUnmounted, provide} from "vue";
import type { PropType } from "vue";
import SceneList from "../Components/SceneList.vue";
import TitleBar from "../Components/TitleBar.vue";
import Hotspot from "../Components/Hotspot.vue";
import VueMarzipanoButton from "../Components/VueMarzipanoButton.vue";
import { useMarzipano } from "../composables/useMarzipano";
import type { MarzipanoData } from "../types";

const props = defineProps({
    data: {
        type: Object as PropType<MarzipanoData>,
        required: true
    }
});

const {
  panoElement,
  viewer,
  scenes,
  currentScene,
  allHotspots,
  enableAutoRotate,
  autorotateSettings,
  initMarzipano,
  switchScene,
  findSceneById,
  findSceneDataById,
  destroyMarzipano
} = useMarzipano();

provide("scenes", scenes);
provide("viewer", viewer);
provide("data", props.data);
provide("currentScene", currentScene);
provide("panoElement", panoElement);
provide("enableAutoRotate", enableAutoRotate);
provide("autorotateSettings", autorotateSettings);
provide("marzipanoViewFunctions", {switchScene});

defineExpose({enableAutoRotate, switchScene, findSceneById, findSceneDataById});

const navigationButtons = computed(() => props.data.settings.navigationButtons)

onMounted(() => {
  if (panoElement.value) {
    initMarzipano(panoElement.value, props.data);
  }
});

onUnmounted(() => {
    destroyMarzipano();
});
</script>

<style lang="scss">
.pano {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > *:not(:nth-last-child(-n+2)) {
    z-index: 2;
  }
}

.control-buttons {
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.button-layout
{
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
