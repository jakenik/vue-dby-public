/*
 * @Author: jake
 * @Date: 2019-01-20 11:54:48
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-24 17:44:44
 * 微信JSSDK封装
 */
// import $logger from '../../extend/logger'
import '../../../style/index.css'
const wx = window.wx
const Plugin = {}
Plugin.install = function (Vue) {
  class WxApi extends Vue {
    constructor () {
      super()
      if (!wx) return this.$logger.error('请引入JSSDK')
      let data = this.data()
      for (let i in data) {
        this[i] = data[i]
      }
    }
    getUrlData () {
      let url = decodeURIComponent(location.href) // 获取url中"?"符后的字串
      const index = url.indexOf('?')
      const theRequest = {}
      if (index !== -1) {
        url = url.substring(index, url.length)
        const str = url.substr(1)
        const strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    }
    data () {
      // 初始化配置
      return {
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'translateVoice',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard',
          'miniProgram',
          'getLocalImgData'
        ],
        app: {
          '我爱多保鱼': {
            appId: 'wx27ea50e1e31fcfab',
            httpSrc: '/weixin/getSignature'
          },
          '多保鱼服务号': {
            appId: 'wxba34ba61c042a5af',
            httpSrc: '/weixin/serviceAccounts/getSignature'
          }
        },
        startTime: null,
        playVoice: null
      }
    }
    /**
     * 初始化微信配置
     * @param {来源，JS接口列表（默认全部），开启调试模式（默认关闭）} {source, jsApiList, debug, succ, fail}
     * @returns
     */
    wxConfig ({ source, jsApiList, debug, succ, fail }) {
      const app = this.app
      if (!app[source]) return this.$logger.error('当前无匹配的JSSDK验证')
      if (!jsApiList) jsApiList = this.jsApiList
      let { appId, httpSrc } = app[source]
      let cSucc = res => {
        let { nonceStr, signature, timestamp } = res.data.data
        wx.config({
          debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid wxba34ba61c042a5af
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见附录1
          jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(() => {
          this.$logger.info('JSSDK初始化成功')
          succ(res)
        })
        wx.error((res) => {
          this.$logger.error('JSSDK初始化失败', res)
          fail(res)
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
      }
      let cFail = res => {
        this.$logger.error('wxConfig 出错', res)
      }
      this.$request.getToken({
        succ: () => {
          this.$request.httpRequest({
            path: httpSrc,
            data: {
              url: location.href
            },
            method: 'POST',
            succ: cSucc,
            fail: cFail,
            baseURL: this.$env.apiH5
          })
        },
        fail: res => {
          this.$logger.error('获取token出错', res)
          fail(res)
        }
      })
    }
    /**
     * 微信分享
     * @param {分享标题} title
     * @param {分享链接} link
     * @param {分享图标} imgUrl
     * @param {分享描述} desc
     */
    wxShare ({ title, link, imgUrl, desc, succ, fail }) {
      wx.onMenuShareTimeline({
        // 分享到朋友圈 即将废弃！！
        title: title.timeline, // 分享标题
        link: link.timeline, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl.timeline, // 分享图标
        success: function () {
          succ({
            on: 'onMenuShareTimeline',
            click: true
          })
        },
        cancel: function () {
          fail({
            on: 'onMenuShareTimeline',
            cancel: true
          })
        }
      })
      wx.onMenuShareAppMessage({
        // 分享给朋友 即将废弃！！
        title: title.appMessage, // 分享标题
        desc: desc.appMessage, // 分享描述
        link: link.appMessage, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: imgUrl.appMessage, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          succ({
            on: 'onMenuShareAppMessage',
            click: true
          })
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          fail({
            on: 'onMenuShareAppMessage',
            cancel: true
          })
        }
      })
      wx.onMenuShareQQ({
        // 分享到QQ 即将废弃！！
        title: title.qq, // 分享标题
        desc: desc.qq, // 分享描述
        link: link.qq, // 分享链接
        imgUrl: imgUrl.qq, // 分享图标
        success: function () {
          succ({
            on: 'onMenuShareQQ',
            click: true
          })
        },
        cancel: function () {
          fail({
            on: 'onMenuShareQQ',
            cancel: true
          })
        }
      })
      wx.onMenuShareWeibo({
        // 分享到腾讯微博
        title: title.weiBo, // 分享标题
        desc: desc.weiBo, // 分享描述
        link: link.weiBo, // 分享链接
        imgUrl: imgUrl.weiBo, // 分享图标
        success: function () {
          succ({
            on: 'onMenuShareWeibo',
            click: true
          })
        },
        cancel: function () {
          fail({
            on: 'onMenuShareWeibo',
            cancel: true
          })
        }
      })
      wx.onMenuShareQZone({
        // 分享到QQ空间
        title: title.qZone, // 分享标题
        desc: desc.qZone, // 分享描述
        link: link.qZone, // 分享链接
        imgUrl: imgUrl.qZone, // 分享图标
        success: function () {
          succ({
            on: 'onMenuShareQZone',
            click: true
          })
        },
        cancel: function () {
          fail({
            on: 'onMenuShareQZone',
            cancel: true
          })
        }
      })
    }
    /**
     * 页面初始化分享配置
     * @param {route地址} { path, succ, fail }
     */
    wxPageInitShare ({ path, succ, fail }) {
      let cSucc = res => {
        let value = res[path]
        if (!value) return fail({ errorText: '没有该页面配置' })
        let { content, imgUrl, shareUrl, title } = value
        let version = this.getUrlData().version
        if (version) {
          shareUrl = shareUrl
            .replace('<version>', version)
            .replace('<host>', this.$env.host)
        }
        let getShareText = val => {
          return {
            timeline: val,
            appMessage: val,
            qq: val,
            weiBo: val,
            qZone: val
          }
        }
        const data = {
          title: getShareText(title),
          imgUrl: getShareText(imgUrl),
          link: getShareText(shareUrl),
          desc: getShareText(content),
          succ: res => {
            succ(res)
            this.$logger.info('用户页面分享成功', res)
          },
          fail: res => {
            fail(res)
            this.$logger.error('用户页面分享取消', res)
          }
        }
        this.wxShare(data)
      }
      let cFail = res => {
        this.$logger.error('获取JSSDK页面初始化分享失败', res)
      }
      if (this.initShare) {
        cSucc(this.initShare)
      } else {
        this.$request.httpRequest({
          path: '/product/getAllPageShareWord',
          data: {},
          method: 'POST',
          succ: res => {
            this.initShare = res.data.shareWordDetail
            cSucc(this.initShare)
          },
          fail: cFail,
          baseURL: this.$env.apiH5
        })
      }
    }
    /**
     * 拍照或从手机相册中选图接口
     * @param {张数,原图还是压缩图,相册还是相机} { count, sizeType, sourceType, succ, fail }
     */
    wxChooseImage ({ count, sizeType, sourceType, succ, fail }) {
      wx.chooseImage({
        count: count || 9, // 默认9
        sizeType: sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          const localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          succ(localIds)
        },
        fail: fail
      })
    }
    /**
     * 上传图片
     * @param {localId数组} { localIds, succ, fail }
     */
    wxUploadImage ({ localIds, succ, fail }) {
      let index = 0
      try {
        const upload = localId => {
          if (localId === undefined) return
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: res => {
              const serverId = res.serverId // 返回图片的服务器端ID
              succ({ res, serverId, localId })
              setTimeout(() => {
                index++
                upload(localIds[index])
              }, 1000)
            }
          })
        }
        upload(localIds[index])
      } catch (error) {
        fail(error)
      }
    }
    wxDownloadImage ({ serverId, succ }) {
      // 下载图片
      wx.downloadImage({
        serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var localId = res.localId // 返回图片下载后的本地ID
          succ(localId)
        }
      })
    }
    /**
     * 调用打开相册然后上传图片然后返回图片的base64数据 {！！！这个是整个流程}
     */
    wxUploadImages ({ succ, fail }) {
      this.wxChooseImage({
        succ: localIds => {
          this.wxUploadImage({
            localIds,
            succ: callback => {
              // this.log(res, serverId, localId)
              const localId = callback.localId
              wx.getLocalImgData({
                localId: localId, // 图片的localID
                success: res => {
                  const base = res.localData // localData是图片的base64数据，可以用img标签显示
                  succ({ ...callback, base })
                }
              })
            },
            fail: fail
          })
        },
        fail: fail
      })
    }
    /**
     * 开始录音
     */
    wxStartRecord ({ succ }) {
      const timestamp = (new Date()).getTime()
      this.startTime = timestamp
      wx.startRecord()
      succ(timestamp)
    }
    /**
     * 停止录音接口
     * @param {阻塞上传, 最小时间} { uploadOff, minTime, succ, fail }
     */
    wxStopRecord ({ uploadOff, minTime, succ, fail }) {
      const timestamp = (new Date()).getTime()
      this.endTime = timestamp
      const voiceMinTime = minTime || 1000 // 设置语音最小秒数
      const jetLag = this.endTime - this.startTime
      wx.stopRecord({
        success: (res) => {
          res['jetLag'] = jetLag
          if (uploadOff) return
          if (jetLag < voiceMinTime) {
            fail({minTime})
            this.$logger.info('录音时间不能小于' + (minTime / 1000) + '秒')
            return
          }
          const localId = res.localId
          const second = Math.round(jetLag / 1000)
          wx.uploadVoice({
            localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              const serverId = res.serverId // 返回音频的服务器端ID
              succ(serverId, localId, second)
            }
          })
        }
      })
    }
    /**
     * 点击播放语音
     */
    wxPlayVoice ({ serverId, succ, fail }) {
      try {
        wx.downloadVoice({
          serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var localId = res.localId // 返回音频的本地ID
            this.playVoice = localId
            wx.playVoice({
              localId // 需要播放的音频的本地ID，由stopRecord接口获得
            })
            wx.onVoicePlayEnd({
              success: function (res) {
                const localId = res.localId // 返回音频的本地ID
                succ(localId)
              }
            })
          }
        })
      } catch (error) {
        fail(error)
      }
    }
    /**
     * 停止播放接口
     */
    wxStopVoice () {
      wx.stopVoice({
        localId: this.playVoice // 需要停止的音频的本地ID，由stopRecord接口获得
      })
      this.playVoice = null
    }
  }
  Vue.prototype.$wxApi = new WxApi()
}

export default Plugin
