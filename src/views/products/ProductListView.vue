<script setup lang="ts">
import BaseContainer from '../../components/BaseContainer.vue';
import ProductList from '../../components/products/ProductList.vue';
</script>

<template>
    <div class="product-list-view">
        <div class="product-list-view-main-con">
            <div class="product-list-view-main-header">전체 상품 리스트</div>
            <div class="product-list-view-main-body">
                <div class="product-list-view-main-nav">
                    <p>상품번호</p>
                    <p>상품명</p>
                    <p>가격</p>
                    <p>재고</p>
                </div>
                <ProductList />
            </div>
        </div>
        <div class="product-list-view-sub">
                <div class="product-list-view-sub-con">
                    <div class="product-list-view-sub-header">최근 상품 리스트</div>
                    <div class="product-list-view-sub-body">
                        <div class="product-list-view-sub-nav">
                            <p>상품번호</p>
                            <p>상품명</p>
                            <p>가격</p>
                            <p>재고</p>
                        </div>
                        <ProductList />
                    </div>
                </div>
                <div class="product-list-view-sub-con">
                    <div class="product-list-view-sub-header">인기 상품 리스트</div>
                    <div class="product-list-view-sub-body">
                        <div class="product-list-view-sub-nav">
                            <p>상품번호</p>
                            <p>상품명</p>
                            <p>가격</p>
                            <p>재고</p>
                        </div>
                        <ProductList />
                    </div>
                </div>
            </div>
    </div>
</template>
<style scoped>
.product-list-view {
    margin: 0 auto;
    width: 80%;
    padding: 10px 10px; 
}
.product-list-view-main-con {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    border: 5px solid lightgray;
    border-radius: 25px;
}
.product-list-view-main-header {
    font-weight: bold;
    font-size: 25px;
}
.product-list-view-main-body {
    width: 100%;
    margin: 10px 0 10px 0;
}
.product-list-view-main-nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.product-list-view-sub {
    display: flex;
    gap: 30px;
    margin: 10px 0;

}
.product-list-view-sub-con {
    display: flex-col;
    flex-direction: column;
    justify-items: center;
    gap:20px;
    border: 5px solid lightgray;
    border-radius: 25px;
    width: 100%
}
.product-list-view-sub-header {
    font-size: 25px;
    font-weight: bold;
}
.product-list-view-sub-body {
    width: 100%;
}
.product-list-view-sub-nav {
    display: flex;
    width: 100%;
    justify-content: space-around;
}
</style>