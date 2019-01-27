/*
 * @Author: jake
 * @Date: 2019-01-20 11:53:58
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-26 15:40:12
 * 请求封装
 */

import axios from 'axios'
import { getUrlData } from '../../extend/helper'
import env from '../../env'
import errorRequset from '../../extend/errorRequset'
axios.create({
  headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf8' }
})
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.resolve(err)
  }
)
axios.interceptors.response.use(
  data => {
    return data
  },
  err => {
    let errMessage = {
      504: '服务器出错',
      404: '服务器接口暂无',
      403: '权限不足,请联系管理员!',
      401: '登录次数过多！请稍后再试'
    }
    let message = errMessage[err.response.status]
    message ? (err.message = message) : (err.message = '未知错误!')
    return Promise.resolve(err)
  }
)
const Request = class request {
  constructor () {
    this.requestWait = {}
  }
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
  httpRequest ({
    path,
    header = {},
    data = {},
    method,
    succ,
    fail,
    baseURL,
    noToken,
    notError
  }) {
    method = method.toUpperCase()
    let encodeData
    if (method === 'GET') {
      encodeData = this.encode(data)
      path += '?'
      if (!noToken && this.token) path += 'token=' + this.token + '&'
      path = path + encodeData
    } else {
      if (!noToken && this.token) data.token = this.token
      encodeData = this.encode(data)
    }

    axios({
      method: method,
      url: path,
      data: data,
      header: header,
      baseURL: baseURL,
      transformRequest: [
        () => {
          return encodeData
        }
      ]
    })
      .then(res => {
        if (res.data.succ || res.data.dbyData) {
          try {
            succ(res)
          } catch (error) {
            errorRequset({
              error,
              errorHttpSrc: baseURL + path,
              errorHttpData: JSON.stringify(data),
              callBackError: true
            })
          }
        } else {
          fail(res)
          if (!notError) {
            errorRequset({
              error: JSON.stringify(res),
              errorHttpSrc: baseURL + path,
              errorHttpData: JSON.stringify(data)
            })
          }
        }
      })
      .catch(function (res) {
        fail(res)
        if (!notError) {
          errorRequset({
            error: JSON.stringify(res),
            errorHttpSrc: baseURL + path,
            errorHttpData: JSON.stringify(data)
          })
        }
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
  login ({ data = {}, succ, fail, notError }) {
    data.code = getUrlData().code
    let path = '/weixin/serviceAccounts/authorizationLogin'
    let cSucc = res => {
      let token = res.data.token
      this.token = token
      window.localStorage.setItem('token', token)
      this.httpUsr(path, res.data, 'succ')
    }
    let cFail = res => {
      this.httpUsr(path, res, 'fail')
    }
    if (this.httpSave(path, { succ, fail })) return
    this.httpRequest({
      path: path,
      data,
      method: 'post',
      succ: cSucc,
      fail: cFail,
      baseURL: env.apiH5,
      notError
    })
  }
  /**
   * 获取token
   * @param {*} {data, succ, fail}
   * @param data 参数
   * @param succ 成功
   * @param fail 失败
   */
  getToken ({ data = {}, succ, fail, notError }) {
    const urlToken = getUrlData().token
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
        fail,
        notError
      })
    } else {
      const storeToken = window.localStorage.getItem('token')
      this.checkVisitor({ token: storeToken, data, succ, fail, notError })
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
  checkVisitor ({ token, data = {}, succ, fail, notError }) {
    data.token = token
    let path = '/user/registerAsVisitor'
    let cSucc = res => {
      let token = res.data.token
      this.token = token
      window.localStorage.setItem('token', token)
      this.httpUsr(path, res.data, 'succ')
    }
    let cFail = res => {
      this.httpUsr(path, res, 'fail')
    }
    if (!this.httpSave(path, { succ, fail })) return
    this.httpRequest({
      path: path,
      data,
      method: 'post',
      succ: cSucc,
      fail: cFail,
      baseURL: env.apiH5,
      notError
    })
  }

  httpSave (path, callBack) {
    let first = false
    if (!path || !callBack) return first
    if (!this.requestWait[path]) {
      this.requestWait[path] = []
      first = true
    } else {
      first = false
    }
    this.requestWait[path].push(callBack)
    return first
  }
  httpUsr (path, res, key) {
    if (!path) return false
    for (let i = 0; i < this.requestWait[path].length; i++) {
      const val = this.requestWait[path][i][key]
      val(res)
    }
    delete this.requestWait[path]
  }
}
export default new Request()
