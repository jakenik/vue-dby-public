/*
 * @Author: jake
 * @Date: 2019-01-24 10:25:52
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-26 16:31:50
 * websocket封装
 */
import '../../../style/index.css'
const SocketApi = {}
SocketApi.install = function (Vue) {
  class SocketApi extends Vue {
    constructor () {
      super()
      let data = this.data()
      for (let i in data) {
        this[i] = data[i]
      }
    }
    data () {
      return {
        globalData: {
          socketOpen: false,
          socketMsgQueue: [],
          socketMsgHandler: {},
          saveOptions: {},
          // 全局接收消息
          socketMsgRecv: []
        },
        wsHeartbeatInterval: 5000 // ms为单位
      }
    }
    /**
     * @param {*} { url, succ, fail }
     * @param {是开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名} { url }
     * @param {否接口调用成功的回调函数} { succ }
     * @param {否接口调用失败的回调函数} { fail }
     * @returns
     */
    connectSocket ({ url, succ, fail }) {
      if (!WebSocket) {
        return this.$logger.log('该浏览器不支持WebSocket')
      }
      const ws = new WebSocket(url)
      this.ws = ws
      switch (ws.readyState) {
        case WebSocket.CONNECTING:
          this.$logger.log('WebSocket正在连接')
          break
        case WebSocket.OPEN:
          this.$logger.log('WebSocket 连接成功')
          succ()
          break
        case WebSocket.CLOSING:
          this.$logger.log('WebSocket正在关闭')
          this.globalData.socketOpen = false
          break
        case WebSocket.CLOSED:
          this.$logger.log('WebSocket连接已经关闭，或者打开连接失败')
          this.globalData.socketOpen = false
          fail()
          break
        default:
          // this never happens
          break
      }
    }
    /**
     * 通过 WebSocket 连接发送数据
     */
    sendSocketMessage ({data}) {
      this.ws.send(data)
    }
    /**
     * 关闭 WebSocket 连接。
     */
    closeSocket () {
      this.globalData.socketOpen = false
      this.ws.close()
    }
    /**
     * 监听WebSocket连接打开事件。
     */
    onSocketOpen (callback) {
      this.ws.onopen = callback()
    }
    /**
     * 监听WebSocket接受到服务器的消息事件。
     */
    onSocketMessage (callback) {
      this.ws.onmessage = callback
    }
    /**
     * 监听WebSocket关闭
     */
    onSocketClose (callback) {
      this.ws.onclose = callback
    }
    /**
     * 监听WebSocket错误。
     */
    onSocketError (callback) {
      this.ws.onerror = callback
    }
    /**
     * WebSocket初始化
     */
    websocketInit () {
      const succ = res => {
        this.token = res.token
        this.connectSocket({
          url: this.$env.apiH5Wss + this.token,
          data: {},
          header: {},
          succ: function (res) {},
          fail: function (res) {},
          complete: function (res) {}
        })

        this.onSocketOpen(res => {
          this.globalData.socketOpen = true

          this.$logger.log('WebSocket连接已打开！')

          for (let i = 0; i < this.globalData.socketMsgQueue.length; i++) {
            const msg = this.globalData.socketMsgQueue[i]
            this.sendSocketMessage({
              data: JSON.stringify(msg)
            })
          }
          this.globalData.socketMsgQueue = []
          setTimeout(() => {
            this.websocketSendMessage('userOnline', {})
          }, 200)

          const timeoutCb = () => {
            if (this.globalData.socketOpen === false) {
              return
            }
            this.websocketSendMessage('heartbeat', {})
            setTimeout(timeoutCb, this.wsHeartbeatInterval)
          }
          setTimeout(timeoutCb, this.wsHeartbeatInterval)
        })

        this.onSocketMessage(res => {
          // this.$logger.log('收到服务器内容：' + res.data)
          if (!this.globalData.socketOpen) {
            this.closeSocket()
            return
          }
          const msg = JSON.parse(res.data)
          for (const msgtype in this.globalData.socketMsgHandler) {
            const msghandler = this.globalData.socketMsgHandler[msgtype]
            if (msghandler == null) {
              continue
            }
            msghandler(msg)
          }
        })

        this.onSocketError(res => {
          this.$logger.log('WebSocket连接打开失败，请检查！')
        })

        this.onSocketClose(res => {
          this.globalData.socketOpen = false
          this.$logger.log('WebSocket 已关闭！')
        })
      }
      const fail = res => {
        this.$logger.error('WebSocket 关闭！关闭原因 获取token出错')
      }

      this.$request.getToken({
        succ: succ,
        fail: fail
      })
    }
    /**
     * 添加和删除注入websocket的函数
     */
    websocketRegisterHandler (msgtype, handler) {
      this.globalData.socketMsgHandler[msgtype] = handler
    }
    websocketUnregisterHandler (msgtype) {
      delete this.globalData.socketMsgHandler[msgtype]
    }
    /**
     * 退出时候给后台发送
     */
    websocketExit () {
      const socketOpen = this.globalData.socketOpen
      this.$logger.log(socketOpen)
      if (!socketOpen) {
        return
      }

      this.websocketSendMessage('userOffline', this.globalData.userInfo)
      this.globalData.socketOpen = false
    }
    websocketSendMessage ({msgtype, msgdata, msgFrom}) {
      const msg = {}
      msg.from = msgFrom || 'miniprogram'
      msg.type = msgtype
      msg.data = msgdata
      msg.token = this.token
      const socketOpen = this.globalData.socketOpen
      if (socketOpen) {
        this.sendSocketMessage({
          data: JSON.stringify(msg)
        })
      }
    }
  }
  Vue.prototype.$webSocket = new SocketApi()
}

export default SocketApi
