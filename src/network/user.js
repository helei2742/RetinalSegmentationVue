import {request} from "./request";
import {getCookie} from "@/util/cookie";
import {USER_TOKEN} from "@/config";

let USERTOKEN = null
let getUserToken = ()=> {
    if(USERTOKEN === null){
        let token = getCookie(USER_TOKEN)
        if (token !== null && token !== undefined && token.length > 0) {
            USERTOKEN = token
            return token
        }
    }else {
        return USERTOKEN
    }
}

/**
 * 获取用户登陆验证码
 * @param username
 * @returns {AxiosPromise}
 */
export function getCheckCodeNetwork(username) {
    return request({
        url: '/user/validCode',
        method: 'get',
        responseType:'blob',
        params: {
            username
        }
    })
}

/**
 * 登陆网络请求，
      form: {
        username: '',
        password: '',
        checkCode: ''
      },
 * @param form
 * @returns {AxiosPromise}
 */
export function loginNetwork(form){
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username: form.username,
            password: form.password,
            checkCode: form.checkCode
        }
    })
}

/**
 * 根据本地保存的token验证用户登陆状态
 * @param token
 * @returns {AxiosPromise}
 */
export function validLoginUser() {
    return request({
        url: '/user/noPasswordValid',
        method: 'post',
        headers: {
            userToken: getUserToken()
        }
    })
}

/**
 * 用户注册
 * @param user
 *          let user = {
            username: '',
            password: '',
            email: ''
          }
 */
export function registerNetwork(user) {
    return request({
        url: '/user/register',
        method: 'post',
        data: user
    })
}

/**
 * 修改密码
 * @param form {
 *     newPwd: '',
 *     oldPwd: ''.
 *     confirmPwd: '',
 *     uid: 1231231233123
 * }
 * @returns {AxiosPromise}
 */
export function alterPasswordNetwork(form) {
    return request({
        url: '/user/alterPassword',
        method: 'post',
        data: form,
        headers: {
            userToken: getUserToken()
        }
    })
}

/**
 * 获取用户页面展示的数据
 * @returns {AxiosPromise}
 */
export function queryUserInfoNetwork() {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        headers: {
            userToken: getUserToken()
        }
    })
}

/**
 * 上传图片
 * @param fileForm
 * @returns {AxiosPromise}
 */
export function userUploadSrcImageNetwork(fileForm, uploadProgressEvent){
    return request({
        url: '/user/uploadSrcImage',
        method: 'post',
        data:fileForm,
        onUploadProgress: uploadProgressEvent,
        headers:{
            userToken: getUserToken()
        }
    })
}

/**
 * 获取用户上传记录列表
 * @param userId
 * @param state 记录状态
 * @param page
 * @param size
 * @returns {AxiosPromise}
 */
export function getUserImageListNetwork(userId, state, page, size) {
    return request({
        url:'/user/getUserImageList',
        method: 'post',
        data: {
            userId,
            state,
            page,
            size
        },
        headers:{
            userToken: getUserToken()
        }
    })
}

/**
 * 根据id切割图片
 * @param recordId
 * @returns {AxiosPromise}
 */
export function imageSegmentationNetwork(recordId){
    return request({
        url:'/user/imgSegmentation',
        method: 'post',
        params: {
            recordId
        },
        headers:{
            userToken: getUserToken()
        }
    })
}

/**
 * 检测可能的病灶
 * @param srcPath
 * @returns {AxiosPromise}
 */
export function imageDetectionNetwork(srcPath) {
    return request({
        url: '/user/imgDetection',
        method: 'post',
        params: {
            path: srcPath
        },
        responseType:'blob',
        headers:{
            userToken: getUserToken()
        }
    })
}

/**
 * 将分割出的血管勾勒到原图上
 * @param recordId
 * @returns {AxiosPromise}
 */
export function imageCoincideNetwork(recordId) {
    return request({
        url: '/user/imgCoincide',
        method: 'post',
        params: {
            recordId
        },
        responseType:'blob',
        headers:{
            userToken: getUserToken()
        }
    })
}

/**
 * 删除用户记录网络请求
 * @param recordId
 * @returns {AxiosPromise}
 */
export function deleteRecordNetwork(recordId) {
    return request({
        url: '/userUploadRecord/deleteUploadRecord',
        method: 'post',
        data: {
            recordId
        },
        headers: {
            userToken: getUserToken()
        }
    })
}

