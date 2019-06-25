
import {AxiosRequestConfig,AxiosPromise, AxiosResponse} from './type'
import {parseHeaders} from './helpers/headers'
function xhr(config:AxiosRequestConfig): AxiosPromise{
   return new Promise((resolve,reject)=>{
      let request = new XMLHttpRequest()
      let {url, data = null,params,method = 'get', headers, responseType,timeout } = config
      if(responseType){
         request.responseType = responseType
      }
      if(timeout){
         request.timeout = timeout
      }
      request.open(method.toUpperCase(),url,true)
      request.onreadystatechange = function handleLoad(){
         if(request.readyState !== 4){
            return
         }
         if(request.status === 0){
            return
         }
         const responseHeader = parseHeaders(request.getAllResponseHeaders())
         // 如果 request.responseType 的值不是 text 或者空字符串，届时访问 request.responseText 将抛出 InvalidStateError 异常。
         const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
         const response: AxiosResponse ={
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeader,
            config,
            request
         }
         handleResponse(response)
      }
      request.onerror = function(){
         reject(new Error('netWork erro'))
      }
      request.ontimeout = function(){
         reject(new Error(`Timeout of ${timeout} ms exceeded`))
      }
      function handleResponse(response:AxiosResponse):void{
         if(response.status >= 200 && response.status < 300){
            resolve(response)
         }else{
            reject(new Error(`Request failed with status code ${response.status}`))
         }
      }
      Object.keys(headers).forEach(name=>{
         if(data === null && name.toLowerCase() === 'content-type'){
         delete headers[name]
         }else{
            request.setRequestHeader(name, headers[name])
         }
      })
      request.send(data)
   })
}
export default xhr