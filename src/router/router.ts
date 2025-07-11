import { createWebHistory , createRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import Swal from 'sweetalert2'
import LoginView from '../views/users/LoginView.vue';
import JoinView from '../views/users/SignupView.vue';
import UserListView from '../views/users/UserListView.vue';
import UserDetailView from '../views/users/UserDetailView.vue';
import NiceCallback from '../views/NiceCallback.vue';
import NiceTemplate from '../views/NiceTemplate.vue';
import AdminView from '../views/AdminListView.vue';
import ProductDetailView from '../views/products/ProductDetailView.vue';
import ProductListView from '../views/products/ProductListView.vue';
import { showInfoAlert } from '../utils/alertUtil';
import SignupView from '../views/users/SignupView.vue';
import PaymentView from '../views/PaymentView.vue';


const routes = [
    { path: '', component: ProductListView},
    {
        path: '/payments',
        component: PaymentView
    },
    { 
        path: '/admins',
        children: [
            {   path: '', component: AdminView}
        ]
    },
    { 
        path: '/users',
        component: UserListView,
        children: [
            {   path: '/users/:id', component: UserDetailView , name: "UserDetail"},
        ]
    },
    {   
        path: '/products',
        component: ProductListView,
        children: [
            {   path: '/products/:id', component: ProductDetailView, name: "ProductDetail" },
        ]
    },
    { path: '/login', component: LoginView},
    { path: '/join', component: SignupView},
    { path: '/api/nice', component: NiceTemplate},
    { path: '/nice/callback', component: NiceCallback}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore();

    if (to.path.startsWith("/admins") && !authStore.isLogin ){
        showInfoAlert("로그인 필요", "로그인 후 이용해주세요")
        return { path: '/login', query: { redirect: to.fullPath } }; // 리다이렉트 설정
    }
    
    if (to.path.startsWith("/admins") && !authStore.isAdmin ){
        showInfoAlert("권한 부족", "관리자 권한만 접근 할 수 있습니다.")
        return { path: '/users', query: { redirect: to.fullPath } }; // 리다이렉트 설정
    }

    return true;
})

export default router