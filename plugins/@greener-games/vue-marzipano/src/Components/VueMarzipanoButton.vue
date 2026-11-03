<template>
  <component :is="buttonType" v-if="buttonType" :button-data="buttonData" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import AutoRotateButton from './Buttons/AutoRotateButton.vue';
  import FullscreenButton from './Buttons/FullscreenButton.vue';
  import NavigateButton from './Buttons/NavigateButton.vue';
  import { resolveTypeComponent } from '../helpers';
  import type { NavigationButton } from '../types';

  const props = defineProps<{
    buttonData: NavigationButton;
  }>();

  const builtIns = { AutoRotateButton, FullscreenButton, NavigateButton };

  const buttonType = computed(() =>
    resolveTypeComponent(props.buttonData.type || 'NavigateButton', builtIns, 'button'),
  );
</script>
