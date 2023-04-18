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
 * 保存诊断记录,不传id标识新增，如修改就传id
 * @param form {{
        id: 0,
        doctorId: 0,
        recordId: 0,
        patientId:0,
        diagnoseText: ''
      }}
 */
export function saveDiagnoseNetwork(form) {
  return request({
    url: '/diagnosticRecord/uploadDiagnosticRecord',
    method: 'post',
    data: form,
    headers: {
      userToken: getUserToken()
    }
  })
}

/**
 * 根据upload recordId 查找诊断记录
 * @param recordId
 * @returns {AxiosPromise}
 */
export function queryDiagnoseByRecordIdNetwork(recordId){
  return request({
    url: '/diagnosticRecord/getByUploadRecordId',
    method: 'get',
    params: {
      recordId
    },
    headers: {
      userToken: getUserToken()
    }
  })
}