<script setup lang="ts">
import Overlay from '../BaseOverlay.vue';
import { ref } from 'vue'

const isLoading = ref(true);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
async function fetchData() {
    setInterval(() => {
        isLoading.value = false;
    }, 1000)
}
fetchData();
</script>

<template>
    <div id="popular-product-list-item-container" class="w-full border-4 rounded-3xl overflow-hidden">
        <div class="flex-col justify-items-center my-5">
            <div class="font-bold text-3xl">인기 상품 리스트</div>
            <div class="w-full flex justify-around">
                <p>상품 번호</p>
                <p>상품명</p>
                <p>상품 가격</p>
            </div>
            <div class="w-full">
                <div class="w-full flex justify-around">
                    <p>1</p>
                    <p>TEST NAME</p>
                    <p>TEST PRICE</p>
                </div>
                <div class="w-full flex justify-around">
                    <p>2</p>
                    <p>TEST NAME</p>
                    <p>TEST PRICE</p>
                </div>
                <div class="w-full flex justify-around">
                    <p>3</p>
                    <p>TEST NAME</p>
                    <p>TEST PRICE</p>
                </div>
                <div class="w-full flex justify-around">
                    <p>4</p>
                    <p>TEST NAME</p>
                    <p>TEST PRICE</p>
                </div>
            </div>
        </div>
        <Overlay v-if="isLoading" :class="'custom-overlay'">
            <div class="popup">
                 인기 상품 조회 중 ...
            </div>
        </Overlay>
    </div>
</template>

<style scoped>
#popular-product-list-item-container .custom-overlay {
    position: relative;
    transform: translate(0%,-100%);
}
#popular-product-list-item-container .popup {
    position:absolute;
    color: white;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-weight: bold;
    font-size: 20px
}
</style>