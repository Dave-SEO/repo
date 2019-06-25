import {isPlainObject} from './util'
function normalizeHeaderName (headers:any,normalizedName:string):void{
    if(!headers){
        return
    }
    Object.keys(headers).forEach(name=>{    
        if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()){
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}
export function processHeaders (headers: any,data:any): any{
    normalizeHeaderName(headers, 'Content-Type')
    if(isPlainObject(data)){
        if(headers && !headers['Content-Type']){
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}
// date: Mon, 24 Jun 2019 12:45:02 GMT
// etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
// connection: keep-alive
// x-powered-by: Express
// content-length: 13
// content-type: application/json; charset=utf-8
export function parseHeaders(headers:string): any{
    // 创建一个空对象，没有继承Object.prototype
    let parsed = Object.create(null)
    if(!headers){
        return parsed
    }
    headers.split('\r\n').forEach(name=>{
        let [key, val] = name.split(':')
        key = key.trim().toLowerCase()
        if(!key){
            return 
        }
        if(val){
            val.trim()
        }
        parsed[key] = val.trim()
    })
    return parsed
}