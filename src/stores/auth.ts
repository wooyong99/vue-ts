import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const userId = ref<number | undefined>(undefined);
    const accessToken = ref<string | undefined>(undefined);
    const roles = ref<string[]>([]);

    const isLogin = computed(() => userId.value !== undefined)
    const isAdmin = computed(() => roles.value.includes('ADMIN'))

    function setUserId(newUserId: number){
        userId.value = newUserId;
    }

    function setAccessToken(newAccessToken: string){
        accessToken.value = newAccessToken;
    }

    function login(newUserId:number, newAccessToken:string, roleArr:string[]){
        setUserId(newUserId);
        setAccessToken(newAccessToken);
        roleArr.forEach(role => {
            roles.value.push(role)
        })
    }

    function logout(){
        userId.value = undefined;
        accessToken.value = undefined;
        roles.value = [];
    }

    return {userId, accessToken, isLogin, setUserId, setAccessToken, login, logout, isAdmin}
}, {persist: true})