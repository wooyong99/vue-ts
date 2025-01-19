<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>();

function closePopup() {
  console.log('close')
  emit('close')
}
</script>

<template>
  <div class="overlay" @click.self="closePopup">
    <div class="popup">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>