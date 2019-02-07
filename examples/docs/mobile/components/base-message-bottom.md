<script>
export default {
  data () {
    return {
      status: '没点'
    }
  },
  methods: {
    onChangeMessage (res) {
      this.status = res.text
    }
  }
}
</script>
## base-message-bottom
介绍base-message-bottom的使用
#### 基础用法
:::demo
``` html
<template>
  <div>
    <base-button @click="$refs.bottomModal.open()">点击弹出底部弹窗 当前点击了{{status}}</base-button>
    <base-message-bottom ref="bottomModal" @change="onChangeMessage">
      <div>你好</div>
      <div>我是插槽</div>
    </base-message-bottom>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: '没点'
    }
  },
  methods: {
    onChangeMessage (res) {
      this.status = res.text
    }
  }
}
</script>
```
:::
