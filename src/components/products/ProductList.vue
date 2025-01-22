<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Ref } from 'vue'
import useAxios from '../../apis/http'
import BaseOverlay from '../BaseOverlay.vue';
import { ProductListResponse } from '../../types/ProductTypes';

const products: Ref<ProductListResponse[] | null> = ref([]); // 반응형 데이터
const isLoading: Ref<Boolean> = ref(true);
const route = useRoute();
const router = useRouter();
const { $get } = useAxios<ProductListResponse[]>();

async function fetchData() {
    const response = await $get('dummy/products/list.json');
    if ( response.status == 200 ) {
        products.value = response.data
    } else {
        console.log("Error : ", response.error);
    }
}

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
.product-list-con {
    min-height: 30px;
}
.product-list-item {
    display: flex;
    width: 100%;
    justify-content: space-around;
}
</style>