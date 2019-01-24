<template>
  <transition name="message-fade">
    <div v-show="visible" id="dby-message-case" @click.self="close">
      <div class="dby-message-case-body">
        <div>
          <slot></slot>
        </div>
        <svg @click="close" class="dby-message-case-close" t="1548229406836" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="1105" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30">
          <path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-938.666667C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333z m198.698667 625.365334a42.666667 42.666667 0 0 1-60.330667 0L512 572.330667l-138.368 138.368a42.666667 42.666667 0 0 1-60.330667-60.330667L451.669333 512 313.301333 373.632a42.666667 42.666667 0 0 1 60.330667-60.330667L512 451.669333l138.368-138.368a42.624 42.624 0 1 1 60.330667 60.330667L572.330667 512l138.368 138.368a42.666667 42.666667 0 0 1 0 60.330667z" p-id="1106" fill="#ffffff">
          </path>
        </svg>
      </div>
    </div>
  </transition>
</template>
<script lang="babel">

export default {
  name: 'message-case',
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
    }
  }
}
</script>
<style lang="scss" scoped>
#dby-message-case {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  background: rgba(0,0,0,0.6);
  transition: all .2s;
  height: 110%;
}
.dby-message-case-body{
  position: absolute;
  left: 2.8rem;
  top: 12%;
  background-color: #fff;
  border-radius: .26667rem;
  width: 14.4rem;
  min-height: 18.48rem;
  box-shadow: 0 0.13333rem 1.01333rem 0 rgba(0,0,0,.2);
}
.dby-message-case-close{
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%,150%);
  z-index: 1000;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  font-size: 12 * 2 * $unit;
  border-radius: 3 * 2 * $unit;
}
</style>
