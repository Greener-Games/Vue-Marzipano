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
  import { computed, onMounted, watch } from 'vue';
  import { GetImage } from '../../helpers';
  import { useMarzipanoContext } from '../../context';
  import type { NavigationButton } from '../../types';

  const props = defineProps<{
    buttonData: NavigationButton;
  }>();

  const imageSrcOn = computed(() => GetImage(props.buttonData.imageOn));
  const imageSrcOff = computed(() => GetImage(props.buttonData.imageOff));

  const { viewer, currentScene, enableAutoRotate, autorotateSettings } = useMarzipanoContext();

  onMounted(() => {
    Set(enableAutoRotate.value);
  });

  function Set(state: boolean) {
    enableAutoRotate.value = state;
    if (enableAutoRotate.value) {
      startAutorotate();
    } else {
      stopAutorotate();
    }
  }

  function toggle() {
    Set(!enableAutoRotate.value);
  }

  watch(enableAutoRotate, (value) => {
    Set(value);
  });

  watch(currentScene, () => {
    stopAutorotate();
    startAutorotate();
  });

  function startAutorotate() {
    if (!enableAutoRotate.value) {
      return;
    }
    viewer.value?.startMovement(autorotateSettings);
    viewer.value?.setIdleMovement(3000, autorotateSettings);
  }

  function stopAutorotate() {
    viewer.value?.stopMovement();
    viewer.value?.setIdleMovement(Infinity);
  }
</script>
