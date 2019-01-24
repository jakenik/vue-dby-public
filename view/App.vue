<template>
  <div id="app">
    <router-view/>
    <div id="app">
      <div class="c" @click="showPayPop">点击弹出支付框</div>
      <div @click="onClickBottomModal">点击弹出底部弹窗</div>
      <div @click="$refs.bottomModalcase.open()">点击弹出带框弹窗</div>
      <message-bottom ref="bottomModal">
        <div>你好</div>
        <div>我是插槽</div>
      </message-bottom>
      <message-case ref="bottomModalcase">
        <div>你好</div>
        <div>我是插槽</div>
      </message-case>
      <div>111</div>
      <circle-view></circle-view>
      <radio v-model="radio" label="1" @change="changeRadio">备选项1</radio>
      <radio v-model="radio" label="2" disabled>备选项2</radio>
      <checkbox v-model="checked">备选项</checkbox>
    </div>
  </div>
</template>

<script>
import { PageConfig, MessageBox, Toast } from '../src/index'
export default {
  name: 'app',
  data () {
    return {
      payPopOptions: {
        isShow: false
      },
      messageContent: {
        title: '标题',
        content: '内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      radio: null,
      checked: null
    }
  },
  components: {

  },
  // mixins: [PageConfig],
  mounted: function () {
    this.$logger.info('MessageBox1', '2222', '[]', 'p[{}1241', 1)
    this.$logger.info(this.$wxApi)
    this.$wxApi.wxConfig({source: '多保鱼服务号',
      debug: true,
      succ: () => {
        this.$wxApi.wxPageInitShare({path: this.$route.path,
          succ (res) {
            console.log(res)
          },
          fail (res) {
            console.log(res)
          }})
      },
      fail () {}})
    this.messageBoxOpen()
    // setTimeout(()=>{
    //   MessageBox({
    //     cancelText: '取消3',
    //     confirmText: '确定4',
    //     messageContent: {
    //       title: '标题5',
    //       content: '表哦提666'
    //     },
    //     succ() {
    //       console.log(1);

    //     },
    //     fail(){
    //       console.log(0);
    //     }
    //   }).open()
    // }, 3000)
    // Toast('1111')
    this.$webSocket.websocketInit()
  },
  methods: {
    inputDown (val) {
      setTimeout(() => {
        if (val === '111111') {
          this.$refs.pay.$payStatus(true)
        } else {
          this.$refs.pay.$payStatus(false)
        }
      }, 1000)
    },
    showPayPop () {
      this.payPopOptions.isShow = true
    },
    configSuccess (res) {
      console.log(res)
    },
    configError (res) {
      console.log(res)
    },
    onClickBottomModal () {
      this.$refs.bottomModal.open()
    },
    messageBoxOpen () {
      let m = MessageBox({
        messageContent: {
          title: '标题1',
          content: '表哦提'
        }
      })
      setTimeout(() => { m.close() }, 2000)
    },
    changeRadio () {
      console.log(this.radio)
    },
    onChangecheckList () {
      console.log(111)
    }
  }
}
</script>

<style lang="scss">
  .c{
    color: $nav-color;
    font-size: 30 * $unit;
  }
</style>
