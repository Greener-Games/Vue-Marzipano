<template>
  <div class="custom-hotspot" @click="onClick">
    <span>★ {{ hotspot.text }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  hotspot: Object
});

function onClick() {
  alert(`Clicked custom hotspot: ${props.hotspot.text}`);
}
</script>

<style scoped>
.custom-hotspot {
  background: gold;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  color: black;
  font-weight: bold;
  white-space: nowrap;
}
</style>
