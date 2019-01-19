import axios from 'axios'
import { $getUrlData } from '../../extend/helper'
import env from '../../env'
axios.create({
  headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf8' }
})
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  return data
}, err => {
  let errMessage = {
    504: '服务器出错',
    404: '服务器接口暂无',
    403: '权限不足,请联系管理员!',
    401: '登录次数过多！请稍后再试'
  }
  let message = errMessage[err.response.status]
  message ? err.message = message : err.message = '未知错误!'
  return Promise.resolve(err)
})
const Request = class request {
  /**
   * 用于http请求
   * @param {*} { path, header, data, method, succ, fail, baseURL, clog }
   * @param path当前地址
   * @param header请求头
   * @param data 参数
   * @param method 请求方式
   * @param succ 成功
   * @param fail 失败
   * @param baseURL 请求环境
   * @param noToken 需不需要携带token默认需要
   */
  httpRequest ({ path, header, data, method, succ, fail, baseURL, noToken }) {
    method = method.toUpperCase()
    let encodeData = this.encode(data)
    if (method === 'GET') {
      path += '?'
      if (!noToken && this.token) path += 'token=' + this.token + '&'
      path = path + encodeData
    } else {
      if (!noToken && this.token)data.token = this.token
    }
    axios({
      method: method,
      url: path,
      data: data,
      header: header,
      baseURL: baseURL,
      transformRequest: [() => {
        return encodeData
      }]
    })
      .then(res => {
        if (res.data.succ) {
          succ(res)
        } else {
          fail(res)
        }
      })
      .catch(function (res) {
        fail(res)
      })
  }
  encode (data) {
    let encodeData = ''
    if (data && typeof data === 'object' && !data.length) {
      for (let i in data) {
        encodeData += i + '='
        if (typeof data[i] === 'object') {
          encodeData += encodeURIComponent(JSON.stringify(data[i])) + '&'
        } else {
          encodeData += encodeURIComponent(data[i]) + '&'
        }
      }
    }
    return encodeData
  }
  /**
   *登陆
   * @param {*} {data, succ, fail}
   * @param data 参数
   * @param succ 成功
   * @param fail 失败
   */
  login ({ data, succ, fail }) {
    data.code = $getUrlData().code
    let cSucc = res => {
      let token = res.data.token
      this.token = token
      window.localStorage.setItem('token', token)
      succ(res.data)
    }
    let cFail = res => {
      fail(res)
    }
    this.httpRequest({ path: '/weixin/serviceAccounts/authorizationLogin', data, method: 'post', succ: cSucc, fail: cFail, baseURL: env.httpRoute })
  }
  /**
   * 获取token
   * @param {*} {data, succ, fail}
   * @param data 参数
   * @param succ 成功
   * @param fail 失败
   */
  getToken ({
    data,
    succ,
    fail
  }) {
    const getUrlData = $getUrlData()
    const urlToken = getUrlData.token
    if (urlToken) {
      this.token = urlToken
      succ({ token: urlToken })
      return urlToken
    } else if (this.token) {
      succ({ token: this.token })
      return this.token
    } else if (getUrlData.code) {
      this.login({
        data,
        succ,
        fail
      })
    } else {
      const storeToken = window.localStorage.getItem('token')
      this.checkVisitor({token: storeToken, data, succ, fail})
    }
  }
  /**
   * 检测token是否过期 过期就配送一个游客token
   * @param {*} {data, succ, fail, token}
   * @param data 参数
   * @param succ 成功
   * @param fail 失败
   * @param token token
   */
  checkVisitor ({ token, data, succ, fail }) {
    data.token = token
    let cSucc = res => {
      let token = res.data.token
      this.token = token
      window.localStorage.setItem('token', token)
      succ(res.data)
    }
    let cFail = res => {
      fail(res)
    }
    this.httpRequest({ path: '/user/registerAsVisitor', data, method: 'post', succ: cSucc, fail: cFail, baseURL: env.httpRoute })
  }
  addRequestWait (key, value) {
    // 添加请求历史
    if (!key || !value) return false
    if (!this.requestWait[key]) {
      this.requestWait[key] = []
    } else {
      for (let i = 0; i < this.requestWait[key].length; i++) {
        const curValue = this.requestWait[key][i]
        if (value === curValue) {
          return false
        }
      }
    }
    this.requestWait[key].push(value)
    return true
  }

  removeRequestWait (key, value) {
    // 删除请求历史
    if (this.requestWait[key].length === 0) return false
    for (let i = 0; i < this.requestWait[key].length; i++) {
      const curValue = this.requestWait[key][i]
      const curIndex = i
      if (value === curValue) {
        this.requestWait[key].splice(curIndex, 1)
        return true
      }
    }
  }
}
export default new Request()
