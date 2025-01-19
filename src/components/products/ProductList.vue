<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Ref } from 'vue'
import axios from 'axios'
import BaseList from '../BaseList.vue';
import BaseOverlay from '../BaseOverlay.vue';
type Product = {
    id: number,
    name: string,
    description: string,
    stock: number,
    price : number
}

const products: Ref<Product[]> = ref([]); // 반응형 데이터
const isLoading: Ref<Boolean> = ref(true);
const route = useRoute();
const router = useRouter();

async function fetchData():Promise<void> {
    await delay(1000);
    try {
        isLoading.value = true; // 로딩 상태 시작
        const response = await axios.get('../../../dummy/products/list.json');
        products.value = response.data; // 응답 데이터 업데이트
        console.log(products.value)
    } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    } finally {
        isLoading.value = false; // 로딩 상태 종료
    }
}
// Function to simulate a 1-second delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

onMounted(() => {
    fetchData()
})

function openPopup(productId: number) {
    console.log('상품 상세정보 팝업 열림');
    router.push(`/products/${productId}`)
}

function closePopup() {
    router.push(`/products`)
}

</script>

<template>
    <div class="product-list">
        <div 
            v-for="(product,index) in products" 
            :key="index"
        >
            <div class="product-list-item" @click="() => openPopup(product.id)">
                <p>{{ product.id }}</p>
                <p>{{ product.name }}</p>
                <p>{{ product.price }}</p>
                <p>{{ product.stock }}</p>
            </div>
        </div>
        <!-- 팝업 랜더링 -->
         <BaseOverlay v-if="route.name === 'ProductDetail'" @close="closePopup">
            <router-view />
        </BaseOverlay>
    </div>
</template>

<style scoped>
.product-list {
    width: 100%;
}
.product-list-item {
    display: flex;
    width: 100%;
    justify-content: space-around;
}
</style>