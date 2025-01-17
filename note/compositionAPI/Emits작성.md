# 컴포넌트 Emits 작성

```<script setup>``` 에서 런타임 선언 또는 타입 선언을 사용하여 ```emit```함수를 입력할 수 있습니다.

```typescript
<script setup lang="ts">
// runtime
// 런타임
const emit = defineEmits(['change', 'update'])

// type-based
// 타입 기반
const emit = defineEmits<{
    (e : 'change', id: number): void
    (e : 'update', value: string): void
}>()
</script>
```

타입 전달인자는 호출 서명이 있는 타입 리터럴이어야합니다. 타입리터럴은 반환된 ```emit```함수의 타입으로 사용됩니다.
보시다시피, 타입선언은 emit된 이벤트의 타입 제약 조건에 대해 훨씬 상세한 제어를 제공합니다.

```<script setup>```을 사용하지 않을 때, ```defineComponenet()```는 설정 컨텍스트에 노출된 ```emit```함수에 대해 허용된 이벤트를 추론할 수 있습니다.

```typescript
import { defineComponent } from 'vue'

export default defineComponent({
    emits : ['change'],
    setup(props, { emit }) {
        emit('change')  // <-- type check / auto-completion
    }
})
```