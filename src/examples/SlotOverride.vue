<template>
  <div class="content">
    <pano v-if="fetchedData" :data="fetchedData">
      <template #titleBar>
        <div class="custom-title-bar">
          <h1>Custom Title Bar</h1>
          <p>{{ fetchedData.name }}</p>
        </div>
      </template>

      <template #contentButtons>
        <div class="custom-controls">
          <button @click="alert('Custom Action!')">Custom Action</button>
        </div>
      </template>
    </pano>
  </div>
</template>

<script setup lang="ts">
import pano from '@VueMarzipano/Views/MarzipanoViewer.vue'
import {onMounted, ref} from "vue";
import {data as localData} from '@/data/data';

const fetchedData = ref(null);

onMounted(() => {
  fetchedData.value = localData;
});

function alert(msg: string) {
  window.alert(msg);
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.custom-title-bar {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 10px;
  z-index: 100;
  border-radius: 5px;
}
.custom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}
</style>
