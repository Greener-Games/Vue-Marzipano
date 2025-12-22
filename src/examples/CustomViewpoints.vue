<template>
  <div class="content">
    <pano v-if="fetchedData" :data="fetchedData">
    </pano>
  </div>
</template>

<script setup lang="ts">
import pano from '@VueMarzipano/Views/MarzipanoViewer.vue'
import {onMounted, ref} from "vue";
import {data as localData} from '@/data/data';

const fetchedData = ref(null);

onMounted(() => {
  // Clone data to avoid mutating original
  const customData = JSON.parse(JSON.stringify(localData));

  // Modify initial view of the first scene
  if (customData.scenes && customData.scenes.length > 0) {
      // Set to look straight up (pitch: 1.57) or somewhere else
      customData.scenes[0].initialViewParameters = {
          yaw: 3.14, // Turn around
          pitch: 0.5, // Look up slightly
          fov: 2.0 // Wide angle
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
