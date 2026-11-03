<template>
  <button
    type="button"
    class="navigation-button cursor-pointer"
    :aria-label="label"
    @click="navigate()"
  >
    <img :src="imageSrc" alt="" />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { GetImage } from '../../helpers';
  import { useMarzipanoContext } from '../../context';
  import type { NavigationButton } from '../../types';

  const props = defineProps<{
    buttonData: NavigationButton;
  }>();

  const { enableAutoRotate, currentScene } = useMarzipanoContext();

  const imageSrc = computed(() => GetImage(props.buttonData.imageName));

  const label = computed(() => {
    const { label, zoomFactor, xFactor, yFactor } = props.buttonData;
    if (label) return label;
    if (zoomFactor) return zoomFactor < 1 ? 'Zoom in' : 'Zoom out';
    if (xFactor) return xFactor < 0 ? 'Look left' : 'Look right';
    if (yFactor) return yFactor < 0 ? 'Look up' : 'Look down';
    return 'Move view';
  });

  function navigate() {
    const view = currentScene.value?.view;
    if (!view) return;

    const currentPitch = (view.pitch() * 180) / Math.PI;
    const currentYaw = (view.yaw() * 180) / Math.PI;
    const currentFov = view.fov();

    if (props.buttonData.yFactor) {
      const targetPitch = currentPitch + props.buttonData.yFactor;
      view.setPitch((targetPitch * Math.PI) / 180);
    }

    if (props.buttonData.xFactor) {
      const targetYaw = currentYaw + props.buttonData.xFactor;
      view.setYaw((targetYaw * Math.PI) / 180);
    }

    if (props.buttonData.zoomFactor) {
      view.setFov(currentFov * props.buttonData.zoomFactor);
    }

    enableAutoRotate.value = false;
  }
</script>
