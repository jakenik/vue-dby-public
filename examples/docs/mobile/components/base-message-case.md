<script>
export default {
  methods: {
    onChangeMessageCase (res) {
      this.$logger.log(res)
    }
  }
}
</script>
## base-message-case
带框弹窗
#### 基础用法
:::demo
``` html
<template>
  <div>
    <base-button @click="$refs.messageCase.open()">点击弹出弹窗</base-button>
    <base-message-case ref="messageCase" @change="onChangeMessageCase">
      <div>你好</div>
      <div>我是插槽</div>
    </base-message-case>
  </div>
</template>
<script>
export default {
  methods: {
    onChangeMessageCase (res) {
      this.$logger.log(res)
    }
  }
}
</script>
```
:::
