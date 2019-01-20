/*
 * @Author: jake
 * @Date: 2019-01-20 11:54:48
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-20 21:30:00
 * 微信JSSDK封装
 */
// import $logger from '../../extend/logger'
const wx = window.wx

const WxApi = class WxApi {
  constructor () {
    this.data = { ...this.data, ...this.subdata() }
  }
  subdata () {
    return {}
  }
  /**
   * 初始化微信
   * @param {分享标题} title
   * @param {分享链接} link
   * @param {分享图标} imgUrl
   * @param {分享描述} desc
   * @param {需要使用的JS接口列表} jsApiList
   */
  apiConfig ({title, link, imgUrl, desc, jsApiList, appId, debug, success, fail}) {
    const hSucc = res => {
      const data = res.data.data
      const nonceStr = data.nonceStr
      const signature = data.signature
      const timestamp = data.timestamp
      if (!debug) debug = false
      wx.config({
        debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: title.timeline, // 分享标题
          link: link.timeline, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl.timeline, // 分享图标
          success: function () {
            success({
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
          title: title.appMessage, // 分享标题
          desc: desc.appMessage, // 分享描述
          link: link.appMessage, // 分享链接，该链接域名必须与当前企业的可信域名一致
          imgUrl: imgUrl.appMessage, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            success({
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
          title: title.qq, // 分享标题
          desc: desc.qq, // 分享描述
          link: link.qq, // 分享链接
          imgUrl: imgUrl.qq, // 分享图标
          success: function () {
            success({
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
          title: title.weiBo, // 分享标题
          desc: desc.weiBo, // 分享描述
          link: link.weiBo, // 分享链接
          imgUrl: imgUrl.weiBo, // 分享图标
          success: function () {
            success({
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
          title: title.qZone, // 分享标题
          desc: desc.qZone, // 分享描述
          link: link.qZone, // 分享链接
          imgUrl: imgUrl.qZone, // 分享图标
          success: function () {
            success({
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
      })
    }
    const hFail = res => {
      fail(res)
    }
    this.httpRequest(
      '/weixin/serviceAccounts/getSignature',
      {},
      { url: location.href },
      'POST',
      hSucc,
      hFail,
      true
    )
  }
}

export default new WxApi()
