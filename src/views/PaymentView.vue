<script setup lang="ts">
import axios from 'axios';
import { nextTick, onMounted, ref } from 'vue';

const orderRequestBody = {
  paymentMethod: "PHONE",
  orderItems: [
    { voucherId: 35, price: "3000", quantity: 1 }
  ]
}

// 결제 form에 쓸 변수들
const serviceId = ref('');
const serviceCode = ref('');
const orderNo = ref('');
const orderDate = ref('');
const price = ref('');
const productName = ref('');
const ordererName = ref('');

function createOrderAndBindForm() {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQ1MTM5NzUzLCJleHAiOjIwNjUxMzk3NTQsInVzZXJJZCI6MSwiZW1haWwiOiJ3dWxvdmVza0BuYXZlci5jb20iLCJuYW1lIjoiYWFzZCIsInBob25lIjoiMDEwLTExMTEtMTExMSIsInJvbGVzIjpbIlVTRVIiXX0.z5y-3rW8vg5NxJDHpTYGYbcRLBwEhGhtvWheAnDv0sM"
  axios.post("https://f901-106-101-130-210.ngrok-free.app/api/orders", orderRequestBody, {headers: { Authorization: `Bearer ${token}`}})
    .then((res) => {
      const data = res.data.data;
      serviceId.value = data.serviceId ;
      console.log("serviceCode", data.serviceCode);
      serviceCode.value = data.serviceCode;
      orderNo.value = data.orderNo;
      orderDate.value = data.orderDate;
      price.value = data.price;
      productName.value = data.productName;
      ordererName.value = data.ordererName;
      console.log("주문 생성 성공:", data);

      // nextTick을 이용해 DOM 반영 이후 실행
      nextTick(() => {
        if (window.GX_pay) {
          window.GX_pay('paymentForm', 'popup', 'https_tpay');
        } else {
          console.error("❌ GX_pay 함수가 로드되지 않았습니다.");
        }
      });
    })
    .catch((err) => {
      console.error("주문 생성 실패", err);
    });
}
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://pay.billgate.net/paygate/plugin/gx_web_client.js';
  script.type = 'text/javascript'
  script.charset = 'EUC-KR'
  script.async = true;

  script.onload = () => {
    console.log('Payment script loaded successfully.')
  }
  script.onerror = () => {
    console.error('Failed to load the payment script.')
  }
  document.head.appendChild(script)

  return () => {
    document.head.removeChild(script);
  }
})
</script>
<template>
  <form 
    id="paymentForm"
    name="paymentForm" 			
    method="post"
    encType="application/x-www-form-urlencoded"
    class="form-control"
  >
    <input name="SERVICE_ID" v-model="serviceId" />
    <input name="SERVICE_TYPE" value="0000" />
    <input name="SERVICE_CODE" v-model="serviceCode" />
    <input name="ORDER_ID" v-model="orderNo" />
    <input name="ORDER_DATE" v-model="orderDate" />
    <input name="AMOUNT" v-model="price" />
    <input name="RETURN_URL" value="https://f901-106-101-130-210.ngrok-free.app/api/payments/callback" />
    <input name="ITEM_CODE" value="asdasd" />
    <input name="ITEM_NAME" v-model="productName" />
    <input name="USER_ID" v-model="ordererName" />
    <input name="CANCEL_FLAG" value="Y" />
    <input name="MOBILE_COMPANY_CODE" value="0002" />
    <input name="GET_PARAMS" value="HP" />
    <input name="MOBILE_NUMBER" value="01020517426" />
    <input name="READONLY_HP" value="Y" />
  </form>
  <button @click="createOrderAndBindForm()">주문 생성 & 결제 폼 채우기</button>
</template>
<style></style>