import axios, { AxiosError, AxiosInstance ,AxiosRequestHeaders, AxiosResponse} from 'axios';
import { ref } from 'vue'
import type { Ref } from 'vue'

// Default Axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
    baseURL: '/',
    timeout:2000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 에러, 데이터 전처리
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error('Request error', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            console.error("응답 에러 : 물리적 오류 - 상태코드 200 아님.", response);
            return Promise.reject(new Error(`물리적 오류 상태코드 40x, 50x : ${response.status}`))
        }
        return response;
    },
    (error) => {
        console.error('Response error', error);
        return Promise.reject(error);
    }
);

type ApiResponse<T> = {
    status: number | string | undefined
    data: T | null;
    error: ErrorResponse | null;
};

type ErrorResponse = {
    code: string | undefined
    message: string
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function useAxios<T>() {
    let status: number | string | undefined ;
    const data: Ref<T | null> = ref(null);
    const error: Ref<ErrorResponse | null> = ref(null);
    
    const $get = async (
        url: string, 
        params: Record<string, any> = {}, 
        headers: Record<string, any> = {}
    ): Promise<ApiResponse<T>> => {
        try{
            const response: AxiosResponse<T> = await instance.get(url, {
                params,
                headers: headers ?? instance.defaults.headers
            });
            status = response.status;
            data.value = response.data;
        } catch (err) {
            if(axios.isAxiosError(err)){
                status = err.status    
                console.error("GET request error : ", err);
                error.value = { code: err.code, message: err.message}
            } else {
                status = 400
                console.error("Unexpected error : ",err);
                error.value = { code: undefined ,message : "Unexpected error"}
            }
        } 
        return { status : status, data: data.value, error: error.value}
    }

    const $post = async (
        url: string,
        payload: any, 
        headers: Record<string, any> = {}
    ): Promise<ApiResponse<T>> => {
        try{
            await delay(1000);
            console.log("POST request success")
            const response: AxiosResponse<T> = await instance.post(url, payload, {
                headers: headers ?? instance.defaults.headers,
            });
            status = response.status
            data.value = response.data;
        } catch (err) {
            if(axios.isAxiosError(err)) {
                status = err.status
                console.error('POST request error : ', err);
                error.value = { code: err.code, message: err.message }
            } else {
                status = 400
                console.error("Unexpected error : ",err);
                error.value = { code: undefined ,message : "Unexpected error"}
            }
            
        } 
        return { status : status, data: data.value, error: error.value}
    }

    const $put = async (
        url: string,
        payload: any,
        headers: Record<string, any> = {}
    ): Promise<ApiResponse<T>> => {
        try{
            const response: AxiosResponse<T> = await instance.put(url, payload, {
                headers: headers ?? instance.defaults.headers
            })
            data.value = response.data;
            status = response.status;
        } catch (err) {
            console.error('PUT request error : ', err);
        }
        return { status : status, data: data.value, error: error.value}
    }

    const $delete = async (
        url: string,
        parmas: Record<string, any> = {},
        headers: Record<string, any> = {}
    ): Promise<ApiResponse<T>> => {
        try {
            const response: AxiosResponse<T> = await instance.delete(url,{
                data: parmas,
                headers: headers ?? instance.defaults.headers
            });
            status = response.status;
            data.value = response.data;
        } catch (err) {
            console.error('DELETE request error : ', err);
        }
        return { status : status, data: data.value, error: error.value}
    }

    return {
        $get,
        $post,
        $put,
        $delete,
        data,
        error
    }
}