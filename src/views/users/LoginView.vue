<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseContainer from '../../components/BaseContainer.vue';
import { ref, toRaw } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { showErrorAlert, showInfoAlert, showSuccessAlert } from '../../utils/alertUtil';
import { showErrorToast } from '../../utils/toastUtils';
import BaseLoading from '../../components/BaseLoading.vue';
import useAxios from '../../apis/http';
import { LoginResponse } from '../../types/AuthTypes';

type LoginForm = {
    email: string;
    password: string;
}

const inputData = ref<LoginForm>({
    email: '',
    password: '',
})

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);


const isLoading = ref(false);
const auth = useAuthStore();
const router = useRouter();
const { $post } = useAxios<LoginResponse>();

const validateInputs = (): boolean => {
    if(!inputData.value.email.trim()) {
        showErrorToast("아이디를 입력해주세요.")
        emailInputRef.value?.focus();
        return false;
    }
    if(!inputData.value.password.trim()) {
        showErrorToast("비밀번호를 입력해주세요.")
        passwordInputRef.value?.focus();
        return false;
    }
    return true;
}

const fetchLogin = async (isSuccess: Boolean) => {
    if (!validateInputs()) return;

    isLoading.value = true;
    const response = await $post(isSuccess ? 'dummy/users/loginSuccess.json' : 'fail', 
        {
            email:'hello'
        }
    );
    
    if( response.status == 200){
        const data = response.data
        console.log(data?.status)        
        console.log(data?.code)        
        showSuccessAlert("로그인 성공", "로그인을 성공했습니다.")
        auth.login(1, "token", ["USER"]);
        router.push('/users')
    } else {
        console.log(response.error?.code)
        console.log(response.error?.message)
        showErrorAlert("로그인 실패", response.data?.errorMessage)
    }
    isLoading.value = false;
}

</script>
<template>
    <BaseContainer class="login-view">
        <div class="login-view-header">로그인</div>
        <div class="login-view-form">
            <div class="login-view-form-field">
                <label class="login-view-form-label">이메일 : </label>
                <input 
                    ref="emailInputRef"
                    class="login-view-form-input" 
                    type="text" 
                    v-model="inputData.email" 
                    placeholder="이메일을 입력해주세요."
                />
            </div>
            <div class="login-view-form-field">
                <label class="login-view-form-label">비밀번호 : </label>
                <input 
                    ref="passwordInputRef"
                    class="login-view-form-input" 
                    type="password" 
                    v-model="inputData.password"
                    placeholder="비밀번호를 입력해주세요."
                />
            </div>
        </div>
        <div class="login-view-footer">
            <button class="login-view-footer-btn" @click="() => fetchLogin(true)">로그인 성공 버튼</button>
            <button class="login-view-footer-btn" @click="() => fetchLogin(false)">로그인 실패 버튼</button>
        </div>
        <BaseLoading v-if="isLoading">
            <div>
                로그인 진행 중 ...
            </div>
        </BaseLoading>
    </BaseContainer>
</template>
<style scoped>
.login-view {
    display: flex;
    justify-content: center;    
}
.login-view-header {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
}
.login-view-form-field {
    display: flex;
    align-items: center;
    gap: 30px

}
.login-view-form-label {
    font-size: 15px;
}
.login-view-form-input {
    border: 3px solid lightgrey;
    border-radius: 15px;
    padding: 8px 10px;
}
.login-view-footer {
    display: flex;
    gap: 20px;
    margin: 20px 0;
}
.login-view-footer-btn {
    border: 4px solid lightgray;
    border-radius: 25px;
    padding: 10px 15px;
}
</style>