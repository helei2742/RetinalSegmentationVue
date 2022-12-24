import {request} from "@/network/request";

/**
 * 获取标识临时用户身份的idNumber
 * @returns {AxiosPromise}
 */
export function getIdNumberNetwork() {
    return request({
        url: '/init/idNumber'
    })
}

/**
 * 获取验证码
 * @param idNumber
 * @returns {AxiosPromise}
 */
export function getValidCodeNetwork(idNumber){
    return request({
        url: '/init/validCode',
        responseType:'blob',
        headers: {
            IdNumber: idNumber
        }
    })
}

/**
 * 验证验证码
 * @param idNumber
 * @param validCode
 * @returns {AxiosPromise}
 */
export function verifyValidCodeNetwork(idNumber, validCode) {
    return request({
        url: '/init/verifyValidCode',
        method: 'post',
        data:{
            'validCode': validCode
        },
        headers: {
            IdNumber: idNumber
        }
    })
}


/**
 * 上传图片文件
 * @param idNumber
 * @param file
 * @param uploadProgressEvent 上传进度回调
 * @returns {AxiosPromise}
 */
export function uploadSrcImgNetwork(idNumber, file, uploadProgressEvent) {
    return request({
        url: '/init/uploadSrcImage',
        method: 'post',
        data: file,
        onUploadProgress: uploadProgressEvent,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            IdNumber: idNumber
        }
    })
}
