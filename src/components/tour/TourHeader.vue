<template>
  <div class="glass absolute inset-x-0 top-0 flex h-14 items-center gap-3 px-3">
    <button
      type="button"
      class="icon-btn"
      aria-controls="tour-scene-menu"
      :aria-expanded="menuOpen"
      :aria-label="menuOpen ? 'Close scene menu' : 'Open scene menu'"
      @click="emit('toggle-menu')"
    >
      <TourIcon :name="menuOpen ? 'close' : 'menu'" />
    </button>
    <div class="min-w-0 flex-1">
      <p class="text-text-main/70 truncate text-xs">{{ data?.name }}</p>
      <h2 class="truncate text-base leading-tight md:text-lg">{{ currentScene?.data.name }}</h2>
    </div>
    <p class="text-text-main/70 shrink-0 text-sm tabular-nums">{{ position }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useMarzipano } from '@greener-games/vue-marzipano';
  import { computed } from 'vue';
  import TourIcon from './TourIcon.vue';

  defineProps<{
    menuOpen: boolean;
  }>();

  const emit = defineEmits<{
    'toggle-menu': [];
  }>();

  // Rendered in the viewer's titleBar slot, so useMarzipano() reaches that viewer
  const { data, scenes, currentScene } = useMarzipano();

  const position = computed(() => {
    const index = scenes.value.findIndex((scene) => scene === currentScene.value);
    return index < 0 ? '' : `${index + 1} / ${scenes.value.length}`;
  });
</script>
