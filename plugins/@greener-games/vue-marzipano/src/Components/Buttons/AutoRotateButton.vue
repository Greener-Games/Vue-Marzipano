<template>
  <button
    type="button"
    class="autorotate-toggle cursor-pointer"
    :aria-label="buttonData.label || (enableAutoRotate ? 'Stop auto-rotate' : 'Start auto-rotate')"
    :aria-pressed="enableAutoRotate"
    @click="toggle"
  >
    <img v-if="!enableAutoRotate" :src="imageSrcOff" alt="" />
    <img v-else :src="imageSrcOn" alt="" />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMarzipano } from '../../composables/useMarzipano';
  import { resolveImageUrl } from '../../helpers';
  import type { NavigationButton } from '../../types';

  const props = defineProps<{
    buttonData: NavigationButton;
  }>();

  const imageSrcOn = computed(() => resolveImageUrl(props.buttonData.imageOn));
  const imageSrcOff = computed(() => resolveImageUrl(props.buttonData.imageOff));

  // The viewer starts and stops the rotation when this changes
  const { enableAutoRotate } = useMarzipano();

  function toggle() {
    enableAutoRotate.value = !enableAutoRotate.value;
  }
</script>
