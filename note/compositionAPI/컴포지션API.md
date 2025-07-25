# 컴포지션 API란 ?
컴포지션 API는 옵션을 선언하는 대신 `import`한 함수를 사용하여 Vue 컴포넌트를 작성할 수 있는 API 세트입니다.
이것은 아래 API를 다루는 포괄적인 용어입니다.

- 반응형 API : 예를 들어 `ref()`및 `reactive()`를 사용하여 반응형 상태, 계산된 상태 및 감시자를 직접 생성할 수 있습니다.
- 생명주기 훅 : 예를 들어 `onMounted()`및 `onUnmounted()`를 사용하여 컴포넌트 생명주기에 프로그래밍 방식으로 연결할 수 있습니다.
- 의존성 주입 : `provide()`및 `inject()`를 사용하면 반응형 API를 사용하는 동안 Vue의 의존성 주입 시스템을 활용할 수 있습니다.

컴포지션 API는 Vue3 및 Vue2.7에 내장된 기능입니다. 이전 Vue2 버전의 경우 공식적으로 유지관리되는 `@vue/composition-api`플러그인을 사용하십시오.
Vue3에서는 주로 싱글 파일 컴포넌트에서 `<scripte setup>`구문과 함께 사용되기도 합니다. 다음은 컴포지션 API를 사용하는 컴포넌트의 기본 예시입니다. 

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 반응형 상태
const count = ref(0)

// 상태를 변경하고 업데이트를 트리거하는 함수
function increment() {
  count.value++
}

// 생명주기 훅
onMounted(() => {
  console.log(`숫자를 세기 위한 초기값은 ${count.value} 입니다.`)
})
</script>

<template>
  <button @click="increment">숫자 세기: {{ count }}</button>
</template>
```

함수 구성에 기반한 API 스타일에도 불구하고 컴포지션 API는 함수형 프로그래밍이 아닙니다. 컴포지션 API는 Vue의 변경 가능하고 세분화된 반응성 패러다임을 기반으로 하는 반면 함수형 프로그래밍은 불변성을 강조합니다.

Vue를 컴포지션 API와 함께 사용하는 방법을 배우고 싶다면 왼쪽 사이드바 상단의 토글을 사용하여 사이트 전체 API 환경 설정을 컴포지션 API로 설정한 다음 처음부터 가이드를 살펴보세요.

## 왜 컴포지션 API인가요 ?

### 더 나은 로직 재사용성
컴포지션 API의 가장 큰 장점은 컴포저블 함수의 형태로 깔끔하고 효율적인 로직 재사용이 가능하다는 것입니다. 옵션 API의 기본 로직 재사용 메커니즘인 믹스인의 모든 단점을 해결합니다.

컴포지션 API의 로직 재사용 기능은 컴포저블 유틸리의 계속 성장하는 컬렉션인 VueUse와 같은 이상적인 커뮤니티 프로젝트를 탄생시켰습니다. 또한 상태 저장 타사 서비스 또는 라이브러리를 불변 데이터, 상태머신 및 RxJS와 같은 Vue의 반응형 시스템에 쉽게 통합하기 위한 깔끔한 메커니즘 역할을 합니다.

### 보다 유연한 코드 구성
많은 사용자는 기본적으로 옵션 API를 사용하여 조직화된 코드를 작성하는 것을 좋아합니다. 그러나 옵션 API는 단일 컴포넌트의 논리가 특정 복잡성 임계값을 초과하는 경우 심각한 제한을 가집니다. 이 제한은 여러 프로덕션 Vue 2 앱에서 직접 목격한 여러 논리적 문제를 처리해야 하는 컴포넌트에서 특히 두드러집니다.