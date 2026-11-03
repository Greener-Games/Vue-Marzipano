<template>
  <div class="info-hotspot">
    <h3>{{ hotspot.title }}</h3>
    <p>{{ hotspot.text }}</p>
  </div>
</template>

<script setup lang="ts">
  import type { InfoHotspot } from '@greener-games/vue-marzipano';

  defineProps<{
    hotspot: InfoHotspot;
  }>();
</script>

<style scoped>
  .info-hotspot {
    width: 16rem;
    max-height: 12rem;
    overflow-y: auto;
    background-color: rgb(255 255 255 / 80%);
    padding: 10px;
    border-radius: 5px;
  }
</style>
