<script setup lang="ts">
import ProductListItemDetail from './ProductListItemDetail.vue';

type Product = {
    id: number,
    name: string,
    description: string,
    stock: number,
    price : number
}

const props = defineProps<{
    product: Product
}>();

</script>

<template>
    <div class="product-list-item">
        <div 
            class="product-list-item-content"
            >
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
        <!-- <transition name="fade">
            <ProductDetailView
                v-if="isPopupVisible"
                :product-id="product.id"
                @close="closePopup"
            />
        </transition> -->
    </div>
</template>
<style lang="css" scoped>
.product-list-item .product-list-item-content{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>