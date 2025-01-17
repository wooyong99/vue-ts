# SCSS란 ?
CSS 격리를 위해서 SCSS를 알게 되었다.
SCSS에 대한 개념과 사용이유에 대해서 정리해보려고한다.

SCSS란 CSS의 단점을 보완하기 위하여 CSS 확장 개념으로 나온 스크립트 언어이다.
코드의 재활용성, 가독성을 높이며 개발 효율을 높이기 위해 등장한 CSS 전처리기 언어이다.
CSS를 훨씬 더 편리하게 사용할 수 있도록 하며 추가 기능을 갖춘 확장판 스크립트 언어이다.

근데 SCSS에 대해 조사해보면서 SASS도 알게 되었다.
이 둘의 차이점은 문법에 조금 차이가 있고 같은 곳에서 파생된 언어라고 한다.

SCSS와 SASS는 확장자, 구문 스타일도 다릅니다.

## 설치 방법
```bash
npm install --save-dev node-sass sass-loader
```

## 코드로 CSS와 SCSS구문 차이점
### 1. CSS

```css
nav ul {
    margin : 0px;
    padding : 0px;
    list-style : none;
}
nav li {
    display : inline-block;
}
nav a {
    display : block;
    padding : 5px 5px;
    text-decoration : none;
}
```

### 2. SASS

```sass
nav
    ul
        margin : 0px
        padding : 0px
        list-style : none
    li
        display : inline-block
    a
        display : block
        padding : 5px 5px
        text-decoration : none
```

### 3. SCSS
```scss
nav {
    ul {
        margin : 0px;
        padding : 0px;
        list-style : none;
    }
    li {
        display : inline-block;
    }
    a {
        display : block;
        padding : 6px 12px;
        text-decoration : none;
    }
}
```

## SCSS 장/단점
### 장점
- CSS보다 훨씬 더 간단한 표기법으로 css를 구조화하여 표현이 가능합니다.
- 가독성이 높으며 재사용성을 높여주기 때문에 유지보수가 쉬워진다.
- 업무 능력이 다른 팀원들과 작업 시 일어날 수 있는 구문 수준 차이 평준화가 가능합니다.
- CSS의 태생적인 한계를 보완하기 위해 아래와 같은 도구를 제공합니다.

```
- 변수의 사용
- 조건문과 반복문
- Impoart[모듈화]
- Nesting[선택자 반복 작성을 줄여주는 기능]
- Mixin [함수 개념]
- Extend/Ingeritance[확장/상속]
```
- 선택자 중첩(Nesting)을 통하여 반복되는 부모요소 선택자 사용을 줄일 수 있습니다.
- 변수(Variable)을 이용하여 CSS 속성 값을 통일하여 관리가 가능합니다.
- 프로그래밍 언어에서 사용하는 조건문 및 반복문을 통하여 동적인 CSS 관리가 가능합니다.
- 상속되는 선택자를 계층적으로 명시하여 불필요한 반복 사용을 줄일 수 있습니다.

### 단점
- 전처리기를 위한 도구가 필요합니다 또 다시 컴파일 하는 시간이 느릴 수 있습니다.
- Less에서 변수 이름의 접수어가 @이기 때문에 @media, @import, @font-face 규칙과 같은 고유 CSS랑 키워드가 헷갈릴 수 있습니다.
- SASS에서는 노드 버전을 변경할 때 자주 컴파일 합니다.