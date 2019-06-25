export interface AxiosRequestConfig  {
    url:string
    data?:any
    params?:any
    method?: string,
    headers?: any,
    responseType?:XMLHttpRequestResponseType,
    timeout?: number
}

export interface AxiosResponse {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: AxiosRequestConfig,
    request: any

}
export interface AxiosPromise extends Promise<AxiosResponse>{

}