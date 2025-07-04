<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

// 팝업 호출 함수
function fnPopup() {
  // 팝업창 열기
  const popupWindow = window.open(
    'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb',
    'popupChk',
    'width=500,height=550,top=100,left=100,fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no,scrollbar=no'
  );

  if (!popupWindow) {
    alert('팝업 차단이 설정되어 있습니다. 팝업을 허용해주세요.');
    return;
  }

  // form 요소 가져오기
  const form = document.getElementById('form_chk') as HTMLFormElement;

  if (form) {
    form.action = 'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb';
    form.target = 'popupChk';
    form.submit();
  } else {
    console.error('form_chk 요소를 찾을 수 없습니다.');
  }
}

// form 데이터
const m = ref('service');
const tokenVersionId = ref('');
const encData = ref('');
const integrityValue = ref('');

function getAccessToken() {
    axios.get("http://localhost:8080/api/nice/encrypted-data?purpose=PASSWORD_RESET")
        .then((res) => {
            console.log(res.data.data.enc_data);
            console.log(res.data.data.integrity_value);
            console.log(res.data.data.token_version_id);
            tokenVersionId.value = res.data.data.token_version_id;
            encData.value = res.data.data.enc_data;
            integrityValue.value = res.data.data.integrity_value;
        })
        .catch((err) => {
            console.log(err);
        })
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

function paymentProcess() {
  if (window.GX_pay) {
    console.log('success')
			window.GX_pay('paymentForm', 'popup', 'https_tpay');
		} else {
      console.log('fail')
			console.error('Payment script is not loaded.');
		}
}
// ref로 랜덤 ID 초기화
const orderId = ref(generateRandomOrderId())
// 랜덤 ORDER_ID 생성 함수
function generateRandomOrderId() {
  return Math.floor(Math.random() * 1_000_000_000_00000).toString()
}
</script>

<template>
  <!-- 본인인증 서비스 팝업을 호출하기 위해 사용하는 form -->
  <form id="form_chk" method="post" class="form-control">
    <input type="hidden" id="m" name="m" :value="m" />
    <input type="hidden" id="token_version_id" name="token_version_id" :value="tokenVersionId" />
    <input type="hidden" id="enc_data" name="enc_data" :value="encData" />
    <input type="hidden" id="integrity_value" name="integrity_value" :value="integrityValue" />
    <input type="hidden ">
    <a href="javascript:void(0);" @click="fnPopup">CheckPlus 안심본인인증 Click</a>
  </form>

    <!-- ✨ M2483583 결제 모듈에서 사용하는 form 추가 -->
    <form 
      id="paymentForm"
      name="paymentForm" 			
      method="post"
      encType="application/x-www-form-urlencoded" class="form-control">
      <input name="SERVICE_ID" value="glx_api">
      <input name="SERVICE_TYPE" value="0000">
      <input name="SERVICE_CODE" value="0900"> 
      <input name="ORDER_ID" :value="2025051327411251"/>
      <input name="ORDER_DATE" value="20250512213703">
      <input name="AMOUNT" value="30000">
      <input name="RETURN_URL" value="https://a425-106-101-11-175.ngrok-free.app/api/payments/callback">
      <input name="ITEM_CODE" value="asdasd">
      <input name="ITEM_NAME" value="컬쳐랜드 PIN 3,000원권">
      <input name="USER_ID" value="aasd">
      <input name="CANCEL_FLAG" value="Y">
  </form>

  <hr/>
  <button @click="getAccessToken()">
    요청하기
  </button>
  <hr/>
  <button @click="paymentProcess()">
    결제하기
  </button>
</template>
