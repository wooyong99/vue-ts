<script setup lang="ts">
import Container from '../components/common/Container.vue';
import axios from 'axios'
import { ref } from 'vue'

const formData = new FormData();
let profileImage = ref<File|null>(null)

// formData.append('request', JSON.stringify({nickname:'hello', bio:'bio'}))
formData.append('nickname','11test')
formData.append('bio','good')

// 파일 변경 이벤트 핸들러
function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        profileImage.value = target.files[0]; // 선택된 파일 저장
    }
}

function fetchData() {
    if (profileImage.value) {
        formData.append("profileImage", profileImage.value); // 선택된 파일 추가
    }
    axios.post('http://localhost:8080/mypage/profile', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsImlhdCI6MTczNjgzMTYxNSwiZXhwIjoxMDAxNzM2ODMxNjE1fQ.s4aIleuwZavZoU678H8dgXkBGm5Zncf1y-C49FEr3qU'
            }
        }
    ).then((res) => {
        console.log(res.status)
    }).then((err) => 
        console.error(err)
    )
}


</script>

<template>
    <Container>
        <div>파일 <input type="file" @change="handleFileChange" /></div>
        <button @click="fetchData">전송</button>
    </Container>
</template>