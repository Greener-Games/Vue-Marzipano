<template>
  <component :is="buttonType" :button-data="buttonData" />
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, resolveComponent } from 'vue';
  import type { Component } from 'vue';
  import NavigateButton from './Buttons/NavigateButton.vue';
  import type { NavigationButton } from '../types';

  const props = defineProps<{
    buttonData: NavigationButton;
  }>();

  const buttonType = computed<Component>(() => {
    const type = props.buttonData.type;
    if (!type) return NavigateButton;

    const component = resolveComponent(type);
    if (typeof component !== 'string') return component;

    // Not registered globally: look for a built-in button component of that name. Imported
    // from the Buttons subdirectory so this file can't match (and import) itself.
    return defineAsyncComponent({
      loader: () => import(`./Buttons/${type}.vue`) as Promise<Component>,
      loadingComponent: NavigateButton,
      errorComponent: NavigateButton,
    });
  });
</script>
