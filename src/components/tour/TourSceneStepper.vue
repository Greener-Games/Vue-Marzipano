<template>
  <div
    v-if="scenes.length > 1"
    class="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2 px-3"
  >
    <button
      type="button"
      class="pill-btn pointer-events-auto"
      :aria-label="`Previous scene: ${previous?.data.name}`"
      @click="switchScene(previous)"
    >
      <TourIcon name="previous" class="rtl:-scale-x-100" />
      <span class="truncate">{{ previous?.data.name }}</span>
    </button>
    <button
      type="button"
      class="pill-btn pointer-events-auto"
      :aria-label="`Next scene: ${next?.data.name}`"
      @click="switchScene(next)"
    >
      <span class="truncate">{{ next?.data.name }}</span>
      <TourIcon name="next" class="rtl:-scale-x-100" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useMarzipano } from '@greener-games/vue-marzipano';
  import { computed } from 'vue';
  import TourIcon from './TourIcon.vue';

  const { scenes, currentScene, switchScene } = useMarzipano();

  // The scene `offset` places away from the current one, wrapping round at either end
  function sceneAt(offset: number) {
    const count = scenes.value.length;
    const index = scenes.value.findIndex((scene) => scene === currentScene.value);
    return scenes.value[(index + offset + count) % count] ?? null;
  }

  const previous = computed(() => sceneAt(-1));
  const next = computed(() => sceneAt(1));
</script>
