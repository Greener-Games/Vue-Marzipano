<template>
  <div class="multiple-viewers-container">
    <h2>Multiple Instances Example</h2>
    <p>This example demonstrates running two isolated instances of the Marzipano viewer on the same page.</p>

    <div class="viewers-grid">
      <div class="viewer-wrapper">
        <h3>Instance 1</h3>
        <div class="pano-container">
          <pano ref="viewer1" v-if="data1" :data="data1"></pano>
        </div>
      </div>

      <div class="viewer-wrapper">
        <h3>Instance 2</h3>
        <div class="pano-container">
          <pano ref="viewer2" v-if="data2" :data="data2"></pano>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MarzipanoViewer as pano } from '@greener-games/vue-marzipano'
import { onMounted, ref } from "vue";
import { data as localData } from '@/data/data';

const viewer1 = ref(null);
const viewer2 = ref(null);

const data1 = ref(null);
const data2 = ref(null);

onMounted(() => {
  // Use the same data for demonstration, but they will be independent instances
  data1.value = localData;
  data2.value = localData;
});
</script>

<style scoped>
.multiple-viewers-container {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.viewers-grid {
  display: flex;
  gap: 2rem;
  flex: 1;
  min-height: 500px;
}

.viewer-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pano-container {
  flex: 1;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>
