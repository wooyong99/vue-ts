<script setup lang="ts">
import { useRouter } from 'vue-router';
import Container from '../../components/BaseContainer.vue';
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth';
import Overlay from '../../components/BaseOverlay.vue';
import { showSuccessAlert } from '../../utils/alertUtil';

type LoginForm = {
    email: string;
    password: string;
}

const inputData = ref<LoginForm>({
    email: '',
    password: '',
})
const isLoading = ref(false);
const auth = useAuthStore();
const router = useRouter();

const asyncLogin = async (isSuccess: Boolean) => {
    isLoading.value = true;

    await delay(1000)

    if( isSuccess ){
        console.log(inputData.value.email)
        console.log(inputData.value.password)
        showSuccessAlert("로그인 성공", "로그인을 성공했습니다.")
        auth.login(1, "token", ["USER"]);
        router.push('/users')
    } else {
        showSuccessAlert("로그인 실패", "로그인을 실패했습니다.")
    }

    isLoading.value = false;
}

// Function to simulate a 1-second delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

</script>
<template>
    <Container id="login-view" class="border-4 rounded-3xl">
        <div class="font-bold text-3xl my-5">로그인</div>
        <div class="my-5">
            <div>
                이메일  <input type="text" v-model="inputData.email" placeholder="이메일을 입력해주세요."/>
            </div>
            <div>
                비밀번호 : <input type="password" v-model="inputData.password" placeholder="비밀번호를 입력해주세요."/>
            </div>
        </div>
        <div class="my-5">
            <button class="border-4 rounded-3xl px-3 py-1" @click="() => asyncLogin(true)">로그인 성공 버튼</button>
            <button class="border-4 rounded-3xl px-3 py-1" @click="() => asyncLogin(false)">로그인 실패 버튼</button>
        </div>
        <Overlay v-if="isLoading">
            <div class="modal">
                로그인 진행 중 ...
            </div>
        </Overlay>
    </Container>
</template>
<style scoped>
#login-view .modal {
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size:30px;
    font-weight:bold;
}
</style>