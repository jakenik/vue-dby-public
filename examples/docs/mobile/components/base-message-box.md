<script>
export default {
  methods: {
    onClickMessageBox () {
      this.$messageBox({
        cancelText: '取消3',
        confirmText: '确定4',
        messageContent: {
          title: '标题5',
          content: '表哦提666'
        },
        succ:() => {
          this.$logger.log(1);
        },
        fail:()=>{
          this.$logger.log(0);
        }
      })
    }
  }
}
</script>
## base-message-box
介绍base-message-box的使用
#### 基础用法
:::demo
``` html
<template>
  <div>
    <base-button @click="onClickMessageBox">点击弹出弹窗</base-button>
  </div>
</template>
<script>
export default {
  methods: {
    onClickMessageBox () {
      this.$messageBox({
        cancelText: '取消3',
        confirmText: '确定4',
        messageContent: {
          title: '标题5',
          content: '表哦提666'
        },
        succ:()=> {
          this.$logger.log(1);
        },
        fail:()=>{
          this.$logger.log(0);
        }
      })
    }
  }
}
</script>
```
:::
