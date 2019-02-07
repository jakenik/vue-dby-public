<!--
注意：具有交互功能的说明文档，需要有<script></script>标签，在标签元素中定义需要导出的vue实例。
在:::demo ::: 代码块中定义的模版<template></template>会作为导出的vue实例的模版，但是在代码块中的<script></script>中的内容仅作为展示，需注意。
-->
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
## base-circle
#### 引入 
```javascript
import { Circle } from 'dby-base';
Vue.component(Circle.name, Circle)
```
介绍base-circle的使用
:::demo
``` html
<template>
  <base-circle></base-circle>
</template>
```
:::
