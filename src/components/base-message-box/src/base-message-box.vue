<template>
  <transition name="message-fade">
    <div v-if="visible" id="dby-message-box" @click.self="fail();close()">
      <div class="dby-message-box-body">
        <div v-if="messageContent">
          <div class="dby-message-box-title" >{{messageContent.title}}</div>
          <div class="dby-message-box-content" >{{messageContent.content}}</div>
        </div>
        <div class="dby-message-box-action">
          <div class="dby-message-box-button dby-message-box-cancel" @click="fail();close()">{{cancelText}}</div>
          <div class="dby-message-box-button dby-message-box-confirm" @click="succ();close()">{{confirmText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="babel">
export default {
  name: 'base-message-box',
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    messageContent: Object,
    succ: Function,
    fail: Function
  },
  data () {
    return {
      visible: null
    }
  },
  methods: {
    open () {
      this.visible = true
      return this
    },
    close () {
      this.visible = false
      return this
    }
  }
}
</script>
<style lang="scss" scoped>
$unit: 1rem/37.5!global; //单位转换
@mixin transition($value) {
  transition: $value;
  -moz-transition: $value; /* Firefox 4 */
  -webkit-transition: $value; /* Safari 和 Chrome */
  -o-transition: $value; /* Opera */
}
  #dby-message-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: auto;
    background: rgba(0,0,0,0.6);
    // background: #000;
    opacity: 1;
    @include transition(opacity 0.2s linear);
    height: 110%;
  }
  .dby-message-box-body {
    position: absolute;
    top: 10.50667rem;
    left: 50%;
    width: 80%;
    min-height: 20%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: .50667rem;
    overflow: hidden;
    padding-bottom: 2.61333rem;
    opacity: 1;
  }
  .dby-message-box-action{
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .dby-message-box-button{
    height: 2.61333rem;
    line-height: 2.66667rem;
    color: #0a8cdf;
    font-size: .96rem;
    text-align: center;
    border-radius: 0 0 .4rem 0;
    border:2 * $unit solid #e5e5e5;
    border-left: none;
    width: 50%;
  }
  .dby-message-box-cancel{
    border-radius: 0;
  }
  .dby-message-box-title{
    font-size: 1.2rem;
    color: #717dda;
    display: block;
    margin: .53333rem 0 0;
    text-align: center;
    min-height: 1.4rem;
  }
  .dby-message-box-content{
    font-size: .90667rem;
    color: #313131;
    display: block;
    margin: .5rem 1.06667rem 0;
    text-align: center;
  }
</style>
