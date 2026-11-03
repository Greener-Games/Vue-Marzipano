<template>
  <div ref="root" class="pano">
    <slot name="titleBar">
      <TitleBar />
    </slot>
    <MarzipanoHotspot
      v-for="placed in hotspots"
      :key="placed.key"
      :hotspot-key="placed.key"
      :hotspot-info="placed.hotspot"
    />
    <slot name="contentButtons">
      <div class="control-buttons">
        <div class="button-layout" style="gap: 1rem">
          <VueMarzipanoButton
            v-for="(button, index) in navigationButtons"
            :key="index"
            class="marzipano-button"
            :button-data="button"
          />
        </div>
      </div>
    </slot>
    <slot name="scenes">
      <SceneList />
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue';
  import SceneList from '../Components/SceneList.vue';
  import TitleBar from '../Components/TitleBar.vue';
  import MarzipanoHotspot from '../Components/MarzipanoHotspot.vue';
  import VueMarzipanoButton from '../Components/VueMarzipanoButton.vue';
  import { createMarzipano, marzipanoKey } from '../composables/useMarzipano';
  import type { MarzipanoData } from '../types';

  const props = defineProps<{
    data: MarzipanoData;
  }>();

  // This viewer's own state, so several viewers can share a page
  const { controls, hotspots, initMarzipano, destroyMarzipano } = createMarzipano();
  provide(marzipanoKey, controls);
  defineExpose(controls);

  const root = ref<HTMLElement | null>(null);
  const navigationButtons = computed(() => props.data.settings?.navigationButtons ?? []);

  function load() {
    if (root.value) {
      initMarzipano(root.value, props.data);
    }
  }

  onMounted(load);
  // Rebuild when the tour changes: a new object, or a change inside a reactive one
  watch(() => props.data, load, { deep: true });
  onUnmounted(destroyMarzipano);
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
