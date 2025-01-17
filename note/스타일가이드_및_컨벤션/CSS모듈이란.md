# 1. CSS module이란 ?
- css 모듈은 css를 모듈화하여 사용하는 방식을 말한다.
- 클래스명은 모듈 컴파일러에 의해 고유한 클래스명을 가지게 된다.
- 클래스 명이 고유해지므로 css의 범위를 지역적으로 한정시킬 수 있다는 장점이 있다.
- css 클래스명을 생성할 때는 파일 경로, 파일 이름, 클래스 이름, 해쉬 값 등이 사용된다.

# 2. Vue와 CSS Module
```
CSS module을 사용하면 CSS의 적용 범위를 지역적으로 한정시킬 수 있다고 했다.
하지만 Vue에서는 CSS에서 scoped를 사용하면 범위를 제한할 수 있는데 이 둘의 차이는 뭘까 ?
```

## 2-1. scoped vs CSS module
- Vue에서는 CSS에 scoped를 적용하며 CSS 적용 범위를 지역적으로 제한할 수 있다.

```typescript
<template>
    <div class="wraaper">
        <p>parent</p>
        <HelloWorld />
    </div>
</template>
<style scoped>
.wrapper {
    outline: 2px solid blue;
}
</style>
```

하지만, `scoped`에는 단점이 있는데 하위 컴포넌트에 있는 클래스가 상위 컴포넌트에도 있는 경우, 상위 컴포넌트의 스타일이 하위 컴포넌트에 적용된다는 점이다.
아래 예시처럼 `Parent.vue`의 `.wrapper`가 있다면, `Child.vue`에는 `Parent.vue`의 `.wrapper`가 적용된다

```
| App.vue
|   Parent.vue => .wrapper
|       Child.vue => .wrapper(parent의 .wrapper도 적용된다.) 
|           GrandChild.vue => .wrapper (parent의 .wrapper도 적용된다.) -> scoped 속성을 사용
```

이처럼 scoped를 사용하더라도 해당 컴포넌트에서 정의한 클래스가 상위 컴포넌트에 존재하는 경우 상위 컴포넌트에서 정의한 클래스가 적용이 된다.
하지만 scoped를 사용한 컴포넌트에서 정의한 CSS 내용은 CSS 적용 범위를 해당 컴포넌트 제한된다.

실습을 진행해보면서 내가 느낀 것은 scoped 속성의 코드는 우선순위가 가장 높아지는 것으로 판단되었고 상위 컴포넌트의 CSS를 모두 오버라이딩하여 공유하여 사용한다는 생각이 들었다.
즉, 단순히 scoped를 이용하는 것은 CSS를 격리하는 것이 아니라 우선순위를 높게 측정한다고 판단되었다.

예제를 봐보자
```
| App.vue
|   Parent.vue => .wrapper (GrandChild의 .wrapper가 적용된다.)
|       Child.vue => .wrapper(parent의 .wrapper도 적용된다.) -> scoped 속성 사용용
|           GrandChild.vue => .wrapper (GrandChild의 .wrapper도 적용된다.)
```

이처럼 컴포넌트가 계층형으로 존재할 때, 중간 계층의 컴포넌트에서 scoped 속성을 사용할 경우, 하위 컴포넌트에서 정의한 CSS가 전역적으로 적용되는 것을 확인했다.

하지만 만약 CSS module을 사용하면 클래스명이 고유해져 예상치 못한 스타일이 적용되는 현상을 막을 수 있습니다.

## 2-2. CSS module 사용법
### 2-2-1. 자체 선언해서 사용하기
- Vue에서 CSS에 module을 적용하면, 모듈화하고 싶은 스타일을 선호할 수 있다.
```typescript
<style lang="scss" module>
.myClass {
    color:blue
}
</style>
```

- 그러면 template에서는 아래와 같이 모듈화된 클래스를 사용할 수 있다.
```typescript
<template>
    <h2>I'm parent component</h2>
    <div :class="$style.myClas">hello world</div>
    <p>using useCssModule: {{ $style.myClass }}</p>
    <p>using getCurrentInstance: {{ $style.myClass }}</p>

    <hr />
    <ChildComponenet />
</template>
```

- 적용된 클래스 명을 보면, `.myClas`가 아닌 고유한 클래스명이 적용된 것을 확인할 수 있다. [데모보기](https://stackblitz.com/edit/vue3-access-css-modules-from-script-setup-xmtmlksg?file=src%2Fcomponents%2FMyComponent.vue,src%2Fcomponents%2FChildComponent.vue)

### 2-2-2. import 해서 사용하기
- 두 번째 방법은 외부 style코드를 `import`하여 모듈화하는 방법이다.
- 먼저, `assets/utils.scss`에 스타일을 지정한다.

```scss
// assets/utils.css
.button {
    width: 200px;
    height: 20px;
    border: 2px solid gray;
}
```

- 그 다음 `module`이 적용된 style에 `@import`를 사용하여 CSS를 가져온다.
```css
<style lange="scss" module>
@import '../assets/utils.scss'

.myClass {
    color: red;
}
</style>
```

- template에서 `@import`한 스타일과, `.myClass`를 둘 다 접근할 수 있다.

```typescript
<template>
    <h2>I'm child componenet</h2>

    <div :class="[$style.myClass, $style.button]">hello world</div>
    <p>using imported scss : {{ $style.button }}</p>
    <p>using imported scss : {{ $style.myClass }}</p>
</template>
```

이처럼 CSS 적용 범위를 지역적으로 제한하는 CSS Module에 대해서 알아보았다. 
Vue에서는 기존에 `scoped`속성을 이용해서 CSS 적용 범위를 제한할 수 있지만, `scoped` 속성은 상위 컴포넌트의 영향을 받는다는 단점이 존재한다.

따라서, 프로젝트의 규모가 커짐에 따라서 CSS Module의 사용은 클래스 명의 충돌하는 문제를 해결할 수 있고, 컴포넌트 단위로 독립적인 CSS파일을 적용할 수 있다고 생각한다.

# Vue 파일과 SCSS(CSS) 분리
기본적으로 Vue파일에 스타일을 입히기 위해서는 Vue 파일을 열어서 `style`태그 내에서 해당 페이지의 CSS를 작업해야합니다.

하지만 다수의 개발자들이 하나의 컴포넌트를 작업하는 경우 충돌의 우려가 존재할 수 있습니다.
그래서 프로젝트의 각 개별 Vue 파일에서는 `style`을 사용하지 않고 별도의 위치에 SCSS폴더에 만들어 여기에서만 작업하도록 하려고합니다. 저는 그 위치를 assets로 잡았습니다.

# SCSS란 ?
SCSS, SASS, LESS, Stylus 같은 것을 CSS 전처리기라고합니다.
css가 그냥 나열식으로 스타일을 구현한다면 CSS 전처리기는 약간의 프로그램적으로 CSS를 구현한다고보시면 됩니다.
웹 브라우저에서 바로 SCSS를 해석해서 보여준느 것은 아니므로 SCSS로 작업한 파일들을 한번 커파일해서 CSS로 변환한 후 적용되게 되어있습니다.
보통 `node.js`를 기반으로 프로젝트를 개발할 경우 전처리기를 작업하는 도중에 바로바로 `node.js`가 컴파일 해주므로 매우 편하게 작업을 할 수 있습니다.
SCSS는 여러가지 다양하고 많은 기능을 가지고 있지만 가장 핵심적인 기능이라고 하면 CSS에 변수를 적용할 수 있어서 일괄 수정과 적용이 매우 쉽습니다.
또한 import 기능이 있어서 화면별로 또는 구성별로 나누어서 작업할 수 있습니다. 
마지막으로 nested기능이 있어서 css의 브라켓 안에 css를 작업할 수 있어서 구조적으로 css를 작업할 수 있습니다.
자세한 정보는 아래 SCSS홈페이지 참조하세요.
[SCSS](https://sass-lang.com/)