<script setup lang="ts">
import Container from '../../components/BaseContainer.vue';
import PopularProductList from '../../components/products/PopularProductList.vue';
import ProductList from '../../components/products/ProductList.vue';
import RecentProductList from '../../components/products/RecentProductList.vue';
</script>

<template>
    <Container>
        <ProductList />
        <div class="w-full flex justify-between my-10 gap-10">
            <PopularProductList />
            <RecentProductList />
        </div>
    </Container>
</template>
<style scoped>
</style>