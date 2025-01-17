# Vu3 스타일 가이드

## 우선 순위 규칙 : 필수
### 멀티 워드 컴포넌트 이름 사용
사용자 컴포넌트 이름은 항상 멀티 워드여야하며, 루트 `App`컴포넌트를 제외합니다.
이는 모든 HTML요소가 단어 하나로 구성되어 있으므로, 기존 및 미래의 HTML 요소와의 충돌을 방지합니다.

- 잘못 예시
```vue
<!-- 사전 컴파일된 템플릿 -->
<Item />
<!-- in-Dom 템플릿 -->
<item></item>
```

- 좋은 예시
```vue
<TodoItem />
<todo-item></todo-item>
```

### 상세한 prop 정의 사용
커밋된 코드에서는 prop 정의가 가능한 상세해야하며, 최소한 타입을 명시해야합니다.

- 잘못 예시
```vue
// 이것은 프로토타이핑할 때만 괜찮음
const props = defineProps(['status'])
```

- 좋은 예시
```vue
const props = defineProps({
    status: string
})
```
```vue
const props = defineProps({
    status: {
        type: string,
        required: true,

        validator: (value) => {
            return ['syncing', 'synced', 'version-conflict'].includes(value)
        }
    }
})
```

### `v-for`에 `key`사용하기
컴포넌트 내에서 하위 트리의 내부 컴포넌트 상태를 유지하기 위해, `v-for`와 함께 `key`는 항상 필요합니다.
심지어 요소에 대해서도, 객체의 일관성과 같은 예측 가능한 동작을 유지하는 것이 좋은 관행입니다.

- 잘못된 예시
```html
<ul>
    <li v-for="todo in todos">
        {{ todo.text }}
    </li>
</ul>
```

- 좋은 예시
```html
<ul>
    <li v-for="(todo, inex) in todos" :key="index">
        {{ todo.text }}
    </li>
</ul>
```

### `v-if`와 `v-for`를 함께 사용하지 않기
`v-for`가 있는 같은 요소에 `v-if`를 사용하지 마세요.

- 잘못된 예시
```html
<ul>
    <li 
        v-for="user in users"
        v-if="user.isActive"
        :key="user.id"
    >
        {{ user.name }}
    </li>
</ul>
```

- 좋은 예시
```html
<script setup>
    const activeUsers = computed(() => {
        return users.fileter((user) => user.isActive)
    })
</script>
<template>
    <ul>
        <li
            v-for="user in activeUsers"
            :key="user.id"
        >
            {{ user.name }}
        </li>
    </ul>
</template>
```
### 컴포넌트 범위 스타일 사용하기
애플리케이션에서는 최상위 `App`컴포넌트와 레이아웃 컴포넌트의 스타일이 전역적일 수 있지만, 다른 모든 컴포넌트는 항상 범위가 지정되어야합니다.

이것은 SFC에만 관련이 있습니다. 이것은 `scoped`속성을 사용해야한단느 것을 의미하지 않습니다.
범위 지정은 CSS 모듈 BEM과 같은 클래스 기반 전략 또는 다른 라이브러리/관례를 통해 이루어질 수 있습니다.

하지만, 컴포넌트 라이브러리는 `scoped`속성을 사용하기보다는 클래스 기반 전략을 선호해야합니다.

이것은 내부 스타일을 오버라이딩하기 쉽게하며, 너무 높은 특이성을 가지지 않으면서도 충돌 가능성이 매우 낮은 사람이 읽을 수 있는 클래스 이름을 제공합니다.

- 잘못된 예시
```typescript
<template>
    <button class='btn btn-close'>X</button>
</template>

<style>
.btn-close {
    basckgorund-color: red;
}
</style>
```

- 좋은 예시1
```typescript
<template>
    <button class='button button-close'>X</button>
</template>
// scoped 속성 사용
<style scoped>
.button {
    border: none;
    border-radius: 2px;
}
.button-close {
    background-color: red;
}
</style>
```

- 좋은 예시2
```typescript
<template>
    <buuton class='[$style.button, $style.buttonclose]'>X</button>
</template>
// CSS 모듈 사용
<style module>
.button {
    boder: none;
    border-radius: 2px;
}
.buttonCose {
    background-color:red;
}
```

- 좋은 예시3
```typescript
<template>
    <button class='c-Button c-Button--close'>X</button>
</template>
<style>
.c-Button {
    border: none;
    border-radius: 2px;
}
.c-Button--close {
    background-clor:red;
}
<style>
```