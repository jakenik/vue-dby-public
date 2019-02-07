<script>
export default {
  methods: {
    onClickRequest () {
      this.$request.login(
        { 
          data:{}, 
          succ(res){
            let token = res.token
          }, fail(res){

          } 
        }
      )
    },
    onClickRequestToken() {
      this.$request.getToken(
        { 
          data:{}, 
          succ(res){
            let token = res.token
          }, fail(res){

          } 
        }
      )
    },
    onClickCheckVisitor() {
      this.$request.checkVisitor(
        { 
          token: 'wangjiahui',
          data:{}, 
          succ(res){
            let token = res.token
          }, fail(res){

          } 
        }
      )
    },
    onClickHttpRequest() {
      this.$request.httpRequest(
        {
          path: '/dome',
          header: {},
          data: {},
          method: 'POST',
          succ:(res)=> {
            this.$toast('请求成功')
          },
          fail:(res)=> {
            this.$toast('请求失败')
          },
          baseURL:this.$env.apiH5,
          noToken: true
        }
      )
    }
  }
}
</script>
## axios请求封装
```javascript
  import { Request } from 'dby-base'
  Vue.use(Request)
  // 访问 this.$request
```
#### login登录请求
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickRequest">点击发起登录请求</base-button>
</template>
<script>
export default {
  methods: {
    onClickRequest () {
      // 登录接口需要首次进入
      this.$request.login( // 不管请求多少次只会发起一次请求 等请求回来后就会自动回调
        { 
          data:{}, 
          succ(res){
            let token = res.token
          }, fail(res){

          } 
        }
      )
    }
  }
}
</script>
```
:::
#### getToken获得token
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickRequestToken">点击发起token请求</base-button>
</template>
<script>
export default {
  methods: {
    onClickRequestToken() {
      // 获取token 
      // 按照规则是：
      // 1.当前url有token就用url的 
      // 2.当前缓存是否有token有用缓存的
      // 3.当前缓存url是否有code 有去登录
      // 4.当前本地有没有token 有去检查token 然后再返回
      this.$request.getToken( 
        { 
          data:{}, 
          succ(res){
            let token = res.token
          }, fail(res){

          } 
        }
      )
    }
  }
}
</script>
```
:::

#### checkVisitor检查token
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickCheckVisitor">检测token请求</base-button>
</template>
<script>
export default {
  methods: {
    onClickCheckVisitor() {
      this.$request.checkVisitor(
        { 
          token: 'wangjiahui',
          data:{}, 
          succ(res){
            let token = res.token
          }, fail(res){

          } 
        }
      )
    }
  }
}
</script>
```
:::

#### httpRequest发起请求
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickHttpRequest">发起请求</base-button>
</template>
<script>
export default {
  methods: {
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
    onClickHttpRequest() {
      this.$request.httpRequest(
        {
          path: '/dome',
          header: {},
          data: {},
          method: 'POST',
          succ:(res)=> {
            this.$toast('请求成功')
          },
          fail:(res)=> {
            this.$toast('请求失败')
          },
          baseURL:this.$env.apiH5,
          noToken: true
        }
      )
    }
  }
}
</script>
```
:::
