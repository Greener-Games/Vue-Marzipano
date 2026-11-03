<template>
  <div class="content">
    <MarzipanoViewer v-if="fetchedData" ref="marzipanoViewer" :data="fetchedData" />
  </div>

  <button type="button" class="new-toggle" @click="toggleAutoRotate">Toggle Auto Rotate</button>
</template>

<script setup lang="ts">
  import { MarzipanoViewer, findEnvVariableByKey } from '@greener-games/vue-marzipano';
  import type { MarzipanoData } from '@greener-games/vue-marzipano';
  import { onMounted, ref } from 'vue';
  import { data as localData } from '@/data/data';
  import { logger } from '@/utils/logger';

  const marzipanoViewer = ref<InstanceType<typeof MarzipanoViewer> | null>(null);
  const fetchedData = ref<MarzipanoData | null>(null);

  onMounted(async () => {
    if (localData?.cloud?.enabled) {
      try {
        const url = `${localData.cloud.url}/data.js?${findEnvVariableByKey(localData.cloud.key)}`;
        const response = (await import(/* @vite-ignore */ url)) as { data: MarzipanoData };
        fetchedData.value = { ...response.data, cloud: localData.cloud };
      } catch (error) {
        logger.error('Failed to fetch data from cloud:', error);
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

  .new-toggle {
    position: absolute;
    top: 50%;
  }
</style>
