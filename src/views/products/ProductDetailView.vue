
<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Overlay from '../../components/BaseOverlay.vue';
import axios from 'axios';

type Product = {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number
}

const route = useRoute();
const router = useRouter();
const product: Ref<Product | null> = ref<Product | null>(null);
const productId = ref<number|null>(null);


async function fetchData () {
    console.log(productId);
    await axios.get('../../../../dummy/products/list.json')
        .then((res) => {
            product.value = res.data.find((item: Product) => item.id == productId.value) || null
        })
        .catch((res) => {
        });
}
onMounted(() => {
    productId.value = Number(route.params.id);
    if(productId.value) fetchData();
    
})

function closePopup() {
    router.push('/products')
}
</script>

<template>
    <div class="product-detail">
        <button class="btn-close" @click="closePopup">✕</button>
        <h2>상품 상세정보</h2>
        <p>상품 ID: {{ productId }}</p>
        <p v-if="product">
        <p>이름 : {{ product.name }}</p>
        <p>설명 : {{ product.description }}</p>
        <p>가격 : ${{ product.price }}</p>
        <p>재고 : ${{ product.stock }}</p> 
        </p>
        <p v-else>
        Loading product information...
        </p>
    </div>
</template>
<style scoped>


</style>
  