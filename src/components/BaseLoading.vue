<script setup lang="ts">
</script>

<template>
    <div class="base-loading">
        <div class="base-loading-content">
            <slot></slot>    
        </div>
    </div>
</template>

<style scoped>
.base-loading {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.base-loading-content {
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    width:80%;
    display: flex;
    justify-content: center;
    color:white;
    font-weight: bold;
    font-size: 40px;
}
</style>