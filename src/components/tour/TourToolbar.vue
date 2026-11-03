<template>
  <div class="absolute end-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
    <button type="button" class="icon-btn" aria-label="Zoom in" @click="zoom(0.8)">
      <TourIcon name="zoomIn" />
    </button>
    <button type="button" class="icon-btn" aria-label="Zoom out" @click="zoom(1.25)">
      <TourIcon name="zoomOut" />
    </button>
    <button
      type="button"
      class="icon-btn"
      aria-label="Auto-rotate"
      :aria-pressed="enableAutoRotate"
      @click="toggleAutoRotate"
    >
      <TourIcon :name="enableAutoRotate ? 'pause' : 'play'" />
    </button>
    <button
      type="button"
      class="icon-btn"
      aria-label="Fullscreen"
      :aria-pressed="isFullscreen"
      :disabled="!canFullscreen"
      @click="toggleFullscreen"
    >
      <TourIcon name="fullscreen" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useMarzipano } from '@greener-games/vue-marzipano';
  import { onMounted, onUnmounted, ref } from 'vue';
  import TourIcon from './TourIcon.vue';
  import { logger } from '@/utils/logger';

  const { currentScene, enableAutoRotate, panoElement, setFov } = useMarzipano();

  // A factor below 1 narrows the field of view, which zooms in
  function zoom(factor: number) {
    const view = currentScene.value?.view;
    if (!view) return;
    enableAutoRotate.value = false;
    setFov(view.fov() * factor);
  }

  function toggleAutoRotate() {
    enableAutoRotate.value = !enableAutoRotate.value;
  }

  const canFullscreen = document.fullscreenEnabled;
  const isFullscreen = ref(false);

  function syncFullscreen() {
    isFullscreen.value = document.fullscreenElement === panoElement.value;
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await panoElement.value?.requestFullscreen();
    } catch (error) {
      logger.error('Fullscreen request failed:', error);
    }
  }

  onMounted(() => document.addEventListener('fullscreenchange', syncFullscreen));
  onUnmounted(() => document.removeEventListener('fullscreenchange', syncFullscreen));
</script>
