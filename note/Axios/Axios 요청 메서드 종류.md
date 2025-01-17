# Axios HTTP 요청 메서드 종류
## axios.get(url, [config])
서버에서 데이터를 가져올 때 사용하는 메서드입니다. 두 번째 파라미터 ```config``` 객체에는 헤더(header), 응답 초과시간(timeout), 인자 값(params) 등의 요청 값을 같이 넘길 수 있습니다.

```typescript
axios.get('user/1')
```

## axios.post(url, [ data, [config ] ])
서버에 데이터를 새로 생성할 때 사용하는 메서드이다. 
두번째 파라미터 ```data```에 생성할 데이터를 넘깁니다.

```typescript
axios.post('/books', {title:'테스트 제목'})
```

## axios.put(url, [data, [config] ])
특정 데이터를 수정할 때 요청하는 메서드입니다.
```put```은 새로운 리소스를 생성하거나, 이미 존재하는 데이터를 대체할 때 사용합니다.
```post```와 다른 점은 ```post```는 여러 번 호출할 경우, 새로운 데이터가 지속적으로 추가됩니다.
하지만 ```put```은 한 번 요청을 하거나 여러 번 지속적으로 요청해도 결괏값이 동일합니다.

예를 들어, 아래 예시 처럼 2번 유저의 이름을 ```Iron Man```으로 수정하기 위해 ```axios.put```요청을 보냅니다. 

이때, ```put```요처을 한번 보내거나 여러 번 보내도 2번 유저의 이름은 ```Iron Man```으로 동일하게 수정됩니다.

## axios.delete(url, [config])
특정 데이터나 값을 삭제할 때 요청하는 메서드입니다.

```typescript
axios.delete('books/3')
```

## Axios HTTP 요청 Config 옵션
Axios 요청을 할 때는 config 설정이 필요합니다.

### url
```url```은 Axios 요청에 사용될 서버의 url을 말합니다.
```typescript
url : '/books'
```

### method
```method```는 요청을 할때 사용할 요청 메서드입니다. ```method```의 기본 값은 ```get```입니다.
```typescript
method: 'get'
```

### baseURL
```baseURL```은 Axios 인스턴스를 생성할 때, 인스턴스의 기본 URL 값을 지정할 수 있는 속성입니다. 

보통 ```http://mysite.com/api/v1```처럼 API 서버의 기본 도메인을 설정하고, 인스턴스 별로 URL을 뒤에 추가하여 사용합니다.
```typescript
baseURL : 'http://도메인.com/api/'
```

### headers
헤더를 수정해서 보내야한다면 ```headers```를 사용하면 됩니다.
```typescript
headers : {'X-Requested-With' : 'XMLHttpRequest'}
```

### params
```params```는 HTTP 요청에붙일 URL 파라미터를 의미합니다. 
예를들어, 아래 예시 코드는 ```https://domain.com```이라는 URL로 HTTP 요청을 보냈을 때 ```https://domain.com?id=123```으로 전달하는 것과 같은 효과를 가집니다.
여기서 ```params```가 ```null```이거나 ```undefiend```인 경우에는 파라미터가 조합되지 않습니다.
```typescript
params : {
    id: 123
}
```

### data
```data```는 HTTP요청 본문에 실어서 보낼 데이터를 의미합니다. 주로 데이터를 조작해야하는 PUT, POST, DELETE, PATCH 등의 메서드에서 사용합니다.

```typescript
data: {
    firstName : 'Christine'
},

// 아래의 data config 설정은 POST에서만 사용이 가능합니다.
data: `Age=26&City=NewYork
```

### timeout
```timeout```은 HTTP 요청을 보내고 응답을 받기까지의 제한 시간을 설정하는 속성입니다.
요청 시간이 지정된 값을 초과하면 에러가 발생합니다.
```typescript
// 단위(millisecond)
timeout: 5000 // 5초
```

### responseType
```responseType```은 서버로부터 어떠한 데이터 형식으로 응답받을지 지정하는 것입니다. 
옵션으로는 arraybuffer, document, json, text, stream이 가능합니다.
기본 값은 json 입니다.
```typescript
responseType: 'json'
```

### 기타 Axios 요청 Config
Config 옵션은 메서드 별로 사용할 수 있는 옵션이 다르므로, [Axios Request Config 문서](https://axios-http.com/docs/req_config)를 참고하시길 바랍니다.

