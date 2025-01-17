<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './layouts/TheHeader.vue';
import TheFooter from './layouts/TheFooter.vue';
</script>

<template>
   <TheHeader />
   <transition name="fade">
      <RouterView />
   </transition>
   <TheFooter />
</template>

<style scoped>
/* 애니메이션 클래스 정의 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>