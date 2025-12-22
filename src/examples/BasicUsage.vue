<template>
  <div class="content">
    <pano ref="marzipanoViewer" v-if="fetchedData" :data="fetchedData">
    </pano>
  </div>

  <button class="new-toggle" @click="toggleAutoRotate">Toggle Auto Rotate</button>

</template>

<script setup lang="ts">
import pano from '@VueMarzipano/Views/MarzipanoViewer.vue'
import {onMounted, ref} from "vue";
import {data as localData} from '@/data/data';
import {findEnvVariableByKey} from "@VueMarzipano/helpers.ts";

const marzipanoViewer = ref(null);
const fetchedData = ref(null);

onMounted(async () => {
  if (localData?.cloud?.enabled) {
    try {
      const url = `${localData.cloud.url}/data.js?${findEnvVariableByKey(localData.cloud.key)}`;
      const response = await import(url);
      fetchedData.value = {...response.data, cloud: localData.cloud};
    } catch (error) {
      console.error('Failed to fetch data from cloud:', error);
      fetchedData.value = localData;
    }
  } else {
    fetchedData.value = localData;
  }
});

function toggleAutoRotate() {
  if (marzipanoViewer.value) {
    marzipanoViewer.value.enableAutoRotate = !marzipanoViewer.value.enableAutoRotate;
  }
}

</script>

<style scoped>

.content {
  width: 100%;
  height: 100%;
}

.new-toggle
{
  position: absolute;
  top:50%
}
</style>
