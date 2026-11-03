<template>
  <div class="content">
    <MarzipanoViewer v-if="fetchedData" :data="fetchedData">
      <template #titleBar>
        <div class="custom-title-bar">
          <h1>Custom Title Bar</h1>
          <p>{{ fetchedData.name }}</p>
        </div>
      </template>

      <template #contentButtons>
        <div class="custom-controls">
          <button type="button" @click="alert('Custom Action!')">Custom Action</button>
        </div>
      </template>
    </MarzipanoViewer>
  </div>
</template>

<script setup lang="ts">
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  import type { MarzipanoData } from '@greener-games/vue-marzipano';
  import { onMounted, ref } from 'vue';
  import { data as localData } from '@/data/data';

  const fetchedData = ref<MarzipanoData | null>(null);

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
    background: rgb(0 0 0 / 70%);
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
