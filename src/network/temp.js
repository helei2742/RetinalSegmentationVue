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


/**
 * 获取上传的图片路径
 * @returns {AxiosPromise}
 */
export function getSrcImgURLNetwork(idNumber) {
    return request({
        url: '/init/getSrcImgURL',
        method: 'post',
        headers: {
            IdNumber: idNumber
        }
    })
}

/**
 * 临时用户发起分割处理图像请求
 * @param idNumber
 * @param srcImgPath
 * @returns {AxiosPromise}
 */
export function tempSegmentationNetwork(idNumber, srcImgPath) {
    return request({
        url: '/init/tempSegmentation',
        method: 'post',
        params:{
          srcImgPath
        },
        headers: {
            IdNumber: idNumber
        }
    })
}

/**
 * 查看是否具有分割结果
 * @param idNumber
 * @param srcImgPath
 * @returns {AxiosPromise}
 */
export function isHaveSegmentationNetwork(idNumber, srcImgPath) {
    return request({
        url: '/init/isHaveSegmentation',
        method: 'post',
        params:{
            srcImgPath
        },
        headers: {
            IdNumber: idNumber
        }
    })
}
