<!-- <script>
// <script setup>을 사용하는 경우, 별도의 일반 <script> 블록을 사용하여 속성 상속을 비활성화한다.
export default {
    inheritAttrs: false
}
</script> -->

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

interface User {
    id: number,
    email: string,
    username: string,
    password: string,
    createdAt : string
}

const isLoading: Ref<Boolean> = ref(false);
    
const props = defineProps<{
    user?: User
}>()

</script>

<template>
    <div v-if="isLoading">
            <h1 class="font-bold text-3xl">로딩 중 입니다.</h1>
        </div>
        <div v-else-if="user != null">
            <h1 class="font-bold text-3xl">{{ user.id }}번 사용자 정보</h1>
            <p class="text-xl">{{  user.email }}</p>
            <p class="text-xl">{{  user.password }}</p>
            <p class="text-xl">{{  user.email }}</p>
            <p class="text-xl">{{  user.createdAt }}</p>
        </div>
        <div v-else>
            <h1 class="font-bold text-3xl">존재하지 않는 사용자입니다.</h1>
    </div>


    <!-- <router-link to="/items/1" >{{ props.id }} 번 리스트 아이템입니다.</router-link>
    <div 
        class="border-2 px-10 mb-3 mx-5 rounded-3xl py-4"
    >
        <div class="flex justify-between">
            <div class="flex-grow" @click="goToItemDetail(props.id)">
                <div><span class="font-bold">{{ props.id }} 번</span> 사용자입니다.</div>
            </div>
            <button @click="changeToggle()">{{ openToggle == false ? "🔽" : "🔼" }}</button>
        </div>
        <div @click="onClickListItem(props.id)" class="bg-gray-200 mt-3 px-6 py-3 rounded-2xl" :style="{ display :openToggle ? 'block' : 'none'}">
            <p><strong>email</strong> : {{ props.email}}</p>
            <p><strong>password</strong> : {{ props.password}}</p>
            <p><strong>username</strong> : {{ props.username}}</p>
            <p><strong>createdAt</strong> : {{ props.createdAt}}</p>
        </div>
    </div> -->
</template>