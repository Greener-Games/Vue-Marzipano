<template>
  <svg
    class="size-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name]" />
  </svg>
</template>

<script setup lang="ts">
  type IconName =
    | 'menu'
    | 'close'
    | 'previous'
    | 'next'
    | 'zoomIn'
    | 'zoomOut'
    | 'play'
    | 'pause'
    | 'fullscreen';

  defineProps<{
    name: IconName;
  }>();

  // Small stroke icons for the custom layout example; they take the text colour via currentColor
  const paths: Record<IconName, string> = {
    menu: 'M4 6h16M4 12h16M4 18h16',
    close: 'M6 6l12 12M18 6L6 18',
    previous: 'M15 18l-6-6 6-6',
    next: 'M9 18l6-6-6-6',
    zoomIn: 'M12 5v14M5 12h14',
    zoomOut: 'M5 12h14',
    play: 'M8 5v14l11-7z',
    pause: 'M9 5v14M15 5v14',
    fullscreen: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5',
  };
</script>
