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
import { Toast, PageConfig } from '../src/index'
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

    this.$logger.info('MessageBox1')
    this.$logger.info(function () {
      console.log(11)
    })
    // setTimeout(() => {
    //   try {
    //     var b = a
    //   } catch (error) {
    //     console.log(error)

    //     this.$logger.error(error)
    //   }
    // }, 3000)
    // this.$request()
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
