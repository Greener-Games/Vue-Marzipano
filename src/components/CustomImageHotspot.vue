<template>
  <div class="custom-image-hotspot" @click="handleClick">
    <div class="icon-container">
      ⭐
    </div>
    <div class="tooltip" v-if="showTooltip">
      <h4>{{ hotspot.title || 'Custom Hotspot' }}</h4>
      <p>{{ hotspot.text || 'Click me!' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  hotspot: {
    type: Object,
    required: true
  }
});

const showTooltip = ref(false);

const handleClick = () => {
  showTooltip.value = !showTooltip.value;
  if (props.hotspot.onClickAction) {
    alert(props.hotspot.onClickAction);
  }
};
</script>

<style scoped>
.custom-image-hotspot {
  position: relative;
  cursor: pointer;
}

.icon-container {
  font-size: 2rem;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.tooltip h4 {
  margin: 0 0 5px 0;
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
  border-color: #2c3e50 transparent transparent transparent;
}
</style>
