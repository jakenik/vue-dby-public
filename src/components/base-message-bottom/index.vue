<template>
  <transition name="message-fade">
    <div v-show="visible" id="dby-message-bottom" @click.self="close">
      <div id="dby-message-bottom-tail">
        <div class="dby-message-bottom-action">
          <div class="dby-message-bottom-button dby-message-bottom-cancel" @click="close();onChangeEmit(cancelText, false)">{{cancelText}}</div>
          <div class="dby-message-bottom-button dby-message-bottom-confirm" @click="close();onChangeEmit(confirmText, true)">{{confirmText}}</div>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script lang="babel">

export default {
  name: 'base-message-bottom',
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  data () { // 数据
    return {
      visible: false
    }
  },
  methods: { // js
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    onChangeEmit(text, status) {
      this.$emit('change', {text, status})
    }
  }
}
</script>
<style lang="scss" scoped>
$unit: 1rem/37.5!global; //单位转换
#dby-message-bottom {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  background: rgba(0,0,0,0.6);
  transition: all .2s;
}
#block {
  height: 224 * $unit;
}
#header {
  line-height: 100 * $unit;
  padding-left: 28 * $unit;
  font-size: 30 * $unit;
  color: #000000;
  background: #fff;
}
#body {
  background: #f6f7fe;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#dby-message-bottom-tail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 252 * 2 * $unit;
  background: #fff;
  z-index: 31;
  transition: all .2s;
  box-shadow: 0 2 * $unit 6 * $unit rgba(0,0,0,.3);
}
.dby-message-bottom-action{
  width: 100%;
  z-index: 40000;
  position: relative;
  display: flex;
  border-bottom: #eaeaea solid 1 * $unit;
}
.dby-message-bottom-cancel{
  padding-left: 1.06667rem;
}
.dby-message-bottom-confirm{
  text-align: right;
  padding-right: 1.06667rem;
}
.dby-message-bottom-button{
  width: 50%;
  color: #717dda;
  height: 80 * $unit;
  line-height: 80 * $unit;
  position: relative;
  font-size: 32 * $unit;
  z-index: 10;
}
</style>
