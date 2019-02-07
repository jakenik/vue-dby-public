<script>
export default {
  methods: {
    onClickWxConfig () {
      this.$wxApi.wxConfig(
        { source: '我爱多保鱼', debug: true, succ(res) { 

        }, fail(res) {

        }}
      )
    },
    onClickWxShare() {
      this.$wxApi.wxConfig(
        { source: '我爱多保鱼', debug: true, succ:(res) => {
          this.$wxApi.wxShare({ title: '你好', link: 'a', imgUrl: 'a', desc: 'a', succ(){}, fail(){} })
        }, fail(res) {

        }}
      )
    },
    onClickWxPageInitShare() {
      this.$wxApi.wxPageInitShare ({ path: this.$route.path, succ(){}, fail(){} }) 
    },
    onClickWxChooseImage() {
      this.$wxApi.wxChooseImage ({ succ() {}, fail() {} })
    },
    onClickWxUploadImage() {
      this.$wxApi.wxUploadImage ({ localIds: 'xxxxxxx', succ(){}, fail(){} }) 
    },
    onClickWxDownloadImage() {
      this.$wxApi.wxDownloadImage ({ serverId: 'xxxxx', succ(){} })
    },
    onClickWxUploadImages() {
      this.$wxApi.wxUploadImages ({ succ(){}, fail(){} })
    },
    onClickWxStartRecord() {
      this.$wxApi.wxStartRecord ({ succ(){} }) 
    },
    onClickWxStopRecord() {
      this.$wxApi.wxStopRecord ({ succ(){}, fail(){} })
    },
    onClickWxPlayVoice() {
      this.$wxApi.wxPlayVoice ({ serverId: 'x', succ(){}, fail(){} })
    },
    onClickWxStopVoice() {
      this.$wxApi.wxStopVoice ()
    }
  }
}
</script>
## 微信JSSDK封装
必须首先引入jssdk 不然会报错 当前没有集成 需要自行引入
```javascript
  index.html
  <script src="../static/jssdk/jweixin-1.4.0.js"></script>
  main.js
  import { WxApi } from 'dby-base'
  Vue.use(WxApi)
  // 访问 this.$wxApi
```
#### wxConfig 微信初始化
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxConfig">点击微信初始化</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * 初始化微信配置
     * @param {来源，JS接口列表（默认全部），开启调试模式（默认关闭）} {source, jsApiList, debug, succ, fail}
     * 会直接发起微信授权的请求 等后台返回签名 然后进行微信授权 只能在微信环境下才能生效！
     */
    onClickWxConfig () {
      this.$wxApi.wxConfig(
        { source: '我爱多保鱼', debug: true, succ(res) { //source目前有我爱多保鱼和 多保鱼服务号

        }, fail(res) {

        }}
      )
    }
  }
}
</script>
```
:::
#### wxShare 微信初始化分享
该分享必须要在微信初始化调用  建议每个页面都进行初始化
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxShare">点击微信初始化分享</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * 微信分享
     * @param {分享标题} title
     * @param {分享链接} link
     * @param {分享图标} imgUrl
     * @param {分享描述} desc
     */
    onClickWxShare() {
      this.$wxApi.wxConfig(
        { source: '我爱多保鱼', debug: true, succ:(res) => {
          this.$wxApi.wxShare({ title: '你好', link: 'a', imgUrl: 'a', desc: 'a', succ(){}, fail(){} })
        }, fail(res) {

        }}
      )
    }
  }
}
</script>
```
:::
#### wxPageInitShare 微信初始化分享配置
该接口是对当前的微信分享进行进一步封装 达到更具当前路由可以从后台的hash表上查到当前对应的页面配置
这个建议在路由守卫或者是路由监听中调取 每次页面跳转时候调用
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxPageInitShare">页面初始化分享配置</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * 页面初始化分享配置
     * @param {route地址} { path, succ, fail }
     */
    onClickWxPageInitShare() {
      this.$wxApi.wxPageInitShare ({ path: this.$route.path, succ(){}, fail(){} }) 
    }
  }
}
</script>
```
:::
#### wxChooseImage 拍照或从手机相册中选图接口
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxChooseImage">点击调用拍照</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * 拍照或从手机相册中选图接口
     * @param {张数,原图还是压缩图,相册还是相机} { count, sizeType, sourceType, succ, fail }
     */
    onClickWxChooseImage() {
      this.$wxApi.wxChooseImage ({ succ() {}, fail() {} })
    }
  }
}
</script>
```
:::
#### wxUploadImage 上传图片
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxUploadImage">上传图片</base-button>
</template>
<script>
export default {
  /**
   * 上传图片
   * @param {localId数组} { localIds, succ, fail }
   */
  methods: {
    onClickWxUploadImage() {
      this.$wxApi.wxUploadImage ({ localIds: 'xxxxxxx', succ(){}, fail(){} }) 
    }
  }
}
</script>
```
:::
#### wxDownloadImage 下载图片
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxDownloadImage">下载图片</base-button>
</template>
<script>
export default {
  // serverId 需要下载的图片的服务器端ID，由uploadImage接口获得
  methods: {
    onClickWxDownloadImage() {
      this.$wxApi.wxDownloadImage ({ serverId: 'xxxxx', succ(){} })
    }
  }
}
</script>
```
:::
#### wxUploadImages 打开相机后图片上传
调用打开相册然后上传图片然后返回图片的base64数据 {！！！这个是整个流程}
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxUploadImages">打开相册然后上传图片</base-button>
</template>
<script>
export default {
  methods: {
    onClickWxUploadImages() {
      this.$wxApi.wxUploadImages ({ succ(){}, fail(){} })
    }
  }
}
</script>
```
:::
#### wxStartRecord 开始录音
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxStartRecord">开始录音</base-button>
</template>
<script>
export default {
  methods: {
    onClickWxStartRecord() {
      this.$wxApi.wxStartRecord ({ succ(){} }) 
    }
  }
}
</script>
```
:::
#### wxStopRecord 停止录音接口
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxStopRecord">停止录音</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * 停止录音接口
     * @param {阻塞上传, 最小时间 默认1秒} { uploadOff, minTime, succ, fail }
     */
    onClickWxStopRecord() {
      this.$wxApi.wxStopRecord ({ succ(res){
        // 返回音频的服务器端ID
      }, fail(){} })
    }
  }
}
</script>
```
:::
#### wxPlayVoice 播放语音
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxPlayVoice">播放语音</base-button>
</template>
<script>
export default {
  methods: {
    /**
     * 点击播放语音 serverId,需要下载的音频的服务器端ID，由uploadVoice接口获得
     */
    onClickWxPlayVoice() {
      this.$wxApi.wxPlayVoice ({ serverId: 'x', succ(){}, fail(){} })
    }
  }
}
</script>
```
:::
#### wxPlayVoice 停止播放
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickWxStopVoice">停止播放</base-button>
</template>
<script>
export default {
  methods: {
    onClickWxStopVoice() { //自动停止当前播放
      this.$wxApi.wxStopVoice ()
    }
  }
}
</script>
```
:::