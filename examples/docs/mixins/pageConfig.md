## 页面配置

在目前的项目中每一个页面都需要有一个页面初始化驱动的页面配置，这样的好处是可以更灵活的适配页面的初始状态。更好的在多保鱼后台中更改页面状态
也为了增加灵活性 页面配置混入需要手动添加
```javascript
  import { PageConfig } from 'dby-base'
  <script>
    export default {
      mixins: [PageConfig],
      methods: {
        configSuccess (res) { // 页面配置调用成功 返回配置
          console.log(res)
        },
        configError (res) { // 页面配置调用失败 返回原因
          console.log(res)
        }
      }
    }
  </script>
```