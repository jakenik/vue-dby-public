<template>
  <div id="app">
    <div id="app">
      <div class="c" @click="showPayPop">点击弹出支付框</div>
      <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" @inputDown="inputDown"></vue-pay-pop>
    </div>
  </div>
</template>

<script>
// import vuePayPop from './lib/vue-pay-pop'
import '../src/style/common.scss'
import { Toast } from '../src/index'
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
    // vuePayPop
  },
  mounted: function () {
    setTimeout(() => {
      Toast('好')
    }, 1000)
    console.log(this.$dbyPublic.wxApi);

    this.$logger.info()
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
