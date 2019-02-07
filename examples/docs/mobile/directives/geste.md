<script>
import BaseGeste from '../../../../src/directives/base-geste.js'
export default {
  data () {
    return {
      geset: {selectClass:'button-select'}
    }
  },
  directives: {BaseGeste},
  methods: {
    onClickToast () {
      this.$toast('提示信息');
    }
  }
}
</script>
<style lang="scss" >
  $unit: 1rem/37.5!global; //单位转换
  .button{
    background: #000;
    transition: all 0.2s;
    box-shadow: 6 * $unit 8 * $unit 5 * $unit 1 * $unit rgba(85,77,192,.2);
    box-sizing: border-box;
    min-width: 800 * $unit;
    min-height: 300 * $unit;
    text-align: center;
    line-height: 80 * $unit;
    color: #fff;
    display: inline-block;
    font-size: 32 * $unit;
    padding: 0 30 * $unit;
    cursor:pointer;
    z-index: 8;
    position: relative;
    overflow: hidden;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  .button-select{
    box-shadow: 6 * $unit 10 * $unit 5 * $unit 2 * $unit rgba(85,77,192,.3);
  }
</style>
## geste
介绍geste的使用
:::demo
``` html
<template>
  <div class="button" v-base-geste="geset">点击出现花纹</div>
</template>
<script>
import BaseGeste from '../../../../src/directives/base-geste.js'
export default {
  data () {
    return {
      geset: {
        selectClass:'button-select' // 选中的时候添加的类
      }
    }
  },
  directives: {BaseGeste}
}
</script>
<style lang="scss" >
  $unit: 1rem/37.5!global; //单位转换
  .button{
    position: relative; // 这边重点提示一下 水波是用定位  这边必须加上定位才能生效 
    overflow: hidden; // 这边必须要 不然超没有隐藏
    background: #000;
    transition: all 0.2s;
    box-shadow: 6 * $unit 8 * $unit 5 * $unit 1 * $unit rgba(85,77,192,.2);
    box-sizing: border-box;
    min-width: 800 * $unit;
    min-height: 300 * $unit;
    text-align: center;
    line-height: 80 * $unit;
    color: #fff;
    display: inline-block;
    font-size: 32 * $unit;
    padding: 0 30 * $unit;
    cursor:pointer;
    z-index: 8;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  .button-select{
    box-shadow: 6 * $unit 10 * $unit 5 * $unit 2 * $unit rgba(85,77,192,.3);
  }
</style>
```
:::
