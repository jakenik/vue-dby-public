import axios from 'axios'

axios.create({
  headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf8' }
})
const Request = class request {
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
   * 获取token
   */
  getToken (
    data,
    succ,
    fail,
    scene,
    specialFields,
    salesStaffId,
    customerSource
  ) {
    const storeToken = this.getStore('token')
    const getRequestUrl = this.getRequestUrl()
    const urlToken = getRequestUrl.token

    if (urlToken) {
      if (getRequestUrl.login === 'true') {
        this.login(getRequestUrl.code, data, succ, fail, urlToken)
      } else {
        data += 'token=' + encodeURIComponent(urlToken)
        succ(data)
        this.setStore('token', urlToken)
        this.token = urlToken
        return urlToken
      }
    } else if (this.token) {
      data += 'token=' + encodeURIComponent(this.token)
      succ(data)
      return this.token
    } else if (getRequestUrl.code) {
      const code = getRequestUrl.code
      this.login(
        code,
        data,
        succ,
        fail,
        null,
        scene,
        specialFields,
        salesStaffId,
        customerSource
      )
    } else {
      // throw new Error('token is undefined!');

      this.getTouristsUserInfo(storeToken, data, succ, fail, scene)
    }
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
   * @param clog 是否限制短时间多次请求
   */
  httpRequest ({ path, header, data, method, succ, fail, baseURL, clog }) {
    let encodeData = this.encode(data)
    if (method === 'get') {
      path = path + '?' + encodeData
    }
    axios({
      method: method,
      url: path,
      data: encodeData,
      header: header,
      baseURL: baseURL
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
    // const currentSucc = res => {
    //   method = method.toLowerCase()
    //   let host = this.host.bffRoute
    //   const requestWait = res
    //   let url = host + path
    //   if (method === 'get') {
    //     url = url + '?' + res
    //   }
    //   const be = this.addRequestWait(url, requestWait)
    //   if (clog && !be) return
    //   axios({
    //     method: method,
    //     url: url,
    //     data: res,
    //     header: header,
    //     baseURL: baseURL
    //   })
    //     .then(res => {
    //       if (res.data.succ) {
    //         this.removeRequestWait(url, requestWait)
    //         succ(res)
    //       } else {
    //         fail(res)
    //       }
    //     })
    //     .catch(function (res) {
    //       fail(res)
    //     })
    // }
    // const currentFail = res => {
    //   fail(res)
    // }
    // if (typeof data === 'object') {
    //   this.getToken(encodeData, currentSucc, currentFail)
    // } else {
    //   this.getToken(data, currentSucc, currentFail)
    // }
  }
  /**
   * 登录login
   */
  login (
    code,
    data,
    succ,
    fail,
    token,
    scene1,
    specialFields,
    salesStaffId,
    customerSource
  ) {
    const host = this.host
    const json = { code: code }
    const scene = this.getScene()
    const code1 = this.getStore('code')
    if (code1) {
      if (code1 === code) {
        var storeToken = this.getStore('token')
        if (storeToken) {
          this.getTouristsUserInfo(storeToken, data, succ, fail, scene1)
        } else {
          fail()
        }
        return
      }
    }
    this.setStore('code', code)
    if (this.scene) {
      json['scene'] = this.scene
    } else if (scene) {
      json['scene'] = scene
    } else if (scene1) {
      json['scene'] = scene1
    }
    if (specialFields) {
      json['specialFields'] = specialFields
    }
    if (salesStaffId) {
      if (!customerSource || customerSource !== '') {
        customerSource = '转介绍'
      }
      json['customer'] = JSON.stringify({
        customerSource: customerSource,
        salesStaffId: salesStaffId
      })
    }
    if (token) {
      json['token'] = token
    }
    let encodeData = ''
    for (const i in json) {
      encodeData += i + '='
      encodeData += encodeURIComponent(json[i]) + '&'
    }
    encodeData = encodeData.substring(encodeData, encodeData.length - 1)
    this.$ajax
      .post(
        host.httpRoute + '/weixin/serviceAccounts/authorizationLogin',
        encodeData
      )
      .then(res => {
        if (res.data.succ) {
          data += 'token=' + encodeURIComponent(res.data.token)
          this.setStore('token', res.data.token)
          this.token = res.data.token
          this.setStore('authorizationFig', true)
          succ(data)
        } else {
          const storeToken = this.getStore('token')
          if (storeToken) {
            this.getTouristsUserInfo(storeToken, data, succ, fail, scene1)
          } else {
            fail()
          }
        }
      })
      .catch(function (res) {
        fail(res)
      })
  }
}
export default new Request()
