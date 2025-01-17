<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import axios from 'axios';
import router from '../../router/router';
import BaseOverlay from '../BaseOverlay.vue';
import { useRoute } from 'vue-router';

interface User {
    id: number,
    email: string,
    username: string,
    password: string,
    createdAt : string,
    age?: number
}

const users = ref<User[]>([])
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const route = useRoute();

async function fetchData() {
    await axios.get('../../../../dummy/users/list.json')
    .then((res) => {
        console.log(res.data)
        console.log(res.data)
        console.log(res.data)
        users.value = res.data;
    })
    .catch((res) => {
        console.log(res)
    })
    .finally(() => {
    });
}
onMounted(() => {
    fetchData()
})

function openPopup(userId:number) {
    router.push(`/users/${userId}`)
}

function closePopup(){
    router.push('/users')
}

</script>

<template>
    <div class="w-full">
        <div
            v-for="(user, index) in users" :key="index"
        >
            <div class="flex justify-around" @click="() => openPopup(user.id)">
                <p>{{  user.id }}</p>
                <p>{{  user.email }}</p>
                <p>{{  user.age }}</p>
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