<script setup lang="ts">
import { ref } from 'vue';
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
    axios.get("http://localhost:8080/api/nice/request")
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

  <hr/>
  <button @click="getAccessToken()">
    요청하기
  </button>
</template>
