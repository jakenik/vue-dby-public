<template>
  <div id="app">
    <div id="app">
      <div @click="showPayPop">点击弹出支付框</div>
      <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" @inputDown="inputDown"></vue-pay-pop>
    </div>
  </div>
</template>

<script>
import vuePayPop from './lib/vue-pay-pop'
export default {
  name: 'app',
  data () {
    return {
      payPopOptions: {
        isShow: false
      },
    }
  },
  components: {
    vuePayPop
  },
  methods: {
    inputDown(val) {
    //模拟检查数据
    setTimeout(() => {
      if (val == '111111') {
      this.$refs.pay.$payStatus(true)
      } else {
      this.$refs.pay.$payStatus(false)
      }
    }, 1000)
    },
    showPayPop() {
    this.payPopOptions.isShow = true;
    }
  }
}
</script>

<style lang="scss">

</style>
