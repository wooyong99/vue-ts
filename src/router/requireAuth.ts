import 'vue-router'

export {}

declare module 'vue-router' {
    interface RouteMeta {
        isAdmin ?: boolean
        requireAuth: boolean
    }
}