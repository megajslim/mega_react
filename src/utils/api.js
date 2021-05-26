 import {assign} from 'lodash/object'
 import axios from 'axios'
 import { isEmpty, isEqual } from 'lodash/lang'

// const API_URL = 'http://localhost:8020/api'
const API_URL = 'http://cra.megastudy.net:8080/api'

 export const getUrl = (urlName) => `${API_URL}/${urlName}`
 export const getRestUrl = (urlName, urlParam) => `${API_URL}/${urlName}/${urlParam}`
 
 const timeout = { timeout: 60 * 1 * 1000 }
 const instance = axios.create({
    headers: {
      'ApiKey': 'test1234',
      'Content-Type': 'application/json',
    },
  });

const getRestApi = name => {
    return (
        instance.get(getUrl(name), timeout).catch((error) => {
        })
    )
}
const deleteRestApi= (name, Id) =>{
    return(
        instance.delete(getRestUrl(name, Id), timeout).catch((error) => {
        })
    )
}

const postRestApi = (name, params) => {
    assign(params)
    return (
        instance.post(getUrl(name), params, timeout).catch((error) => {
        })
    )
}

//요청한 API 결과에 오류를 가지고 있는지
export const hasApiServiceError = result => {
    if (isEmpty(result)) {
        return { error: true, message: '오류' }
    } else {
        if (isEqual(result.errcode, 100)) {
            //성공
            return { error: false, message: null }
        } else {
            //오류
            return { error: true, message: result.errmsg }
        }
    }
}

export const getTeamSugi = () => {
    return getRestApi('TeamSugi')
}

export const deleteTeamSugi = Id => {
    return deleteRestApi('TeamSugi', Id)
}

export const saveTeamSugi = params =>{
    return postRestApi('TeamSugi/Create', params)
}

