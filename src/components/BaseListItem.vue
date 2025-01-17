<script setup lang="ts">
const props = defineProps<{
    data: Record<string,any>;
    selected: boolean;
}>();

const emit = defineEmits<{
    (e: 'handleClick', value:void): void
}>();

function handleClick() {
    emit('handleClick');
}
</script>

<template>
    <li class="base-list-item"
        :class="{'base-list-item-selected' : selected}"
        @click="handleClick"
    >
        <slot :data="data">
            {{ data }}
        </slot>

    </li>
</template>

<style>
.base-list-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}

.base-list-item:hover {
    background-color: #f9f9f9;
}

.base-list-item-selected {
    background-color: #d1e7dd;
    font-weight: bold;
}
</style>
