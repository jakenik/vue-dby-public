<template>
  <div v-if="load" class="logger-view-body">
    <transition name="show">
      <div v-show="show && content">
        <div class="dby-logView-modal" >
          <div class="dby-logView-content">
            <div class="dby-logView-content-h3">{{title}}</div>
            <div >
              <div class="dby-logView-logList" >
                <div class="dby-logView-content-block">
                  <div :class="['dby-logView-' + item.type,'dby-logView-content-span']" v-for="(item, index) in content" :key="'content' + index">
                      {{item.value}}
                  </div>
                </div>
              </div>
              <div class="dby-logView-botton-block">
                <div class="dby-logView-botton" @click="show = false">{{confirmText}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dby-logView-overlay" @click="show = false"></div>
      </div>
    </transition>
    <div  @click="show = !show" class="dby-logView-bug-button">
      <svg class="dby-logView-bug-svg" t="1492682037685"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1863"
        xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128">
        <path d="M969.142857 548.571429q0 14.848-10.861714 25.709714t-25.709714 10.861714l-128 0q0 97.718857-38.290286 165.705143l118.857143 119.442286q10.861714 10.861714 10.861714 25.709714t-10.861714 25.709714q-10.276571 10.861714-25.709714 10.861714t-25.709714-10.861714l-113.152-112.566857q-2.852571 2.852571-8.557714 7.424t-23.990857 16.274286-37.156571 20.845714-46.848 16.566857-55.442286 7.424l0-512-73.142857 0 0 512q-29.147429 0-58.002286-7.716571t-49.700571-18.870857-37.705143-22.272-24.868571-18.578286l-8.557714-8.009143-104.557714 118.272q-11.446857 11.995429-27.428571 11.995429-13.714286 0-24.576-9.142857-10.861714-10.276571-11.702857-25.417143t8.850286-26.587429l115.419429-129.718857q-33.133714-65.133714-33.133714-156.562286l-128 0q-14.848 0-25.709714-10.861714t-10.861714-25.709714 10.861714-25.709714 25.709714-10.861714l128 0 0-168.009143-98.852571-98.852571q-10.861714-10.861714-10.861714-25.709714t10.861714-25.709714 25.709714-10.861714 25.709714 10.861714l98.852571 98.852571 482.304 0 98.852571-98.852571q10.861714-10.861714 25.709714-10.861714t25.709714 10.861714 10.861714 25.709714-10.861714 25.709714l-98.852571 98.852571 0 168.009143 128 0q14.848 0 25.709714 10.861714t10.861714 25.709714zM694.857143 219.428571l-365.714286 0q0-75.995429 53.430857-129.426286t129.426286-53.430857 129.426286 53.430857 53.430857 129.426286z"
          p-id="1864"></path>
      </svg>
    </div>
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
      load: null
    }
  }
}
</script>

<style lang="scss" >
$unit: 1rem/37.5!global; //单位转换
@mixin opacity($opacity){
  -moz-opacity:$opacity; /* 老版Mozilla */
  -khtml-opacity:$opacity; /* 老版Safari */
  opacity: $opacity; /* 支持opacity的浏览器*/
}
@mixin scroll(){
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.show-enter-active, .show-leave-active {
  transition: opacity .3s;
  position: fixed;
  -webkit-transition: opacity .3s;
}
.show-enter, .show-leave-to /* .fade-leave-active below version 2.1.8 */ {
  position: fixed;
  @include opacity(0);
}
.dby-logView-content{
  color: #fff;
  background: #fff;
  position: relative;
  margin: 0 auto;
}
.logger-view-body{
  position: fixed;
  z-index: 1000;
  width: 0;
  height: 0;
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
  border-radius: 6 * $unit;
  overflow: hidden;
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
  color: #fff;
}
.scroll-div-height {
  height: 900 * $unit;
}
.dby-logView-botton-block {
  display: flex;
}
.dby-logView-botton{
  width: 100%;
  line-height: 80 * $unit;
  color: #000;
  text-align: center;
  font-size: 40 * $unit;
  height: 80 * $unit;
  font-weight: 600;
  background: #f0f9eb;
}
.dby-logView-logList{
  height: 800 * $unit;
  @include scroll();
  padding: 15 * $unit 40 * $unit 30 * $unit;
  margin: 0;
  font-weight: 300;
  font-size: 1.15rem;
  color: #000;
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
.dby-logView-content-span{
  font-size: 32 * $unit;
  padding-bottom: 15 * $unit;
  line-height: 40 * $unit;
  display: block;
  white-space: normal;
  word-break: break-all;
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  font-family: "微软雅黑";
}
.dby-logView-content-block{
  border-bottom: 1px solid #ebeef5;
}
.dby-logView-overlay{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #000;
  @include opacity(0.5);
  // -webkit-transition: all 0.3s;
  // -moz-transition: all 0.3s;
  // transition: all 0.3s;
}
.dby-logView-bug-svg{
  width: 30 * $unit;
  height: 30 * $unit;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.dby-logView-bug-button{
  position: fixed;
  z-index: 1000;
  top: 5*$unit;
  right: 5*$unit;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  font-size: 12 * 2 * $unit;
  border-radius: 3 * 2 * $unit;
  padding: 12 * $unit;
}
</style>
