<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import axios from 'axios';
import router from '../../router/router';
import BaseOverlay from '../BaseOverlay.vue';
import { useRoute } from 'vue-router';
import useAxios from '../../apis/http';
import { UserListResponse } from '../../types/UserTypes';

const users = ref<UserListResponse[] | null>([])
const route = useRoute();
const { $get } = useAxios<UserListResponse[]>();

function openPopup(userId:number) {
    router.push(`/users/${userId}`)
}

function closePopup(){
    router.push('/users')
}

async function fetchData() {
    const response = await $get('dummy/users/list.json')
    if ( response.status == 200 ){
        users.value = response.data;
    } else {
        console.error( response.error );
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="w-full">
        <div
            v-for="(user, index) in users" :key="index"
        >
            <div class="flex justify-around" @click="() => openPopup(user.id)">
                <p>{{  user.id }}</p>
                <p>{{  user.email }}</p>
                <p>{{  user.password }}</p>
                <p>{{  user.createdAt }}</p>
            </div>
        </div>
        <!-- 팝업 렌더링 -->
        <BaseOverlay v-if="route.name === 'UserDetail'" @close="closePopup">
            <router-view />
        </BaseOverlay>
    </div>
</template>