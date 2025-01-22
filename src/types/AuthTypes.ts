export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    status: string
    errorMessage?: string
    timestamp?: string
    errors?: Record<string, string> | null
    code: string | number
    errorCodeMessae: string
    data: any
    message: string
}

export interface SignupRequest {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface SignupResponse {
    status : string
    userId: string
    message: string
}

export interface ErrorResponse {
    error: string
    statusCode: number
}