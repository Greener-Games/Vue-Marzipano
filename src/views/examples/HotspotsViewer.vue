<template>
  <div class="content">
    <div class="instructions">
      <h2>Custom Hotspots Example</h2>
      <p>
        This viewer demonstrates different types of informational hotspots. Pan the camera slightly
        left to see the Custom Image Hotspot (⭐), and slightly right to see the standard
        InfoHotspot.
      </p>
    </div>
    <div class="pano-wrapper">
      <MarzipanoViewer v-if="fetchedData" :data="fetchedData" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  import type { MarzipanoData } from '@greener-games/vue-marzipano';
  import { onMounted, ref } from 'vue';
  import { data as localData } from '@/data/hotspotsData';

  const fetchedData = ref<MarzipanoData | null>(null);

  onMounted(() => {
    // Use the local static data that has our custom hotspots injected
    fetchedData.value = localData;
  });
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .instructions {
    padding: 1rem;
    background-color: #f0f8ff;
    border-bottom: 1px solid #cce5ff;
  }

  .instructions h2 {
    margin-top: 0;
  }

  .pano-wrapper {
    flex: 1;
    position: relative;
  }
</style>
