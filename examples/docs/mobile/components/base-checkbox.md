<!--
注意：具有交互功能的说明文档，需要有<script></script>标签，在标签元素中定义需要导出的vue实例。
在:::demo ::: 代码块中定义的模版<template></template>会作为导出的vue实例的模版，但是在代码块中的<script></script>中的内容仅作为展示，需注意。
-->
<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>
## base-checkbox
介绍base-checkbox的使用
#### 基础用法
:::demo
``` html
<template>
  <div>
    <base-checkbox v-model="checked">备选项</base-checkbox>
  </div>
</template>
```
:::

#### 禁用状态
:::demo
``` html
<template>
  <base-checkbox v-model="checked" disabled>备选项</base-checkbox>
</template>
```
:::
