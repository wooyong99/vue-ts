<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
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

<!-- <script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
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


<!-- <script setup lang="ts">

const props = defineProps<{
    // overlayClass ?: Record<string, boolean|string>;
    // overlayMessageClass?: Record<string, boolean|string>;
    content ?: string;
}>();
</script>

<template>
    <div class="default-overlay">
        <slot>
            <div class='default-popup'>
                Loading ...
            </div>    
        </slot>
    </div>
</template>

<style>
.default-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.5)
}
.default-popup {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);    
    color: white;
    font-weight: bold;
    font-size: 25px;
}
</style> --> -->