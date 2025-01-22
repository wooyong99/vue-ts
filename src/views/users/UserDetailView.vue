<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios'
import { UserDetailResponse } from '../../types/UserTypes';

const route = useRoute();
const user:Ref<UserDetailResponse|undefined> = ref(undefined);
const isLoading = ref(true);
const userId = ref<number|null>(null);

async function fetchUser(id: number) {
    await axios
        .get('../../../../dummy/users/list.json')
        .then((res) => {
            user.value = res.data.find((item: UserDetailResponse) => item.id == userId.value) || null
        })
        .catch((res) => {
        })
        .finally(() => {
            isLoading.value = false;
        });
}

onMounted(() => {
    userId.value = Number(route.params.id);
    if(userId.value) fetchUser(userId.value);
    
})
</script>

<template>
  <div v-if="user">
    <p>사용자 ID: {{ user.id }}</p>
    <p>사용자 EMAIL: {{ user.email }}</p>
    <p>사용자 이름 : {{ user.username }}</p>
    <p>사용자 PW: {{ user.password }}</p>
    <p>생성일자: {{ user.createdAt }}</p>
  </div>
  <p v-else>사용자 정보를 불러오는 중...</p>
</template>