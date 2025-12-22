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
  const customData = JSON.parse(JSON.stringify(localData));

  // Add a custom hotspot to the first scene
  if (customData.scenes && customData.scenes.length > 0) {
      customData.scenes[0].infoHotspots.push({
          yaw: 0.2,
          pitch: 0.1,
          title: "Custom Star",
          text: "This is a custom Vue component hotspot",
          type: "CustomHotspot" // This matches the registered global component name
      });
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
