<template>
  <div id="app">
    <div id="app">
      <div class="c" @click="showPayPop">点击弹出支付框</div>
      <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" @inputDown="inputDown"></vue-pay-pop>
    </div>
  </div>
</template>

<script>
import '../src/style/common.scss'
import { Toast, LoggerView, PageConfig } from '../src/index'
export default {
  name: 'app',
  data () {
    return {
      payPopOptions: {
        isShow: false
      }
    }
  },
  components: {
  },
  mixins: [PageConfig],
  mounted: function () {
    // setTimeout(() => {
    //   Toast('好')
    // }, 1000)
    LoggerView({
      title: '弹窗',
      content: [],
      success: () => {}
    })
    this.$logger.info('MessageBox1')
    this.$logger.info('MessageBox2')
    this.$logger.info('MessageBox3')
    this.$logger.info('MessageBox4')
    this.$logger.info(function () {
      console.log(11)
    })
    setTimeout(() => {
      console.log(111)
      
      this.$logger.info('xxxx')
    }, 3000)
  },
  methods: {
    inputDown (val) {
    // 模拟检查数据
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
