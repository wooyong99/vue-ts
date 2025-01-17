<script setup lang="ts">
import Container from '../../components/BaseContainer.vue';
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
import Overlay from '../../components/BaseOverlay.vue';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertUtil';

type JoinForm = {
    email: string;
    password: string;
    username: string;
    age?: number
}

const inputData: Ref<JoinForm> = ref<JoinForm>({
    email: '',
    password: '',
    username: '',
    age: undefined
})

const router = useRouter();
const isLoading = ref(false);

const asyncJoin = async (isSuccess:Boolean) => {
    isLoading.value = true;
    console.log('Processing input...');
    await delay(1000); // 1-second delay

    if( isSuccess ) {
        console.log(inputData.value.email)
        console.log(inputData.value.password)
        console.log(inputData.value.username)
        showSuccessAlert("회원가입 성공",'회원가입을 성공했습니다.' )
        router.push('/users')
    } else {
        showErrorAlert("회원가입 실패",'회원가입을 실패했습니다.' )
    }
    isLoading.value = false;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

</script>

<template>
    <Container id="join-view" class="border-4 rounded-3xl">
        <div class="font-bold text-3xl my-5">회원가입</div>
        <div class="my-5">
            <div>
                이메일  <input type="text" v-model="inputData.email" placeholder="이메일을 입력해주세요."/>
            </div>
            <div>
                비밀번호 : <input type="password" v-model="inputData.password" placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div>
                사용자 이름 : <input type="text" v-model="inputData.username" placeholder="사용자 이름을 입력해주세요."/>
            </div>
        </div>
        <div class="my-5">
            <button class="border-4 rounded-3xl px-3 py-1" @click="() => asyncJoin(true)">회원가입 성공 버튼</button>
            <button class="border-4 rounded-3xl px-3 py-1" @click="() => asyncJoin(false)">회원가입 성공 실패</button>
        </div>
        <Overlay v-if="isLoading">
            <div class="modal">
                회원가입 진행 중 ...
            </div>
        </Overlay>
    </Container>
</template>
<style scoped>
#join-view .modal {
    position: fixed;
    color: white;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 30px;
}
</style>