<script setup lang="ts">
import { onMounted } from 'vue';
import BaseListItem from './BaseListItem.vue';

const props = defineProps<{
    datas: Record<string, any>[];
}>();

onMounted(() => 
    console.log(props.datas)
)
</script>

<template>
    <ul v-if="datas.length > 0">
        <slot 
            v-for="(data, index) in datas" 
            :data="data"
            :key="index"
        >
            <BaseListItem
                v-for="(data, index) in datas" 
                :key="index"
            />
        </slot>
    </ul>
    <p v-else>데이터가 없습니다.</p>
</template>

<style>

</style>
