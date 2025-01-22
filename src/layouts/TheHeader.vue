<script setup lang="ts">
import Container from '../components/BaseContainer.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { watch, computed } from 'vue';
import { showSuccessAlert } from '../utils/alertUtil';
import { useDarkMode } from '../composables/darkMode';

const router = useRouter();
const auth = useAuthStore();

const { isDarkMode, toggleDarkMode } = useDarkMode();

const isLogin = computed(() => auth.isLogin);

function navigateLoginView(){
    router.push('/login')
}
function navigateJoinView(){
    router.push('/join')
}
function logout() {
    auth.logout();
    showSuccessAlert("로그아웃 성공", "로그아웃에 성공했습니다.")
}

</script>
<template>
    
    <Container>
        <div @click="(toggleDarkMode)">다크모드</div>
        <div v-if="isLogin" class="w-full flex justify-end gap-5 px-10 my-3">
            <button @click="logout" class="border-4 rounded-full px-4 py-2">
                로그아웃
            </button>
        </div>
        <div v-else class="w-full flex justify-end gap-5 px-10 my-3">
            <button @click="navigateLoginView" class="border-4 rounded-full px-4">
                로그인
            </button>
            <button @click="navigateJoinView" class="border-4 rounded-full px-4">
                회원가입
            </button>
        </div>
    </Container>
</template>