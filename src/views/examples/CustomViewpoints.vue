<template>
  <div class="content">
    <MarzipanoViewer v-if="fetchedData" :data="fetchedData" />
  </div>
</template>

<script setup lang="ts">
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  import type { MarzipanoData } from '@greener-games/vue-marzipano';
  import { onMounted, ref } from 'vue';
  import { data as localData } from '@/data/data';

  const fetchedData = ref<MarzipanoData | null>(null);

  onMounted(() => {
    // Clone data to avoid mutating original
    const customData = structuredClone(localData);

    // Modify initial view of the first scene
    const firstScene = customData.scenes[0];
    if (firstScene) {
      // Set to look straight up (pitch: 1.57) or somewhere else
      firstScene.initialViewParameters = {
        yaw: 3.14, // Turn around
        pitch: 0.5, // Look up slightly
        fov: 2.0, // Wide angle
      };
    }

    fetchedData.value = customData;
  });
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
  }
</style>
