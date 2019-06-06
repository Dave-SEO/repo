
import {AxiosRequestConfig} from './type'
function xhr(config:AxiosRequestConfig){
   let request = new XMLHttpRequest()
   let {url, data = null,params,method = 'get'} = config
   request.open(method.toUpperCase(),url,true)
   request.send(data)
}
export default xhr