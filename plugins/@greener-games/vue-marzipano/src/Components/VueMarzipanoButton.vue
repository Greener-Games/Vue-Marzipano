<template>
  <component :is="buttonType" :buttonData="buttonData"/>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent, defineProps, resolveComponent} from 'vue';
import NavigateButton from "./NavigateButton.vue";

const props = defineProps({
  buttonData: Object,
})

const buttonType = computed(() => {
      const type = props.buttonData?.type;
      let component;

      if (type) {
        component = resolveComponent(type);

        // If resolveComponent doesn't return a valid component, use defineAsyncComponent
        if (component === null || component === undefined || typeof component === 'string') {
          component = defineAsyncComponent({
            loader: () => import(`./${type}.vue`),
            loadingComponent: NavigateButton,
            errorComponent: NavigateButton,
          })
        }
      }

      return component && typeof component !== 'string' ? component : NavigateButton;
    }
)
</script>

<style scoped>

</style>