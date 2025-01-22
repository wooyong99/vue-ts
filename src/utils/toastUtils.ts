import Swal from 'sweetalert2'

const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
})

export function showSuccessToast(title: string = "성공"){
    Toast.fire({
        icon: 'success',
        title
    })
}

export function showErrorToast(title: string = "에러"){
    Toast.fire({
        icon: 'error',
        title
    })
}

export function showWarningToast(title: string = "위험"){
    Toast.fire({
        icon: 'warning',
        title
    })
}

export function showInfosToast(title: string = "정보"){
    Toast.fire({
        icon: 'info',
        title
    })
}