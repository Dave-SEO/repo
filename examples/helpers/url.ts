import {isDate,isObject} from './util'
function encode(val:string):string{
    return encodeURIComponent(val)
            .replace(/%40/g, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
export function buildURL(url:string,params?:any){
    // 如果params不存在，直接返回url
    if(!params){
        return url
    }
    // 如果存在  params = {foo:[],too:1,obj:{},date:'2019-09', zifu:'@+'}
    // 参数变为数组用join('&')分隔
    const parts: string[] = []
   Object.keys(params).forEach(key =>{
       // 获取到值
       let val = params[key]
       if(val === null || typeof val === 'undefined'){
            return
       }
       let values: string[]
       // 如果val是数组
       if(Array.isArray(val)){
            values = val
            key+= '[]'
       }else{
           // 不是数组就是字符串
          values = [val]
       }
       values.forEach((val)=>{
            if(isDate(val)){
                val = val.toISOString()
            }else if(isObject(val)){
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)} = ${encode(val)}`)
       })
   })
}