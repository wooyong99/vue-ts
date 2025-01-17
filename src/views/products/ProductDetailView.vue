
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
import Overlay from '../../components/BaseOverlay.vue';
import axios from 'axios';

type Product = {
id: number;
name: string;
description: string;
stock: number;
price: number

}
// 가상 데이터
const product: Ref<Product | null> = ref<Product | null>(null);
const props = defineProps<{
    productId: number
}>();
const emit = defineEmits<{
    (e: 'close', value: void): void
}>();

const router = useRouter();

function closePopup() {
    router.push('/products')
}

async function fetchData () {
    await axios.get('../../../../dummy/products/list.json')
        .then((res) => {
            product.value = res.data.find((item: Product) => item.id == Number(props.productId)) || null
        })
}
fetchData()
</script>

<template>
    <div id="product-detail">
        <Overlay @click="emit('close')">
            <div class="popup">
                <button class="btn-close" @click="emit('close')">✕</button>
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
        </Overlay>
    </div>

</template>
<style scoped>

#product-detail .popup{
  position: fixed;
  width: 80%;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 닫기 버튼 */
#product-detail .popup .btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
  