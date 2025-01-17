<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import BaseList from '../BaseList.vue';

type Product = {
    id: number,
    name: string,
    description: string,
    stock: number,
    price : number
}

const products: Ref<Product[]> = ref([]); // 반응형 데이터
const isLoading: Ref<Boolean> = ref(true);

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

</script>

<template>
    <BaseList :datas="products">
    </BaseList>
    <!-- <div 
        class="product-list"
    >
        <div class="product-list-header">
            전체 상품 리스트
        </div>
        <div class="product-list-content">
            <div class="product-list-content-nav">
                <p>번호</p>
                <p>상품명</p>
                <p>재고</p>
                <p>가격</p>
            </div>
            <div
                v-for="(product, index) in products" :key="index"
            >
                <ProductListItem :product="product" />
        </div>
        </div>
    </div> -->
</template>

<style scoped>
.product-list {
    width: 100%;
    border: 5px solid lightgrey;
    border-radius: 30px;
    padding: 20px 0 20px 0;
    min-height:250px;
}

.product-list .product-list-header {
    width: 100%;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    justify-content: center;
}

.product-list .product-list-content-nav {
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    font-size: 1.1rem;
    margin: 5px 0 5px 0;
}
</style>