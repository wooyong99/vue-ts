# Vu3 스타일 가이드

## 우선 순위 규칙 : 강력 권장
이 규칙은 대부분의 프로젝트에서 가독성 및/또는 개발자 경험을 개선하는 것으로 밝혀졌습니다.
이 규칙을 위반해도 코드는 실행되지만 위반하는 경우는 드물고 정당한 이유가 있어야합니다.

### 컴포넌트 파일
빌드 시스템에서 파일을 연결할 수 있는 경우 각 컴포넌트는 자체 파일에 있어야합니다.
이렇게 하면 컴포넌트를 편집하거나 사용 방법을 검토해야할 때 더 빠르게 찾을 수 있습니다.

- 잘못된 예시
```typescript
app.component('TodoList', {
    // ..
})

app.component('TodoItem', {
    // ..
})
```

- 좋은 예시
```text
components/
|- TodoList.vue
|- TodoItem.vue
```

###  SFC 파일명 대/소문자
SFC의 파일명은 항상 Pascal케이스이거나 항상 Kebab케이스이어야합니다.

파스칼 케이스는 코드 편집기의 자동완성 기능에서 가장 잘 작동하고, 가능한 경우 JSX 및 템플릿에서 컴포넌트를 참조하는 방식과 일치하지 때문입니다.
그러나 대소문자를 구분하지 않는 파일 시스템에서는 대소문자가 혼합된 파일 이름으로 인해 문제가 발생할 수 있으므로 케밥 케이스도 완벽하게 사용할 수 있습니다.

- 잘못된 예시
```text
components/
|- mycomponent.vue
```
- 좋은 예시
```text
components/
|- MyComponent.vue
```
```text
components/
|- my-component.vue
```

### 기본 컴포넌트 이름
앱별 스타일과 규칙을 적용하는 기본 컴포넌트(프레젠테이션, 덤 또는 순수 컴포넌트라고도 함)는 모두 `Base`, `App`또는 `V`와 같은 특정 접두사로 시작해야합니다.

#### 자세한 설명
이러한 컴포넌트는 애플리케이션에서 일관된 스타일과 동작을 위한 토대를 마련합니다.다음과 같은 엘리먼트만 포함할 수 있습니다.
- HTML 엘리먼트
- 기타 기본 컴포넌트
- 타사 UI 컴포넌트

그러나 글로벌 상태(예: Pinia스토어)는 절대로 포함하지 않습니다.

특정 목적에 맞는 엘리먼트가 존재하지 않는 한 (예:`BaseIcon`)이름에 래핑하는 엘리먼트의 이름이 포함되는 경우가 많습니다. (예:`BaseButton`, `BaseTable`).
보다 구체적인 컨텍스트에 대해 유사한 컴포넌트를 빌드하는 경우 거의 항상 이러한 컴포넌트를 사용하게 됩니다.(예: `BaseButton`은 `ButtonSubmit`에서 사용될 수 있음)

이 규칙에는 몇가지 장점이 있습니다.
- 편집기에서 알파벳순으로 구성하면 앱의기본 컴포넌트가 모두 함께 나열되므로 쉽게 식별할 수 있습니다.
- 컴포넌트 이름은 항상 여러 단어로 구성해야하므로 이 규칙을 사용하면 간단한 컴포넌트 래퍼에 임의의 접두사(예: `MyButton`, `VueButton`)를 선택하지 않아도 됩니다.
- 이러한 컴포넌트는 자주 사용되기 때문에 모든 곳에서 임포트하는 대신 전역으로 만들고 싶을 수 있습니다. 접두사를 사용하면 WebPack에서 이를 가능하게 합니다.

```typescript
const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig
    const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//,'').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
})
```

- 잘못된 예시
```text
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```
- 좋은 예시
```text
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```
```text
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```
```text
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

### 긴밀하게 결합된 컴포넌트 이름
부모 컴포넌트와 긴밀하게 결합된 자식 컴포넌트는 부모 컴포넌트 이름을 접두사로 포함합니다.
```
component
|- UserList.vue
|- UserListItem.vue
```

컴포넌트가 단일 상위 컴포넌트의 컨텍스트에서만 의미가 있는 경우, 그 관계가 이름에 명확히 드러나야합니다.
편집기는 일반적으로 파일을 알파벳 순서로 정리하므로 이렇게 하면 관련 파일이 서로 나란히 정렬됩니다.

#### 상세 설명
부모 컴포넌트의 이름을 딴 디렉토리에 자식 컴포넌트르 중첩하여 이 문제를 해결하고 싶을 수 있습니다. 
```text
components/
|- TodoList/
    |- Item/
        |- index.vue
        |- Button.vue
    |- Index.vue
```
또는
```text
components/
|- TodoList/
    |- Item/
        |- Button.vue
    |- Item.vue
|- TodoList.vue
```
이 방법은 권장하지 않습니다.
- 이름이 비슷한 파일이 많아 코드 편집기에서 파일을 빠르게 전환하기가 더 어려워집니다.
- 중첩된 하위 디렉토리가 많아 에디터 사이드바에서 컴포넌트를 탐색하는 데 걸리는 시간이 길어집니다.

- 잘못된 예시
```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```
```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

- 좋은 예시
```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoLisItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

###  컴포넌트 이름 내 단어 순서
컴포넌트 이름은 가장 높은 수준의 단어(보통 가장 일반적인 단어)로 시작하고 설명적인 수정 단어로 끝내야합니다

#### 자세한 설명
궁금하실 수 있습니다

`"왜 컴포넌트 이름에 자연스럽지 않은 언어를 사용하도록 강제할까요?"`

자연스러운 영어에서는 형용사 및 기타 설명어가 명사 앞에 오는 것이 일반적이지만, 예외적으로 연결어가 필요합니다.
- 커피와 우유
- 수프 오늘의 수프
- 박물관_방문자

원한다면 이러한 연결어를 컴포넌트 이름에 포함할 수 있지만 순서는 여전히 중요합니다.

또한 "최상위 수준"으로 간주되는 것은 앱의 컨텍스트에 따라 달리질 수 있습니다. 
예를 들어 검색 양식이 있는 앱을 상상해 보세요. 이 앱에서는 다음과 같은 컴포넌트가 포함될 수 있습니다.

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchButton.vue
|- LaunchOnStartupButton.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

아시다시피 어떤 컴포넌트가 검색과 관련이 있는지 확인하는 것은 매우 어렵습니다. 이제 규칙에 따라 컴포넌트의 이름을 변경해보겠습니다.

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

편집기는 일반적으로 파일을 알파벳 순으로 정리하기 때문에 이제 컴포넌트 간의 모든 중요한 관계를 한 눈에 알 수 있습니다.

모든 검색 컴포넌트를 "검색" 디렉토리 아래에 중첩하고 모든 설정 컴포넌트를 "설정" 디렉토리 아래에 중첩하는 등 이 문제를 다른 방식으로 해결하고 싶을 수도 있습니다.
이러한 이유로 이 접근 방식은 매우 큰 앱(예:100개 이상의 컴포넌트)에서만 고려하는 것이 좋습니다.

- 일반적으로 단일 `components` 디렉토리를 스크롤하는 것보다 중첩된 하위 디렉토리를 탐색하는 데 더 많은 시간이 걸립니다.
- 이름 충돌(예: 여러 개의 `ButtonDelete.vue`컴포넌트)로 인해 코드 편집기에서 특정 컴포넌트로 빠르게 이동하기가 더 어려워집니다.
- 찾기 및 바꾸기만으로는 이동된 컴포넌트에 대한 상대 참조를 업데이트하기에 충분하지 않은 경우가 많으므로 리팩토링이 더 어려워집니다.

- 잘못된 예시
```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

- 좋은 예시
```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLanchOnStartup.vues
```
### 셀프 클로징 컴포넌트
콘텐츠가 없는 컴포넌트는 SFC, 문자열 템플릿, JSX에서 자체 닫혀야 하지만, in-DOM 템플릿에서는 절대 자체 닫혀서는 안됩니다.

자체 닫히는 컴포넌트는 콘텐츠가 없을 뿐 아니라 콘텐츠가 없는 것으로 의미된다는 것을 알립니다.
책에서 빈 페이지와 "이 페이지는 의도적으로 비워두었습니다."라고 표시된 페이지의 차이입니다.
불필요한 닫는 태그가 없는 코드도 더 깔끔해집니다.

안타깝게도 HTML에서는 사용자 정의 엘리먼트가 자체적으로 닫히는 것을 허용하지 않으며, 공식적인 "무효" 엘리먼트만 허용합니다. 그렇기 때문에 이 전략은 Vue의 템플릿 컴파일러가 DOM보다 먼저 템플릿에 도달한 다음 DOM 사양을 준수하는 HTML을 제공할 수 있을 때만 가능합니다.

- 잘못된 예시
```html
<MyComponent></MyComponenet>
```
```html
<my-component />
```

- 좋은 예시
```html
<MyComponent />
```
```html
<my-component></my-component>
```

### 템플릿 내 컴포넌트 이름 대/소문자 개분
대부분 프로젝트 내에서 컴포넌트 이름은 SFC와 문자열 템플리셍서는 항상 파스칼 케이스를 사용해야하지만, in-DOM템플릿에서는 케밥 케이스를 사용해야합니다.

파스칼케이스는 케밥케이스에 비해 몇가지 장점이 있습니다.
- 파스칼 케이스는 자바스크립트에서도 사용되기 때문에 편집자는 템플릿에서 컴포넌트 이름을 자동으로 완성할 수 있습니다.
- `<MyComponent>`는 한글자(하이픈)가 아닌 두 글자(대문자 두 개)의 차이가 있기 때문에 `<my-component>`보다 단일 단어 HTML 엘리먼트와 시각적으로 더 잘 구분됩니다.
- 템플릿에서 웹 컴포넌트와 같이 Vue가 아닌 사용자 정의 엘리먼트를 사용하는 경우 파스카 대소문자를 사용하면 Vue 컴포넌트가 명확하게 표시됩니다.

안타깝게도 HTML의 대소문자를 구분하지 않기 때문에 in-DOM템플릿은 여전히 케밥 케이스를 사용해야합니다.

또한 이미 케밥 케이스에 많은 투자를 했다면 HTML 규칙과의 일관성 및 모든 프로젝트에서 동일한 대소문자를 사용할 수 있는 것이 위에 나열된 장점보다 더 중요할 수 있습니다. 이러한 경우에는 모든 곳에 케밥 케이스를 사용하는 것도 허용합니다.

- 잘못된 예시
```html
<mycompoent/>
```
```
<myComponent/>
```
```
<MyComponent></MyComponent>
```

- 좋은 예시
```
<MyCompoent/>
```
```
<my-component></my-component>
```

### JS/JSX의 컴포넌트 이름 대/소문자
JS/JSX의 컴포넌트 이름은 항상 파스칼 케이스를 사용해야하지만, `app.component`를 통한 전역 컴포넌트 등록만 사용하는 간단한 애플리케이션의 경우 내부에 케밥 케이스를 사용할 수 있습니다.

- 잘못된 예시
```typescript
app.component('myComponent', {
    // ...
})
```
```typescript
import myComponent from './MyComponent.vue'
```
```typescript
export default {
    name: 'myComponent'
}
```
```typescript
export default {
    name: 'my-component'
}
```

- 좋은 예시
```typescript
app.component('MyComponent', {
    //...
})
```
```typescript
app.component('my-component', {
    //..
})
```
```typescript
import MyComponent from './MyComponent.vue'
```
```typescript
export default {
    name: 'MyComponent'
}
```
### 전체 단어 컴포넌트 이름
컴포넌트 이름은 약어보다 완전한단어를 사용하는 것이 좋스빈다.

편집기의 자동 완성 기능은 긴 이름을 작성하는 데 드는 비용을 매우 낮춰주는 반면, 명확성을 제공하는 것은 매우 귀중합니다.

특히 흔하지 않은 약어는 항상 피해야합니다.

- 잘못된 예시
```
components/
|- SdSettings.vue
|- UProfOpts.vue
```
- 좋은 예시
```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

### prop 이름 대소문자
prop 이름은 선언 시 항상 대/소문자를 구분해야합니다. in-DOM 템플릿 내에서 사용하는 경우 prop은 케밥 케이스를 사용해야합니다. 
싱글 파일 컴포넌트 템플릿과 JSX는 케밥 케이스 또는 캠멜 케이스 프로퍼티를 사용할 수 있습니다. 대소문자는 일관성을 유지해야합니다.
camelCase prop을 사용하기로 선택하는 경우 애플리케이션에서 케밥 케이스 prop을 사용하지 않아야합니다.

- 잘못된 예시
```typescript
const props = defineProps({
    'greeting-text':string
})
```
```html
<welcom-message greetingText='hi'></welcom-message>
```

- 좋은 예시
```typescript
const props= defineProps({
    greetingText :string
})
```

```html
// SFC의 경우 - 프로젝트 전체에서 대소문자가 일관성 있게 유지되도록 하세요.
// 두 가지 규칙 중 하나를 사용할 수 있지만 두 가지 다른 대소문자 스타일을 혼합하는 것은 권장하지 않습니다.
<WelcomMessage greeting-text='hi'/>
<WelcomMessage greetingText='hi'/>
```

```html
<welcom-message greeting-text='hi'></welcom-message>
```

### 템플릿의 간단한 표현식
컴포넌트 템플릿에는 단순한 표현식만 포함해야 하며, 복잡한 표현식은 계산된 속성이나 메서드로 리팩토링 해야합니다.

템플릿에 복잡한 표현식이 있으면 선언적 표현이 줄어듭니다. 값을 계산하는 방법이 아니라 무엇이 표시되어야하는지를 설명하기 위해 노력해야합니다.
계산된 프로퍼티와 메서드는 코드를 재사용할 수 있게 해줍니다.

- 잘못된 예시
```template
{{
    fullName.split(' ').map((word) => {
        return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
}}
```

- 좋은 예시
```template
{{ nomalizedFullName}}
```

```ts
const nomalizedFullName = computed(() => 
    fullName.value
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ')
)
```

### 단순 계산 프로퍼티
복잡한 계산 프로퍼티는 가능한 한 많은 단순한 프로퍼티로 분할해야합니다.

::: details 자세한 설명 더 간단하고 이름이 잘 지정된 계산된 프로퍼티입니다.

- 테스트하기 쉬움
    - 각 계산된 프로퍼티에 종속성이 거의 없는 매우 간단한 표현식만 있으면 올바르게 작동하는지 확인하는 테스트를 작성하기가 훨씬 쉽습니다.

- 읽기 쉬움
    - 계산된 프로퍼티를 단순화하면 재사용되지 않더라도 각 값에 설명이 포함된 이름을 지정할 수 있습니다.<br>
    이렇게 하면 다른 개발자(그리고 미래의 개발자)가 관심있는 코드에 집중하고 무슨 일이 일어나고 있는지 파악하기가 훨씬 쉽습니다.
- 변화하는 요구사항에 더 쉽게 적응
    - 이름을 지정할 수 있는 모든 값은 뷰에 유용할 수 있습니다. 예를들어, 사용자가 얼마나 많은 돈을 절약했는지 알려주는 메시지를 표시하기로 결정했습니다. 또한 판매세를 계산하되 최종 가격의 일부가 아닌 별도로 표시하기로 결정할 수도 있습니다.

작고 집중적으로 계산되는 속성은 정보 사용 방식에 대한 가정이 적기 때문에 요구 사항 변경에 따른 리팩토링이 덜 필요합니다 :::

- 잘못된 예시
```ts
const price = computed(() => {
    const basePrice = manufactureCost.value / (1 - profitMargin.value)
    return basePrice - basePrice * ( discountPercent.value || 0 )
})
```

- 좋은 예시
```ts
const basePrice = computed(
    () => manufactureCost.value / ( 1 - profitMargin.value )
)
const discount = computed(
    () => basePrice.valeu * ( discountPercent.value || 0 )
)
const finalPrice = computed(() => basePrice.value - discount.value)
```