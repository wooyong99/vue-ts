# 결론
추후에 작성 내용을 다시 읽을 때 내용을 쉽게 파악하기 위해 결론을 맨 위에 적어본다.

프로젝트 진행시 UI의 일관성을 유지하기 위해 CSS를 격리하기 위해서는 아래와 같다.

1. 모든 컴포넌트에서 사용될 공용 스타일은 독립적으로 분리하여 한 곳에서 관리한다.

2. 컴포넌트 별 스타일도 독립적으로 관리한다.
    - 컴포넌트 내부 `<style>`태그 사용시 반드시 `scoped`속성을 사용한다.<br>
    왜냐하면 `scoped`속성이 없으면 모든 컴포넌트에서 공유되는 스타일이 되기 때문이다.
    - `scoped` 속성과 외부 파일 분리는 팀 컨벤션에 준수하지만, 이 둘은 혼용하는 것은 좋지 않을 것 같다고 생각된다. 왜냐하면 스타일 코드가 분산되어있어 유지보수에 취약하다고 생각하기 때문이다.<br>
    추가적으로 `scoped`속성을 사용하면 컴포넌트 내에서 스타일을 한번에 관리하여 유지보수  측면이 쉬울 수 있고, 외부 파일로 분리하면 코드의 가독성이 올라간다는 서로 다른 특징이 존재한다.<br>
    내가 생각했을 때는 컴포넌트 내부에 코드를 응집해두는 것이 더 효율적이라고 생각된다.

3. 일관되고 규칙적인 CSS 네이밍을 사용한다.
    - `scoped`속성이 완전하게 스타일을 분리시켜주지 못하기 때문이다.
    - 자료조사를 하면서 알게 된 네이밍 규칙이 `BEM`이다.
    - 따라서, 컴포넌트를 기반으로 클래스명을 정의하기 때문에 컴포넌트 네이밍도 굉장히 중요하다고 생각한다.<br>
    다음에는 컴포넌트 네이밍에 대해서도 알아보자.
    

# CSS 격리에 대한 생각
CSS 격리라는 것은 공통적으로 사용되는 CSS를 설정하고 분리하고 각 컴포넌트에서는 독립적으로 사용하는 CSS를 한 곳에 설정하여 관리하는 것을 말합니다.

그 이유는 동일한 클래스 이름이나 전역 선택자가 여러 컴포넌트에 영향을 미쳐 UI 일관성을 무너뜨릴 수 있습니다. 

이처럼 CSS 격리를 통해 얻을 수 있는 이점은 아래와 같습니다.

1. 스타일 충돌방지 
    - 전역 스타일이 특정 컴포넌트의 스타일을 덮어 씌움
2. 코드 가독성과 유지보수성 향상
    - 특정 컴포넌트의 스타일을 수정하려면 해당 컴포넌트와 관련된 파일만 수정하면 된다.
3. 의도하지 않은 상속 및 전파 방지
    - CSS 속성 중 일부 전파가되는 속성이 존재합니다. 이로 인해 UI의 일관성을 무너뜨릴 수 있습니다.

이때, 뷰에서는 컴포넌트 별 스타일을 지역적으로 관리하기 위해서 scoped 속성을 지원한다.
scoped 속성을 사용하게 되면 DOM 요소에 `data-v-XXX`형태의 고유한 속성이 추가되어서 해당 컴포넌트에서 가장 높은 우선순위로 스타일을 적용할 수 있게 된다.

다시 정리해보면 scoped 속성을 이용해서 컴포넌트별 고유한 스타일을 지정할 수 있다는 것이다.

하지만 scoped 속성이 고유한 스타일을 제공하는 것이 아니다.......

# `<style scoped>` 속성의 한계 및 문제점
`scoped`속성이 어떤 문제점을 나타내는지 알아보자.
```text
조건
-  우선 공통적으로 사용되는 CSS에 대한 설정을 독립적으로 분리했다.
```

1. `scoped`속성을 사용해도 공통, 외부 CSS의 우선순위가 더 높은 경우 
- common.css (공통 및 외부 CSS)
```css
#app > ... > .wrapper {
    background-color: red;
}
```

- TestComponent.vue
```vue
<template>
    <div class='wrapper'>
        테스트 컴포넌트
    </div>
</template>

<style scoped>
.warpper {
    background-color: green;
    color: red;
}
</style>
```
`scoepd`속성은 컴포넌트의 스타일을 지역적으로 제한하기 때문에 당연히 배경 색상이 초록색일 것으로 예상하지만, 실제로는 빨간색이 나오게 된다.

정리해보면, `scoped`속성은 스타일을 완전히 독립시키는 것이 아니라, 단순히 우선순위를 높여준다는 것이다. 
따라서 공용, 외부 CSS가 우선순위가 높아지게되면 `scoped`속성에 정의한 CSS가 적용되지 않아 의도치 않게 UI 일관성이 무너질 수 있다.

2. `scoped`속성을 사용해도 공용, 외부 CSS가 덮어씌워진다 (오버라이딩)

- common.css (공통 및 외부 CSS)
```css
.wrapper {
    background-color: red;
    border-color: orange;
}
```

- TestComponent.vue
```vue
<template>
    <div class='wrapper'>
        테스트 컴포넌트
    </div>
</template>

<style scoped>
.warpper {
    background-color: green;
}
</style>
```

위 코드를 실행해보면 당연히 배경색만 초록색으로 변경될 것으로 예상된다.
하지만 실제로 테두리 색깔이 오렌지색으로 변경되는 것을 확인할 수 있다.

그 이유는 `scoped`속성은 단순히 우선순위를 높여주는 것이다. 따라서 공용, 외부 CSS파일을 오버라이딩 한 것이기 때문에 배경색은 `<style scoped>`에 정의한 초록색이 나오지만, 테두리 색도 오렌지색으로 적용이되는 것을 볼 수 있다.

다시 정리해보자.
결국 `scoped`속성은 컴포넌트의 스타일을 완전히 독립적 분리하는 것이 아니라 우선순위를 높여주는 것이다. 

따라서, `scoped`속성만을 믿고 고유하게 컴포넌트 별 스타일을 분리했다고 하기에는 UI 일관성을 무너뜨릴 수 있다.

# 해결방법은 ? 규칙적이고 일관된 컨벤션!!!
위 문제점들을 살펴보면 공통, 외부 CSS와 클래스명이 중복되는 경우에 대해서만 CSS가 중복되어 UI 일관성을 무너뜨린다.

다시 말해 `scoped`는 공통, 외부 CSS 클래스 명이 중복되는 경우에만 문제가 된다는 것이다.

그러면 해결 방법은 무엇일까 ?
단순히 클래스명이 중복되지 않게 하면 될 것 같다. 

그래서 css 클래스 네이밍에 대해 알아보았다.
가장 범용적이고 많이 사용되는 네이밍 컨벤션이 `BEM(Block, Element, Modifier)` 방식이라고한다.

구조는 아래와 같다.
1. Blcok
    - 컴포넌트나 기능의 가장 큰 단위
    - 예 : `navbar`, `button`, `card`

2. Element
    - Block의 하위 구성 요소
    - 예 : `navbar-item`, `card-title`

3. Modifier
    - Block이나 Element의 변형된 상태
    - 예 : `button-primary`

## BEM 예시

- UserList.vue
```vue
<template>
    <div class='user-list'>
        <div class='user-list-header'></div>
        <div 
            class='user-list-body'
            v-for="(user, index) in users" :key="index"
        >
            <UserListItem />
        </div>
    </div>
</template>
```

- UserListItem.vue
```vue
<template>
    <div class='user-list-item'>
        <p class='font-color-red'>ID : {{ user.id }}</p>
        <p class='font-color-blue'>이메일 : {{ user.email }}</p>
        <p class='font-color-yellow'>이름 : {{ user.username }}</p>
    </div>
</template>
<style scoped>
.user-list-item > .font-color-red {
    color: red;
}
.user-list-item > .font-color-blue {
    color: blue;
}
.user-list-item > .font-color-yellow {
    color: yellow;
}
</style>
```
이처럼 BEM 방식을 사용하게 되면 외부 CSS와 `scoped` 내부 CSS 클래스 명 중복을 방지할 수 있을 것이고 생각된다. 

그 이유는 컴포넌와 같이 기능 단위의 Block을 기준으로 시작하기 때문에 클래스명 중복 현상은 거의 발생하지 않을 것이라고 생각된다.

또한 BEM 규칙에 맞춰 클래스명을 작성하면 클래스 이름만으로도 구조를 명확하게 파악할 수 있다고한다.

그리고 구조적으로 파악이 가능하다는 것은 다른 개발자들과 협업하는 경우와 유지보수 측면에서도 매우 장점이 될 것 같다고 생각된다.




