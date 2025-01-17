# CSS 클래스 네이밍 선택

## 1. 내가 만들어본 네이밍
우리가 CSS 네이밍 컨벤션을 사용하는 이유는 컴포넌트 별 CSS 클래스 이름과 공용 CSS 클래스 이름 간 중복을 방지하기 위함이다.

다시 말해 컴포넌트 별로 식별할 수 있어야한다는 것이다.

이러한 점을 고려했을 때 각 컴포넌트의 내부 루트 태그에 컴포넌트 이름을 케밥 케이스로 클래스 이름을 지정하여 프로젝트 전체에서 고유한 클래스 이름을 지을 수 있을 것이라고 생각한다.

왜냐하면 컴포넌트 이름은 중복이 되지 않기 때문이다.

더불어, 만약 vue 파일안에 style 태그에 scoped 속성과 같이 작성한다면 템플릿, 로직, 스타일을 하나의 파일에서 관리해서 유지보수도 좋아질 것이라고 생각한다.

그리고 해당 컴포넌트 내부에서 구조를 명확하게 하기 위해서 흔히 사용되는 예약어를 이용하여 작성하면 좋을 것이라고 생각된다.

### css 클래스 이름 작성 시 네이밍 예약어 예시
```
header - 헤더영역
footer - 풋터영역
container - 콘텐츠 전체 영역
content - 서브 콘텐츠 영역
title - 일반적인 타이틀
nav - 네이게이션
list - 목록
table - 테이블
tab - 탭탭
btn - 버튼
icon - 아이콘
active - 활성화 상태
disabled - 비활성화 상태
hidden - 숨겨진 상태
visible - 보이는 상태
loading - 로딩 상태
selected - 선택 상태
.....
```


## 2. BEM
- BEM은 Block, Element, Modified의 약자이다.
- id는 사용할 수 없고, 오직 class 명만 사용할 수 있다.
- 예시: [Block]__[Elment]--[Modifier]

### Block
Block은 문단 전체에 적용된 element 또는 element를 담고 있는 컨테이너를 말한다.
Block은 기능적으로 독립되어 재사용될 수 있는 컴포넌트이다.

### Element
Element는 Block에서 분리되어 사용할 수 없는, Block의 일부분이다.
Element는 서로 중첩될 수 없다.
두개의 밑줄(__)로 표현된다.

- 예시 : `header__logo`


### Modifier
Modifier는 Block이나 Element 행동이나 상태 또는 외양을 정의하는 객체이다.

Modifier의 경우 한개의 밑줄(_) 또는 하이픈(-)을 추가하여 표시한다. 더블 하이픈(--)을 사용하기도한다.

- Boolean
Modifier의 유무가 중요할 때 사용된다.
값이 상관 없을 때는 disabled로 표현된다.

- Key-Value
Modifier의 값이 중요할 때 사용된다.





