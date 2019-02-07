<template>
  <div id="list-complete-demo" class="demo">
    <transition-group name="list-complete" tag="p" class="list-complete">
      <div v-for="(item) in socketMsgRecv" :key="item.content" class="list-complete-item">
        <div class="usermain">
          <img
            :src="item.pictureUrl"
            :class="['latestVisitors_li_img', item.flg ? 'userlist_li_img_show' : 'userlist_li_img_hide']"
          >
          {{item.content}}
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script lang="babel">
export default {
  name: '',
  props: {
    type: String
  },
  data () {
    return {
      socketMsgRecv: [],
      timer: null,
      userInfo: null,
      do: false // 弹幕是否进行中
    }
  },
  methods: {
    load () {
      let type = this.type
      if (!type) {
        type = 'userOperation'
      }
      this.dbyPublic.websocketRegisterHandler(type, msg => {
        if (msg.type !== type) {
          return
        }

        if (msg.data.pictureUrl && this.userInfo && msg.data.pictureUrl === this.userInfo.avatarUrl) {
          this.dbyPublic.globalData.socketMsgRecv.unshift(msg)
        } else {
          this.dbyPublic.globalData.socketMsgRecv.push(msg)
        }

        if (!this.do) {
          this.barrage()
        }
      })
    },
    barrage () {
      let arr = this.dbyPublic.globalData.socketMsgRecv
      let obj = arr.shift()
      if (obj) {
        obj.data.flg = true
        this.socketMsgRecv.push(obj.data)
        this.do = true
        setTimeout(() => {
          this.socketMsgRecv.shift()
        }, 1500)
        setTimeout(() => {
          this.barrage()
        }, 3000)
      } else {
        this.do = false
      }
    }
  },
  mounted: function () { // 挂载结束状态===============》
    this.load()
  }
}
</script>
<style lang="scss" scoped>
  .userlist {
  padding: 4 * $unit;
  padding-right: 20 * $unit;
  position: absolute;
  left: 30 * $unit;
  top: 24 * $unit;
  z-index: 10;
  width: auto;
  height: 68 * $unit;
  line-height: 68 * $unit;
  border-radius: 68 * $unit;
  font-size: 24 * $unit;
  color: #fff;
  box-sizing: border-box;
}

.userlist_li {
  width: 60 * $unit;
  height: 60 * $unit;
  border-radius: 60 * $unit;
  float: right;
  position: relative;
  margin-left: -20 * $unit;
}

.userlist_li_img {
  width: 54 * $unit;
  height: 54 * $unit;
  position: absolute;
  top: 3 * $unit;
  left: 3 * $unit;
  border-radius: 54 * $unit;
  border: 3 * $unit solid #fff;
}

.latestVisitors_li_img {
  width: 54 * $unit;
  height: 54 * $unit;
  position: absolute;
  top: 6 * $unit;
  left: 6 * $unit;
  border-radius: 54 * $unit;
}

.userlistpeople {
  z-index: 10;
  box-shadow: 0 3 * $unit 16 * $unit 4 * $unit rgba(117, 110, 226, 0.2);
}

.userlist_li_peopleNum {
  width: 58 * $unit;
  height: 58 * $unit;
  line-height: 58 * $unit;
  position: absolute;
  top: 3 * $unit;
  left: 3 * $unit;
  border-radius: 54 * $unit;
  border: 3 * $unit solid #fff;
  background-color: #eb4687;
  text-align: center;
  font-size: 32 * $unit;
  color: #fff;
  background: -webkit-linear-gradient(bottom, #ea4294, #f55d31);
}

.usermain {
  padding: 4 * $unit;
  padding-left: 66 * $unit;
  z-index: 11;
  right: 30 * $unit;
  width: auto;
  height: 68 * $unit;
  line-height: 68 * $unit;
  margin-left: 16 * $unit;
  border-radius: 68 * $unit;
  font-size: 24 * $unit;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  position: relative;
}

.usermain_hide {
  transition-duration: 0s;
  background: rgba(0, 0, 0, 0);
  top: 440 * $unit;
}

.userlist_li_img_show {
  display: block;
}

.userlist_li_img_hide {
  display: none;
}

.usermain_show {
  background: rgba(0, 0, 0, 0.4);
  top: 300 * $unit;
}

@keyframes cute-btn {
  from {
    -webkit-transform: scale3d(1, 1, 1) translateY(0);
    transform: scale3d(1, 1, 1) translateY(0);
  }
  5% {
    -webkit-transform: scale3d(1.03, 0.97, 1) translateY(-1px);
    transform: scale3d(1.03, 0.97, 1) translateY(-1px);
  }
  12.5% {
    -webkit-transform: scale3d(1, 1, 1) translateY(-10px);
    transform: scale3d(1, 1, 1) translateY(-10px);
  }
  20% {
    -webkit-transform: scale3d(0.98, 1.02, 1) translateY(-1px);
    transform: scale3d(0.98, 1.02, 1) translateY(-1px);
  }
  25% {
    -webkit-transform: scale3d(1.06, 0.94, 1) translateY(0);
    transform: scale3d(1.06, 0.94, 1) translateY(0);
  }
  32.5% {
    -webkit-transform: scale3d(0.97, 1.03, 1) translateY(-4px);
    transform: scale3d(0.97, 1.03, 1) translateY(-4px);
  }
  40% {
    -webkit-transform: scale3d(1, 1, 1) translateY(0);
    transform: scale3d(1, 1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1) translateY(0);
    transform: scale3d(1, 1, 1) translateY(0);
  }
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  z-index: 1;
  float: right;
}

.list-complete-leave-to
  {
    opacity: 0;
  }
.list-complete-enter{
  opacity: 0;
  transform: translateY(4rem);
}
.list-complete-leave-active {
  position: fixed;
}
.list-complete {
  position: fixed;
  right: 0rem;
  top: 2rem;
  width: 100%;
  z-index: 10;
}
</style>
