
import {AxiosRequestConfig} from './type'
import xhr from './xhr'
import {buildURL} from './helpers/url'
import {transformRequest} from './helpers/data'
export default function axios(config: AxiosRequestConfig){
    processConfig(config)
    xhr(config)
}
function processConfig (config:AxiosRequestConfig):void{
        config.url = transformUrl(config)
        config.data = transformRequestData(config)
}
function transformUrl (config:AxiosRequestConfig): string{
    let {url, params} = config
    return  buildURL(url, params)
}
function transformRequestData (config: AxiosRequestConfig):any{
 return transformRequest(config.data)
}