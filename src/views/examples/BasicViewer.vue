<template>
  <div class="content">
    <pano ref="marzipanoViewer" v-if="fetchedData" :data="fetchedData">
    </pano>
  </div>

  <button class="new-toggle" @click="toggleAutoRotate">Toggle Auto Rotate</button>

</template>

<script setup lang="ts">
import { MarzipanoViewer as pano, findEnvVariableByKey } from '@greener-games/vue-marzipano'
import {onMounted, ref} from "vue";
import {data as localData} from '@/data/data';

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
