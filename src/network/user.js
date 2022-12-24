import {request} from "./request";


export function loginNetwork(username, password){
    return request({
        url: '/user/login',
        params: {
            username,
            password
        }
    })
}
