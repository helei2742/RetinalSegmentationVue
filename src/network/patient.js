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
 * 创建病人信息
 * @param patientInfo
 * @returns {AxiosPromise}
 */
export function createPatientInfoNetwork(patientInfo) {
    return request({
        url: '/patientInfo/createPatientInfo',
        data: patientInfo,
        method: 'post',
        headers: {
            userToken: getUserToken()
        }
    })
}

/**
 * 条件分页查询病人信息
 * @param query {
 *     page: 1,
 *     limit: 5,
 *     dockerId: 1,
 *     patientName: 'zhangsan',
 *     nativeArea: '123',
 *     idCard: '522228200103280816'
 *     diagnoseType: 1
 * }
 * @returns {AxiosPromise}
 */
export function pageQueryPatientInfoNetwork(query) {
    return request({
        url: '/patientInfo/pageQueryPatientInfo',
        data: query,
        method: 'post',
        headers: {
            userToken: getUserToken()
        }
    })
}

/**
 * 获取绑定码
 * @param patientId
 * @returns {AxiosPromise}
 */
export function getBindCodeNetwork(patientId, c){
    return request({
        url: '/patientInfo/getBindCode',
        params: {
            patientId,
            c
        },
        method: 'get',
        headers: {
            userToken: getUserToken()
        }
    })
}

/**
 * 绑定记录
 * @param bindForm {recordId, bindCode}
 * @returns {AxiosPromise}
 */
export function bindPatientNetwork(bindForm){
    return request({
        url: '/patientInfo/bindRecord',
        data: bindForm,
        method: 'post',
        headers: {
            userToken: getUserToken()
        }
    })
}
