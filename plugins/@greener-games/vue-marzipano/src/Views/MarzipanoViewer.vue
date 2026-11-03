<template>
  <div ref="panoElement" class="pano">
    <slot name="titleBar">
      <TitleBar />
    </slot>
    <MarzipanoHotspot
      v-for="hotspot in allHotspots"
      :id="hotspot.id"
      :key="hotspot.id"
      :hotspot-info="hotspot"
    />
    <slot name="contentButtons">
      <div class="control-buttons">
        <div class="button-layout" style="gap: 1rem">
          <VueMarzipanoButton
            v-for="button in navigationButtons"
            :key="button.type + (button.imageName || '')"
            class="marzipano-button"
            :button-data="button"
          />
        </div>
      </div>
    </slot>
    <slot name="scenes">
      <SceneList @select-scene="switchScene(findSceneById($event.id))" />
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import SceneList from '../Components/SceneList.vue';
  import TitleBar from '../Components/TitleBar.vue';
  import MarzipanoHotspot from '../Components/MarzipanoHotspot.vue';
  import VueMarzipanoButton from '../Components/VueMarzipanoButton.vue';
  import { useMarzipano } from '../composables/useMarzipano';
  import { provideMarzipanoContext } from '../context';
  import type { MarzipanoData } from '../types';

  const props = defineProps<{
    data: MarzipanoData;
  }>();

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
    destroyMarzipano,
  } = useMarzipano();

  provideMarzipanoContext({
    scenes,
    viewer,
    data: props.data,
    currentScene,
    panoElement,
    enableAutoRotate,
    autorotateSettings,
    viewFunctions: { switchScene, findSceneById, findSceneDataById },
  });

  defineExpose({ enableAutoRotate, switchScene, findSceneById, findSceneDataById });

  const navigationButtons = computed(() => props.data.settings.navigationButtons);

  onMounted(() => {
    if (panoElement.value) {
      initMarzipano(panoElement.value, props.data);
    }
  });

  onUnmounted(() => {
    destroyMarzipano();
  });
</script>

<style>
  .pano {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .pano > *:not(:nth-last-child(-n + 2)) {
    z-index: 2;
  }

  .control-buttons {
    position: absolute;
    bottom: 10%;
    width: 100%;
    display: flex;
    place-content: center;
  }

  .button-layout {
    display: flex;
    place-content: center;
  }
</style>
