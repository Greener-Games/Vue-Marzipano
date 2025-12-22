<template>
  <div class="app-container">
    <nav class="nav-bar">
      <button
        v-for="example in examples"
        :key="example.name"
        :class="{ active: currentExample === example.component }"
        @click="currentExample = example.component"
      >
        {{ example.name }}
      </button>
    </nav>
    <div class="example-container">
      <component :is="currentExample" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import BasicUsage from './examples/BasicUsage.vue';
import SlotOverride from './examples/SlotOverride.vue';
import CustomViewpoints from './examples/CustomViewpoints.vue';
import CustomHotspots from './examples/CustomHotspots.vue';

const examples = [
  { name: 'Basic Usage', component: BasicUsage },
  { name: 'Slot Override', component: SlotOverride },
  { name: 'Custom Viewpoints', component: CustomViewpoints },
  { name: 'Custom Hotspots', component: CustomHotspots },
];

const currentExample = shallowRef(BasicUsage);
</script>

<style>
/* Global styles reset */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.nav-bar {
  padding: 10px;
  background: #f0f0f0;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #ccc;
  flex-shrink: 0;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #0056b3;
}

.example-container {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
</style>
