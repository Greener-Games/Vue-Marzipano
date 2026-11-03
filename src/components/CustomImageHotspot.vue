<template>
  <div class="custom-image-hotspot">
    <button
      type="button"
      class="icon-container"
      :aria-expanded="showTooltip"
      :aria-label="hotspot.title || 'Custom Hotspot'"
      @click="handleClick"
    >
      ⭐
    </button>
    <div v-if="showTooltip" class="tooltip">
      <h4>{{ hotspot.title || 'Custom Hotspot' }}</h4>
      <p>{{ hotspot.text || 'Click me!' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { InfoHotspot } from '@greener-games/vue-marzipano';

  const props = defineProps<{
    hotspot: InfoHotspot & { onClickAction?: string };
  }>();

  const showTooltip = ref(false);

  const handleClick = () => {
    showTooltip.value = !showTooltip.value;
    if (props.hotspot.onClickAction) {
      window.alert(props.hotspot.onClickAction);
    }
  };
</script>

<style scoped>
  .custom-image-hotspot {
    position: relative;
    cursor: pointer;
  }

  .icon-container {
    border: 0;
    cursor: pointer;
    font-size: 2rem;
    background: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
    transition: transform 0.2s;
  }

  .icon-container:hover {
    transform: scale(1.1);
  }

  .tooltip {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    background: #2c3e50;
    color: white;
    padding: 10px;
    border-radius: 4px;
    width: max-content;
    max-width: 200px;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    text-align: center;
  }

  .tooltip h4 {
    margin: 0 0 5px;
    font-size: 14px;
  }

  .tooltip p {
    margin: 0;
    font-size: 12px;
  }

  /* Tooltip arrow */
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #2c3e50 transparent transparent;
  }
</style>
