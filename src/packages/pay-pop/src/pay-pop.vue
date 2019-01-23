<template>
  <div class="pay-box">
    <div class="c2">11</div>
    <!-- 输入框及键盘 -->
    <div :class="payPopOptions.isShow? 'pay-wrapper pay-wrapper-active' : 'pay-wrapper'">
      <div class="pay-container" v-if="status">
        <div class="pay-title">
          {{title}}
          <div class="close-pay" @click="closePay">
            <svg t="1501505446265" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="icon"><path data-v-7c990886="" d="M550.659 490.565l324.395-324.386c10.945-10.945 10.945-28.699 0-39.644-10.948-10.95-28.704-10.95-39.648-0.004L511.01 450.916 186.625 126.53c-10.946-10.947-28.703-10.947-39.648 0-10.946 10.95-10.946 28.703 0 39.648l324.385 324.386-324.385 324.401c-10.946 10.944-10.946 28.703 0 39.65 10.945 10.943 28.702 10.943 39.648 0L511.01 530.213l324.396 324.401c10.944 10.944 28.7 10.944 39.648 0 10.945-10.946 10.945-28.705 0-39.649L550.66 490.565z" p-id="1905"></path></svg>
          </div>
        </div>
        <div class="pay-input-wrapper">
          <div class="pay-input" v-for="(item, index) in pwdLength" :key="index">
            <input type="password" :value="val[index]" disabled>
          </div>
        </div>
        <div class="pay-keyboard-wrapper">
          <div class="pay-keyboard">
            <div class="pay-key-wrapper" v-for="item in keyBoards" :key="item">
              <div class="pay-key" @click="val2input(item)">
                {{item}}
              </div>
            </div>
          </div>
          <div class="pay-keyboard-bottom">
            <div class="pay-key-bottom pay-key-blank"></div>
            <div class="pay-key-bottom">
              <div class="pay-key-middle" @click="val2input('0')">0</div>
            </div>
            <div class="pay-key-bottom" >
              <div class="pay-key-del" @click="delVal" v-html="del"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结果显示 -->
      <div class="pay-result" v-if="!status">
        <div class="loader"></div>
        <div>{{loadingTxt}}</div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="gray-wrapper" v-show="payPopOptions.isShow" @click="payPopOptions.isShow = false"></div>
  </div>
</template>

<script>
export default {
  name: 'vue-pay-pop',
  props: ['payPopOptions'],
  data () {
    return {
      // 可选参数，支持改变
      // 顶部文字
      title: this.payPopOptions.title || '请输入支付密码',
      // 密码长度
      pwdLength: this.payPopOptions.pwdLength || 6,
      // 底部删除按钮
      del: this.payPopOptions.del,
      // 默认等候文字
      loadingTxt: this.payPopOptions.loadingTxt || '请稍候...',
      // 默认等候时间
      loadingTime: this.payPopOptions.loadingTime || 1000,
      // 显示结果后，多久重回默认
      resultTime: this.payPopOptions.resultTime || 1000,
      // 成功文字
      successTxt: this.payPopOptions.successTxt || '支付成功',
      // 失败文字
      failTxt: this.payPopOptions.failTxt || '支付失败',
      // 默认参数，无法改变
      // 键盘数字(1~9)
      keyBoards: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      // 键入的值
      val: [],
      // 默认输入框与等待层是否显示
      status: true
    }
  },
  methods: {
    val2input (item) {
      this.val.push(item)
      if (this.val.length === this.pwdLength) {
        // 打开等待层
        this.status = false
        // 输入完毕后将值传递给父组件
        this.$emit('inputDown', this.val.join(''))
        // 清空数据
        this.val = []
      }
    },
    delVal () {
      if (this.val.length > 0) this.val.pop()
    },
    closePay () {
      this.payPopOptions.isShow = false
    },
    $payStatus (flag = false) {
      const that = this
      // 模拟等候feel
      setTimeout(() => {
        if (flag) {
          // 成功
          this.loadingTxt = this.successTxt
          // 关闭输入层，重置等待语
          setTimeout(function () {
            that.payPopOptions.isShow = !flag
            that.status = true
            that.loadingTxt = that.payPopOptions.loadingTxt || '请稍候...'
          }, this.resultTime)
        } else {
          // 失败
          this.loadingTxt = this.failTxt
          // 重新打开输入层，重置等待语
          setTimeout(function () {
            that.status = true
            that.loadingTxt = that.payPopOptions.loadingTxt || '请稍候...'
          }, this.resultTime)
        }
      }, this.loadingTime)
    }
  }
}
</script>

<style lang="scss">
  .c2{color: $nav-color;}
  .gray-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9;
  }
  .pay-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -400px;
    height: 400px;
    background: #f6f6f6;
    border-top: 1px solid #c7c7c7;
    z-index: 99;
    overflow: hidden;
    transition: transform .2s;
    transform: translateY(0);
  }
  .pay-wrapper-active {
    transition: transform .2s;
    transform: translateY(-400px);
  }
  .pay-title {
    line-height: 1;
    padding: 10px 0;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #c7c7c7;
  }
  .close-pay {
    float: right;
    margin-right: 5%;
  }
  .pay-input-wrapper {
    position: relative;
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-top: 60px;
  }
  .pay-input-wrapper:before {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    content: "";
    border: 1px solid #c7c7c7;
    transform: scale(.5);
    color: #c7c7c7;
    transform-origin: left top;
    z-index: 1000;
  }
  .pay-input {
    position: relative;
    flex: 1;
    height: 45px;
  }
  .pay-input:before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #c7c7c7;
    transform: scaleX(.5);
    color: #c7c7c7;
    transform-origin: 0 0;
  }
  .pay-input input {
    width: 100%;
    height: 100%;
    font-size: 30px;
    text-align: center;
    background: none;
    outline: none;
    border: none;
  }
  .pay-keyboard-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 7px 10px;
    background-color: #f6f6f6;
  }
  .pay-keyboard,
  .pay-keyboard-bottom {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
  .pay-key-wrapper,
  .pay-key-bottom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 33.33333333%;
    height: 50px;
    font-size: 16px;
    background-color: #f6f6f6;
  }
  .pay-key,
  .pay-key-middle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 80%;
    border-radius: 5px;
    background-color: #f6f6f6;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Microsoft YaHei';
    box-shadow: 0 2px 5px #999;
    cursor: pointer;
  }
  .pay-key-del {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 80%;
    border-radius: 5px;
    background-color: #f6f6f6;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Microsoft YaHei';
    cursor: pointer;
  }
  .pay-result {
    text-align: center;
  }
  .loader {
    width:25px;
    height:25px;
    display:inline-block;
    padding:0px;
    margin-top: 50px;
    border-radius:100%;
    border:5px solid;
    border-top-color:rgba(254, 168, 23, 0.65);
    border-bottom-color:rgba(57, 154, 219, 0.65);
    border-left-color:rgba(188, 84, 93, 0.95);
    border-right-color:rgba(137, 188, 79, 0.95);
    -webkit-animation: loader 2s ease-in-out infinite alternate;
    animation: loader 2s ease-in-out infinite alternate;
  }
  @keyframes loader {
    from {transform: rotate(0deg);}
    to {transform: rotate(720deg);}
  }
</style>
