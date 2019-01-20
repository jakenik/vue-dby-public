<template>
  <div>
    <transition name="show">
      <div v-show="show && content">
        <div class="dby-logView-modal" >
          <div class="dby-logView-content">
            <div class="dby-logView-content-h3">{{title}}</div>
            <div>
              <div class="dby-logView-logList" >
                <div :class="'dby-logView-' + item.type" v-for="(item, index) in content" :key="'content' + index">
                  <span>{{item.value}}</span>
                </div>
              </div>
              <div class="dby-logView-botton-block">
                <button class="dby-logView-botton" @click="show = false">{{cancelText}}</button>
                <button class="dby-logView-botton" @click="show = false">{{confirmText}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="" @click="show = true">开启</div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    title: {
      type: String,
      default: '弹窗'
    },
    content: Array,
    success: Function,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      show: null,
      logList: null
    }
  }
}
</script>

<style lang="scss" >
.show-enter-active, .show-leave-active {
  transition: opacity .3s;
}
.show-enter, .show-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.dby-logView-effect-11 .dby-logView-content {
  -webkit-transform: scale(2);
  -moz-transform: scale(2);
  -ms-transform: scale(2);
  transform: scale(2);
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.dby-logView-show.dby-logView-effect-11 .dby-logView-content {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
.dby-logView-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 630 * 2 * $unit;
  min-width: 320 * 2 * $unit;
  height: auto;
  z-index: 2000;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
}
.dby-logView-content-h3 {
  margin: 0;
  padding: 20 * $unit;
  text-align: center;
  font-size: 56 * $unit;
  font-weight: 800;
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3 * $unit 3 * $unit 0 0;
}
.scroll-div-height {
  height: 900 * $unit;
}
.dby-logView-botton-block {
  display: flex;
}
.dby-logView-logList{
  height: 800 * $unit;
  overflow-y:auto;
}
.dby-logView-info, .dby-logView-log{
 color: #000;
}
.dby-logView-warn{
 color: #E6A23C;
}
.dby-logView-error{
 color: #F56C6C;
}
</style>
