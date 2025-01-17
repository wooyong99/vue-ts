# Composition API와 타입 스크립트

## 컴포넌트 Props 작성

```<script setup>``` 사용
```<script setup>```을 사용할 때 ```defineProps()```는 전달인자를 기반으로 ```props```타입 추론을 진행한다.

```typescript
<script setup lang="ts">
const props = defineProps({
    foo : { type : String, required : true },
    bar:  Number
})

props.foo // string
props.bar // number | undefined
</script>
```

```defineProps()```에 전달된 인자가 런타임 ```props```옵션으로 사용되기 때문에 이것을 "런타임 선언 ( runtime declaration )"이라고 합니다.

그러나 일반적으로 제너릭 타입 전달 인자를 통해 순수 타입으로 props를 정의하는 것이 더 간단합니다.

```typescript
<script setup lang="ts">
const props = defineProps<{
    foo : string,
    bar ?: number
}>();
</script>
```

이것을 "타입 기반 선언 (type-based declaration)"이라고 합니다. 컴파일러는 타입 전달인자를 기반으로 같은 런타입 옵션을 추론하도록 시도합니다. 이 경우 두 번째 예제는 첫 번째 예제와 정확히 동일한 런타임 옵션으로 컴파일 됩니다.

타입 기반 선언 또는 런타임 선언 중 하나를 사용할 수 있지만 동시에 둘 다 사용할 수 는 없습니다.

props 타입을 별도의 인터페이스로 지정할 수도 있습니다.

### 문법 제한
올바른 런타임 코드를 생성하려면 ```defineProps()```의 제너릭 전달인자가 다음 중 하나여야 합니다.

- 객체 리터럴 타입
```typescript
defineProps<{ /*...*/}>()
```

- 동일한 파일에 있는 인터페이스 또는 객체 리터럴 타입에 대한 참조 
```typescript
interface Props{/*...*/}
defineProps<Props>()
```

인터페이스 또는 객체 리터럴 타입은 다른 파일에서 가져온 타입을 참조 할 수 있지만, ```defineProps```의 제네릭 전달 인자는 가져온 타입을 사용할 수 없습니다.

```typescript
import { Props } from './other-file'

// 지원하지 않는다.
defineProps<Props>();
```
이는 Vue 컴포넌트가 격리되어  컴파일되고 컴파일러가 현재 소스 유형을 분석하기 위해 가져온 파일을 크롤링하지 않기 때문입니다. 이 제한은 향후 업데이트에서 제거될 수있다.

> 

```markdown
다시 정리해보자. 
Composition API 에서는 defineProps()를 통해서 상위 컴포넌트로부터 전달인자를 받고 props 타입 추론을 진행한다. 
그리고 defineProps()를 통해 전달 받는 인자는 런타임에 사용되기 때문에 이것을 "런타임 선언"이라고 부른다.
근데 일반적으로 전달 인자의 타입을 추론할 때 제네릭 타입 전달 인자를 통해 순수 타입으로 props를 정의하는 것이 더 간단하다고 한다.그리고 이것을 "타입 기반 선언" 이라고 부른다.

여기서 헷갈렸던 부분이 런타임 props 옵션이다. 
props는 부모 컴포넌트로부터 전달받은 인자(데이터)를 나타내며 자식 컴포넌트에서 전달받은 인자(props)를 사용하기 위해 객체를 생성한다. 즉, 자식 컴포넌트에서 props 정보를 읽기 전용 객체로 감싸고 사용한다는 말이다.

그리고 런타임 props 옵션이 의미하는 것은
- 유효성 검사 : 전달된 props가 지정된 타입이나 요구 조건을 충족하는지 확인
- 기본값 설정 : props의 기본 값 정의
- 반응성 활성화 : props를 반응형 데이터로 사용할 수 있게 한다.

따라서 defineProps에 전달된 인자, 객체는 런타임에 Vue가 컴포넌트의 props를 유효성을 검사하고 기본 값을 설정하는 데 사용된다. 다시 말해 위 3가지 옵션들이 컴포넌트가 실행되는 런타임에 실제로 작동하기 때문에 런타임 props 옵션이라고 부르는 것이다.

그러므로 TypeScript를 사용하는 경우 defineProps는 전달된 객체를 기반으로 props의 타입을 추론할 수 있는 것이다. 


다시 정리하면 defineProps()를 통해 선언된 내용은 컴포넌트가 실행되는 Vue 런타임에서 prosp를 처리하는 옵션으로 동작하고, TypeScript를 사용할 경우 타입 추론 기능을 이용할 수 있는 것이다.
그리고 런타임 props 옵션은 컴포넌트가 실행 중에 props를 처리한다라는 의미이다.

최종 요약 
1. 부모 컴포넌트에서 전달된 데이터는 props로 자식 컴포넌트에 전달된다.
2. 자식 컴포넌트에서는 defineProps를 사용해 이 데이터를 읽기 전용 객체로 선언하고 사용할 수 있다.
3. Vue는 기본적으로 props의 타입을 추론해주지만, Typescript를 사용하면 더 명확하고 안전한 타입 추론을 제공한다.
4. Props는 읽기 전용이고, 수정하기 위해서는 로컬 상태로 복사해서 사용하면된다.
```

### Props 기본 값
타입 기반 선언을 사용하면 프로퍼티의 기본값을 선언할 수 없다. 이 문제는 컴파일러 매크로 ```withDefaults```로 해겷라 수 있다.

```typescript
export interface Props {
    msg ?: string
    labels ?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    msg:'hello',
    labels: () => ["one", "two"]
})
```

이는 동등한 런타임 프로퍼티 ```default``` 옵션으로 컴파일 됩니다. 또한 ```withDefaults``` 헬퍼는 기본 값에 대한 유형 검사를 제공하고, 기본 값이 선언된 프로퍼티에 대해 반환된 ```props``` 유형에 선택적 플래그가 제거되었는지 확인합니다.

또는 현재 실험 중인 반응성 변환을 사용할 수도 있습니다.
```typescript
<script setup lang="ts">
interface Props {
    name: string
    count?: number
}

// reactive destructure for defineProps()
// defualt value is compiled to equivalent runtion option
// defineProps()를 위해 반응성을 제거한다.
// 기본 값은 런타임 옵션과 동일하게 컴파일 된다.
const {name, count = 100} = defineProps<Props>()
</script>
```

이 동작은 현재 explicit opt-in이 필요합니다.ㄴ