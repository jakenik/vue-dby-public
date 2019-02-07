<script>
export default {
  methods: {
    onClickConnectSocket () {
      this.$webSocket.connectSocket ({ url: this.$env.apiH5Wss + this.$request.token, succ(){}, fail(){} })
    },
    onClickWebsocketInit() {
      this.$webSocket.websocketInit()
    },
    onClickWebsocketExit() {
      this.$webSocket.websocketExit()
    },
    onClickWebsocketSendMessage() {
      this.$webSocket.websocketSendMessage({msgtype:'xx', msgdata: {xx:'xx'}, msgFrom: 'miniprogram'})
    }
  }
}
</script>
## webSocket封装
```javascript
  import { SocketApi } from 'dby-base'
  Vue.use(SocketApi) // 这边因为WebSocket是原生名称 怕起冲突改为SocketApi
  // 访问 this.$webSocket
```
#### connectSocket 开启一个连接
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickConnectSocket">点击开启一个连接</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * @param {*} { url, succ, fail }
     * @param {是开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名} { url }
     * @param {否接口调用成功的回调函数} { succ }
     * @param {否接口调用失败的回调函数} { fail }
     * @returns
     */
    onClickConnectSocket () {
      this.$webSocket.connectSocket ({ url: this.$env.apiH5Wss + this.$request.token, succ(){}, fail(){} })
    },
  }
}
</script>
```
:::
#### 其他小方法不在赘述自行查看
```javascript
/**
 * 通过 WebSocket 连接发送数据
 */
sendSocketMessage ({data}) {}
/**
 * 关闭 WebSocket 连接。
 */
closeSocket () {}
/**
 * 监听WebSocket连接打开事件。
 */
onSocketOpen (callback) {}
/**
 * 监听WebSocket接受到服务器的消息事件。
 */
onSocketMessage (callback) {}
/**
 * 监听WebSocket关闭
 */
onSocketClose (callback) {}
/**
 * 监听WebSocket错误。
 */
onSocketError (callback) {}
```
#### websocketInit 初始化一个websocket
默认之存在一个websocket链接
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWebsocketInit">初始化一个websocket</base-button>
</template>
<script>
export default {
  methods: {
    onClickWebsocketInit() {
      this.$webSocket.websocketInit()
    }
  }
}
</script>
```
:::
#### 这边这两个是添加和删除websocket监听回调 也就是消息接收后的回调
```javascript
  websocketRegisterHandler (msgtype, handler) { //msgtype事件类型 handler事件接收回调
  }
  websocketUnregisterHandler (msgtype) { // 删除当前的所以回调监听
  }
```
#### websocketExit 退出连接
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWebsocketExit">退出连接</base-button>
</template>
<script>
export default {
  methods: {
    onClickWebsocketExit() {
      this.$webSocket.websocketExit()
    }
  }
}
</script>
```
:::
#### websocketSendMessage 发送消息
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWebsocketSendMessage">发送消息</base-button>
</template>
<script>
export default {
  methods: {
    onClickWebsocketSendMessage() {
      //msgtype 发送消息类型 msgdata 发送内容 msgFrom 发送给什么平台
      this.$webSocket.websocketSendMessage({msgtype:'xx', msgdata: {xx:'xx'}, msgFrom: 'miniprogram'})
    }
  }
}
</script>
```
:::