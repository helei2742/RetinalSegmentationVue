import {request} from "./request";

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
export function validLoginUser(token) {
    return request({
        url: '/user/noPasswordValid',
        method: 'post',
        headers: {
            userToken: token
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
