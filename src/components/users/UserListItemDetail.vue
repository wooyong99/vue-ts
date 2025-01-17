<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import UserDetailView from '../../views/users/UserDetailView.vue';
import BaseOverlay from '../BaseOverlay.vue';

interface User {
    id: number,
    email: string,
    username: string,
    password: string,
    createdAt : string,
    age?: number
}

const props = defineProps<{
    user: User    
}>();
const router = useRouter();
const route = useRoute();
const isPopupVisible = ref(false)

function openPopup() {
    console.log("팝업창 열림")
    isPopupVisible.value = true
}
function closePopup(){
    console.log("팝업창 닫힘")
    isPopupVisible.value = false
}


</script>

<template>
    <div id='user-list-item-detail'>
        <div class="flex justify-around"">
            <p>
                {{ user.id }}
            </p>
            <p>
                {{ user.email }}
            </p>
            <p>
                {{ user.username }}
            </p>
            <p>
                {{ user.age != undefined ?  user.age : "-"}}
            </p>
        </div>
        <!-- <BaseOverlay v-if="route.name === 'UserDetail'">
            <router-view />
        </BaseOverlay> -->
        <!-- <transition v-if="isPopupVisible" name="fade">
            <UserDetailView
                
                :user-id="user.id"
                @close="closePopup"
            />
        </transition> -->
    </div>
</template>
<style scoped>
#user-list-item-detail .fade-enter-active,
#user-list-item-detail .fade-leave-active {
    transition: opacity 1.0s ease;
}
#user-list-item-detail .fade-enter-from,
#user-list-item-detail .fade-leave-to {
    opacity: 0;
}
</style>