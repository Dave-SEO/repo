import { AxiosRequestConfig } from './types'
function xhr(config: AxiosRequestConfig) {
  const { data = null, url, methods = 'get' } = config
  const request = new XMLHttpRequest()
  request.open(methods.toUpperCase(), url, true)
  request.send(data)
}
export default xhr
