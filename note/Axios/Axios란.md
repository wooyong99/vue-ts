# Axios 란 ?
- node.js와 브라우저를 위한 Promis 기반 HTTP 클라이언트 라이브러리이다.
- Vue에서 권고하는 HTTP 통신 라이브러리입니다.

## Axios 문법 ( 2가지 )

### 1. 요청 메서드를 사용하지 않는 경우
config을 전송해야 (필수) 요청이 가능하다.
- url, data, header 모두 아래와 같이 config (axios인자 내에 {})내에 작성해야합니다.

```typescript
axios({
    method: 'post',
    url: 'https://testServer.com/box/1',
    data: {
        shape: 'circle',
        color: 'red',
    },
    header: {
        'Context-Type': 'multipart/form-data'
    }
})

```

### 2. 요청 메서드(get, post, put, delete)를 사용하는 경우
url만 필수적으로 입력하면 config를 설정하지 않고 사용이 가능하다.
- url, method, data 속성을 config에서 지정할 필요가 없다.
- 하지만 이외에 header, responseType 등은 지정해야한다.

```typescript
const redBall = {
    shape: 'circle',
    color: 'red',
}

axios.post('https://testServer.com/box/1', redBall, {
    header: {
        'Context-Type': 'multipart/form-data'
    }
})
```

## Axios 사용 방법 ( Post )
```typescript
axios
    .post('https://testServer.com/box/1', redBall, {
        header: {
            'Context-Type': 'multipart/form-data',
        },
    })
    .then((res) => {
        // 성공했을 경우
        console.log('성공', res);
    })
    .catch((res) => {
        // 실패했을 경우
        console.error('실패', res);
    })
```

post 요청을 
- https://testServer.com/box/1이라는 url에
- header에 Context-Type을 명시하고
- redBall이라는 변수에 데이터를 body로 담아 전송한다.

이후
- 성공(then)했을 경우,  res를 console.log로 출력
- 실패(catch)했을 경우, res를 console.error로 출력

### Vue에서 Axios 설정

#### 1. 각 파일에서 설정
각 파일에서 설정할 경우, script 내에 axios import한 후에 아래와 같이 methods내에서 선언 후 사용할 수 있다.

```typescript
// test.vue
<script>
import axios from 'axios';

export default {
    data: {
        return: {
            emptyBox: 'empty'
        },
    },
    methods: {
        testAxios() {
            axios
                .post('https://testServer.com/box/1', this.emptyBox, {
                    header: {
                        'Context-Type' : 'multipart/form-data'
                    }
                })
                .then((res) => {
                    // 성공했을 경우
                    console.log("성공", res);
                })
                .catch((res) => {
                    // 실패했을 경우
                    consoel.log("실패", res);
                })
        }
    }
}
</script>
```

#### 2. main.js에서 axios 전역 설정
```typescript
// main.js
import axios from 'axios';
import router from './router';

const app = createApp(App)
    .use(router)
    .mount('#app');

app.config.globalProperties.axios = axios; // axios 전역 설정
```

main.js에서 Vue.prototype.$axios=axios로 axios를 전역 설정을 해줄 수 있다.
또한 baseURL도 위와 같이 설정할 수 있다.

```typescript
<script>
export default {
    data: {
        return: {
            emptyBox: 'emptu',
        },
    },
    methods: {
        testAxios() {
            this.axios
                .post('/box/1', this.emptyBox, {
                    header: {
                        'Context-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    // 성공했을 경우
                    console.log('성공', res);
                })
                .catch((res) => {
                    // 실패했을 경우
                    console.log('실패', res);
                })
        }
    }
}
</script>
```
이를 통해 vue파일(컴포넌트)에서 this.axios로 축약해서 위와 같이 axios를 사용할 수 있다.