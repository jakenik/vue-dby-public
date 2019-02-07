## 环境

``` javascript
  import { Env } from 'dby-base'
  Vue.use(Env)
  // 访问 this.$env
```
目前环境是更具当前文件所处地址为开头 本地开发需要在local storage 中添加 NODE_ENV_DEVELOPMENT 为 true

目前提供的环境有以下
``` javascritp
  apiBffAdmin
  apiBff
  apiChat
  apiH5Wss
  apiH5
  res
  h5Official
  h5Userchat
  business
  htmlRoute
  local
```
如果有新的环境没有注册请在base插件上添加 也请遵守所有http 都以环境为主 （图片，请求，文件）