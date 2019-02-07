<script>
export default {
  methods: {
    onClickReponeFont () {
      this.$reponeFont.init()
    }
  }
}
</script>
## 移动端适配

当前的适配比例是 1/37.5

```javascript
  import { ReponeFont } from 'dby-base'
  // 一般都是调用一次初始化 直接 ReponeFont.init()
  Vue.use(ReponeFont)
  this.$reponeFont.init()
  // 访问 this.$reponeFont
```
#### 演示
触发init会自动引入 移动端适配的css和 js
:::demo
``` html
<template>
  <base-button color="danger" @click="onClickReponeFont">点击适配</base-button>
</template>
<script>
export default {
  methods: {
    onClickReponeFont () {
      this.$reponeFont.init()
    }
  }
}
</script>
```
:::
