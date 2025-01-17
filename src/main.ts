import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import router from './router/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

createApp(App)
    .use(router)
    .use(
        createPinia()
            .use(piniaPluginPersistedstate)
    )
    .mount('#app')
