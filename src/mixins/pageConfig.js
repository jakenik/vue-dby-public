/**
 * 页面初始化时添加页面配置
 */
const request = require('../unit/axios/index').default
const env = require('../env').default
export default {
  created () {
    let isCall = (fn) => this[fn] && typeof this[fn] === 'function'
    request.httpRequest({ path: '/page/pageViewData',
      data: {
        pageName: '/plan'
      },
      method: 'get',
      succ: (res) => {
        try {
          let data = res.data.data
          for (let key in data) {
            this[key] = data[key]
          }
          if (isCall('configSuccess') && typeof data === 'object' && !data.length) this.configSuccess(data)
          else if (isCall('configError')) this.configError({e: '当前数据出错'})
        } catch (error) {
          if (isCall('configError')) this.configError(error)
        }
      },
      fail: (res) => {
        if (isCall('configError')) this.configError(res)
      },
      baseURL: env.bffRoute
    })
  }
}
