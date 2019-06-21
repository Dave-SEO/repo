const toString = Object.prototype.toString
export function isDate(val:any):val is Date{
    return toString.call(val) === '[object Date]'
}
export function isObject (val:any):val is Object{
    return toString.call(val) === 'object'
}
export function isPlainObject(data: any):data is Object{
    return toString.call(data) === '[object Object]'
}
