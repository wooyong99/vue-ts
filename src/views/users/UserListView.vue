<script setup lang="ts">
import BaseContainer from '../../components/BaseContainer.vue';
import UserList from '../../components/users/UserList.vue'

</script>

<template>
    <BaseContainer>
        <div class="w-full flex-col justify-items-center my-5">
            <div class="text-4xl font-bold my-5">사용자 리스트</div>
            <div class="flex justify-around w-full my-2">
                <p>번호</p>
                <p>이메일</p>
                <p>이름</p>
                <p>나이</p>
            </div>
            <UserList />
        </div>
    </BaseContainer>
</template>

<style scoped>
</style>