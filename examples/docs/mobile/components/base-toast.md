<script>
export default {
  methods: {
    onClickToast () {
      this.$toast('提示信息');
    }
  }
}
</script>
#### 引入 
```javascript
import { Toast } from 'dby-base';
Vue.use(Toast)
```
#### 例子
##### 基本用法
```javascript
this.$toast('提示信息');
Toast.open('提示信息'); 
```
:::demo
``` html
<template>
  <base-button @click="onClickToast">点击弹出</base-button>
</template>
<script>
export default {
  methods: {
    onClickToast () {
      this.$toast('提示信息');
    }
  }
}
</script>
```
:::
