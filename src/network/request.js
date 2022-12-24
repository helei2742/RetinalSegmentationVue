import axios from 'axios'
import {REQUESTAPIURL} from "@/config";
import {getCookie} from "@/util/cookie";
//java -jar F:\QQdownload\scsp-0.0.1-SNAPSHOT.jar
axios.defaults.withCredentials = true

/**
 *
 *
 * 如果是formdata参数，请在请求参数再加上
 *         headers: {
 *             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 *         },
 *         // 在请求之前对data传参进行格式转换
 *         transformRequest: [function(data) {
 *             data = Qs.stringify(data)
 *             return data
 *         }]
 *
 *
 */

/**
 * 网络请求方法
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {

    let baseURL = REQUESTAPIURL

    const instance = axios.create({
        headers: {"Authorization": getCookie('token')},
        baseURL: baseURL,
        timeout: 30000,
        contentType: "application/json; charset=utf-8",
        withCredentials: true
    })

    /*
      拦截器，只返回请求的data
    */
    instance.interceptors.response.use(
        (res) => {
            return res.data
        },
        (error) => {
            console.log(error)
            if (error.response !== null && 500 === error.response.status) {
                window.open(baseURL + '/error')
            }
        })
    return instance(config)
}
