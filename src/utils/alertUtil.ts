import Swal, { SweetAlertOptions } from "sweetalert2";

export function showAlert(options: SweetAlertOptions): void {
    Swal.fire(options)
}


export function showSuccessAlert(title:string="성공", text:string="작업이 성공적으로 완료되었습니다."): void {
    Swal.fire({
        icon: 'success',
        title,
        text
    })
}

export function showErrorAlert(title:string="오류", text:string="작업 중 오류가 발생했습니다."): void {
    Swal.fire({
        icon: 'error',
        title,
        text
    })
}


export function showWarningAlert(title: string = '경고', text: string = '주의가 필요합니다.'): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
    });
}
  

export function showInfoAlert(title: string = '정보', text: string = '알아두세요.'): void {
    Swal.fire({
        icon: 'info',
        title,
        text,
    });
}

export async function showConfirmAlert(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    });
    return result.isConfirmed;
  }