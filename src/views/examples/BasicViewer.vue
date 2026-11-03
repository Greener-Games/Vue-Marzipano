<template>
  <div class="content">
    <MarzipanoViewer ref="marzipanoViewer" :data="data" />
  </div>

  <button type="button" class="new-toggle" @click="toggleAutoRotate">Toggle Auto Rotate</button>
</template>

<script setup lang="ts">
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  import { ref } from 'vue';
  import { data } from '@/data/data';

  const marzipanoViewer = ref<InstanceType<typeof MarzipanoViewer> | null>(null);

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

  .new-toggle {
    position: absolute;
    top: 50%;
  }
</style>
