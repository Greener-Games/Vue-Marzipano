<template>
  <button
    type="button"
    class="navigation-button cursor-pointer"
    :aria-label="buttonData.label || (isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen')"
    @click="toggle()"
  >
    <img :src="imageSrc" alt="" />
  </button>
</template>

<script setup lang="ts">
  import { useFullscreen } from '@vueuse/core';
  import { computed } from 'vue';
  import { GetImage } from '../../helpers';
  import { useMarzipanoContext } from '../../context';
  import type { NavigationButton } from '../../types';

  const props = defineProps<{
    buttonData: NavigationButton;
  }>();

  const { panoElement } = useMarzipanoContext();
  const { isFullscreen, toggle } = useFullscreen(panoElement);

  const imageSrc = computed(() => GetImage(props.buttonData.imageName));
</script>
