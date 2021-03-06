
import {AxiosRequestConfig,AxiosPromise, AxiosResponse} from './type'
import xhr from './xhr'
import {buildURL} from './helpers/url'
import {transformRequest,transformResponse} from './helpers/data'
import { processHeaders} from './helpers/headers'
export default function axios(config: AxiosRequestConfig): AxiosPromise{
    processConfig(config)
    return xhr(config).then(res =>{
        return transformResponseData(res)
    })
}
function processConfig (config:AxiosRequestConfig):void{
        config.url = transformUrl(config)
        config.headers = transformheader(config)
        config.data = transformRequestData(config)
}
function transformUrl (config:AxiosRequestConfig): string{
    let {url, params} = config
    return  buildURL(url, params)
}
function transformRequestData (config: AxiosRequestConfig):any{
 return transformRequest(config.data)
}
function transformheader(config:AxiosRequestConfig):any{
    let {headers = {}, data}  = config
   return processHeaders(headers, data)
}
function transformResponseData(res:AxiosResponse):AxiosResponse{
    res.data = transformResponse(res.data)
    return res
}