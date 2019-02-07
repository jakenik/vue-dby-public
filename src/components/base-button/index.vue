<template>
  <div class="base-button"  v-base-geste="geset" @click.stop="onClickButton">
    <slot></slot>
  </div>
</template>
<script lang="babel">
import BaseGeste from '../../directives/base-geste.js'
export default {
  name: 'base-button',
  props: {
    color: String
  },
  data () {
    return {
      geset: {selectClass:'base-button-select'}
    }
  },
  directives: {BaseGeste},
  methods: {
    onClickButton(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" >
  $unit: 1rem/37.5!global; //单位转换
  .base-button{
    background: linear-gradient(#fc5657,#fb6a53);
    transition: all 0.2s;
    box-shadow: 6 * $unit 8 * $unit 5 * $unit 1 * $unit rgba(85,77,192,.2);
    box-sizing: border-box;
    min-width: 200 * $unit;
    min-height: 80 * $unit;
    text-align: center;
    line-height: 80 * $unit;
    border-radius: 50 * $unit;
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
  .base-button-select{
    box-shadow: 6 * $unit 10 * $unit 5 * $unit 2 * $unit rgba(85,77,192,.3);
  }
</style>
