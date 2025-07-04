<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();

const isSuccess = computed(() => route.query.isSuccess === 'true');
// 전화번호 값 계산 (성공인 경우만 할당)
const tel = computed(() => (isSuccess.value && route.query.tel ? route.query.tel : "없음"));

// 알림 표시
if (isSuccess) {
    alert('성공');
} else {
    alert('실패');
}

</script>

<template>
    <h1>{{ isSuccess ? "Success" : "Fail"}}</h1>
    <div>{{ isSuccess ? tel : "실패"}}</div>
</template>