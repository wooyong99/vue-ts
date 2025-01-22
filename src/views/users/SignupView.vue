<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertUtil';
import BaseLoading from '../../components/BaseLoading.vue';
import { SignupRequest, SignupResponse } from '../../types/AuthTypes';
import useAxios from '../../apis/http';
import BaseContainer from '../../components/BaseContainer.vue';
import { showErrorToast } from '../../utils/toastUtils';

const inputData = ref<SignupRequest>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
})

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const passwordConfirmInputRef = ref<HTMLInputElement | null>(null);
const nameInputRef = ref<HTMLInputElement | null>(null);

const router = useRouter();
const isLoading = ref(false);
const { $post } = useAxios<SignupResponse>();


const validateInputs = (): boolean => {
    if(!inputData.value.email.trim()) {
        showErrorToast('이메일은 필수 입력 값입니다.')
        emailInputRef.value?.focus()
        return false;
    }
    if(!inputData.value.password.trim()) {
        showErrorToast('비밀번호는 필수 입력 값입니다.')
        passwordInputRef.value?.focus()
        return false;
    }
    if(!inputData.value.confirmPassword.trim()) {
        showErrorToast('비밀번호 확인은 필수 입력 값입니다.')
        passwordConfirmInputRef.value?.focus()
        return false;
    }
    if(!inputData.value.name.trim()) {
        showErrorToast('이름은 필수 입력 값입니다.')
        nameInputRef.value?.focus()
        return false;
    }
    return true;
}

const fetchSignup = async (isSuccess:Boolean) => {
    if(!validateInputs()) return ;

    isLoading.value = true;
    const response = await $post(isSuccess ? '/dummy/users/signupSuccess.json' : 'fail', 
        {
            email : "test",
            password : "test"
        }
    )
    if ( response.status == 200){
        console.log(response.data?.status)
        showSuccessAlert('회원가입 성공','회원가입을 성공했습니다.')
    }
    else {
        showErrorAlert('회원가입 실패','회원가입을 실패했습니다.')
        // router.push('/')
    }
    isLoading.value = false;
}
</script>

<template>
    <BaseContainer class="join-view">
        <div class="join-view-header">회원가입</div>
        <div class="join-view-form">
            <div class="join-view-form-field">
                <label class="join-view-form-label">이메일 : </label>
                <input 
                    ref="emailInputRef"
                    class="join-view-form-input" 
                    type="text"
                    v-model="inputData.email" 
                    placeholder="이메일을 입력해주세요."
                />
            </div>
            <div class="join-view-form-field">
                <label class="join-view-form-label">비밀번호 : </label>
                <input 
                    ref="passwordInputRef"
                    class="join-view-form-input" 
                    type="password" 
                    v-model="inputData.password" 
                    placeholder="비밀번호를 입력해주세요."
                />
            </div>
            <div class="join-view-form-field">
                <label class="join-view-form-label">비밀번호 확인 : </label>
                <input 
                    ref="passwordConfirmInputRef"
                    class="join-view-form-input" 
                    type="password" 
                    v-model="inputData.confirmPassword" 
                    placeholder="비밀번호를 다시 입력해주세요."
                />
            </div>
            <div class="join-view-form-field">
                <label class="join-view-form-label">사용자 이름 : </label>
                <input 
                    ref="nameInputRef"
                    class="join-view-form-input" 
                    type="text" 
                    v-model="inputData.name" 
                    placeholder="사용자 이름을 입력해주세요."
                />
            </div>
        </div>
        <div class="join-view-footer">
            <button class="join-view-footer-btn" @click="() => fetchSignup(true)">회원가입 성공 버튼</button>
            <button class="join-view-footer-btn" @click="() => fetchSignup(false)">회원가입 성공 실패</button>
        </div>
        <BaseLoading v-if="isLoading">
            <div>
                회원가입 진행 중 ...
            </div>
        </BaseLoading>
    </BaseContainer>
</template>
<style scoped>
.join-view-header {
    font-weight: bold;
    font-size: 30px;
    margin: 20px 0;
}
.join-view-form-field {
    display: flex;
    align-items: center;
    gap: 40px;
}
.join-view-form-input {
    border: 3px solid lightgray;
    border-radius: 15px;
    padding: 8px 10px;
    gap: 30px;
}
.join-view .modal {
    position: fixed;
    color: white;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 30px;
}
.join-view-footer {
    display: flex;
    gap : 30px;
    margin : 20px 0;
}
.join-view-footer-btn {
    border: 4px solid lightgray;
    border-radius: 25px;
    padding: 10px 15px;
}
</style>