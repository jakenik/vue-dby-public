## 全局错误捕获
当前捕获到的错误会反馈到钉钉前端群中， 也会反馈到Log上。通知到钉钉群中，只会在本地没有NODE_ENV_DEVELOPMENT === true 才会通知 也就是开发环境下不通知
```javascript
  import { ErrorHandler } from 'dby-base'
  Vue.use(ErrorHandler)
  // 访问 this.$errorRequset
```
