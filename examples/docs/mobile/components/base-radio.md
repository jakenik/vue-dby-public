<script>
  export default {
    data () {
      return {
        radio: '1',
        radio1: '选中且禁用'
      };
    }
  }
</script>
## Radio 单选框
#### 基础用法
:::demo
``` html
<template>
  <div>
    <base-radio v-model="radio" label="1">备选项</base-radio>
    <base-radio v-model="radio" label="2">备选项</base-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::
#### 禁用状态
单选框不可用的状态。
:::demo
``` html
<template>
  <base-radio disabled v-model="radio1" label="禁用">备选项</base-radio>
  <base-radio disabled v-model="radio1" label="选中且禁用">备选项</base-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '选中且禁用'
      };
    }
  }
</script>
```
:::