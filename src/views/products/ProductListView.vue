<script setup lang="ts">
import BaseContainer from '../../components/BaseContainer.vue';
import ProductList from '../../components/products/ProductList.vue';
</script>

<template>
    <BaseContainer>
        <div class="product-list-view">
            <div class="product-list-view-header">전체 상품 리스트</div>
            <div class="product-list-view-body">
                <div class="product-list-view-nav">
                    <p>상품번호</p>
                    <p>상품명</p>
                    <p>가격</p>
                    <p>재고</p>
                </div>
                <ProductList />
            </div>
        </div>
    </BaseContainer>
</template>
<style scoped>
.product-list-view {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.product-list-view-header {
    font-weight: bold;
    font-size: 25px;
}
.product-list-view-body {
    width: 100%;
    margin: 10px 0 10px 0;
}
.product-list-view-nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>