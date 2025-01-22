<script setup lang="ts">
</script>
<template>
    <div class="base-container">
        <slot />
    </div>
</template>

<style>
.base-container {
    max-width: 80%;
    margin: 20px auto;
    display: flex; 
    flex-direction: column;
    padding: 10px 0 10px 0;
    justify-items: center;
    border: 4px solid lightgray;
    border-radius: 25px;
    align-items: center;
}
</style>