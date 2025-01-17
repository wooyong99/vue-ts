<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import ProductDetailView from '../../views/products/ProductDetailView.vue';
interface Product {
    id: number,
    name: string,
    description: string,
    stock: number,
    price : number
}

const props = defineProps<{
    product: Product    
}>();

let isPopupVisible: Ref<boolean | boolean> = ref(false)

function openPopup(){
    console.log("팝업이 열립니다.")
    isPopupVisible.value = true;
}

function closePopup() {
    console.log("팝업이 닫힙니다.")
    isPopupVisible.value = false;
}
</script>

<template>
    <div id="product-list-item-detail">
        <div 
            class="flex justify-around"
            @click="openPopup">
            <p>
                {{ product.id }}
            </p>
            <p>
                {{ product.name }}
            </p>
            <p>
                {{ product.stock }}
            </p>
            <p>
                {{ product.price }}
            </p>
        </div>
        <transition name="fade">
            <ProductDetailView
                v-if="isPopupVisible"
                :product-id="product.id"
                @close="closePopup"
            />
        </transition>
    </div>
</template>
<style scoped>
#product-list-item-detail .fade-enter-active, 
#product-list-item-detail .fade-leave-active {
    transition: opacity 1.0s ease;
}
#product-list-item-detail .fade-enter-from,
#product-list-item-detail .fade-leave-to {
    opacity: 0;
}
</style>