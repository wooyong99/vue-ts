<script setup lang="ts">
import Container from '../components/BaseContainer.vue';
</script>

<template>
    <Container class="my-5">
        <div class="w-full flex justify-evenly">
            <router-link to="/" class="border-4 rounded-full px-4 py-2">상품 목록으로 가기</router-link>
            <RouterLink to="/users" class="border-4 rounded-full px-4 py-2">사용자 목록으로 가기</RouterLink>
            <RouterLink to="/admins" class="border-4 rounded-full px-4 py-2">관리자 페이지 가기기</RouterLink>
        </div>
    </Container>
</template>

<style lang="sass" module>
</style>