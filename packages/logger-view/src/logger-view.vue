<template>
  <div v-show="show">
    <div :class="modalShowClass" id="modal-11">
      <div class="md-content">
        <div class="md-content-h3">{{title}}</div>
        <div>
          <div class="logList">{{logList}}</div>
          <!-- <div class="scroll-div-height" v-for="(item, index) in logList" :key="'logList' + index">
            {{item}}
          </div> -->
          <div class="md-botton-block">
            <button class="md-botton" @click="show = false">{{cancelText}}</button>
            <button class="md-botton" @click="show = false">{{confirmText}}</button>
          </div>
        </div>
      </div>
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
      show: false
    }
  },
  methods: {

  },
  computed: {
    modalShowClass: function () {
      let modal = ['md-modal', 'md-effect-11']
      if (this.show) modal.push('md-show')
      return modal.join(' ')
    }
  },
  mounted: function () {
    console.log(this.showModal)
    console.log(this.logList)
  }
}
</script>

<style lang="scss">
.md-effect-11 .md-content {
  -webkit-transform: scale(2);
  -moz-transform: scale(2);
  -ms-transform: scale(2);
  transform: scale(2);
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.md-show.md-effect-11 .md-content {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
.md-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  max-width: 630 * 2 * $unit;
  min-width: 320 * 2 * $unit;
  height: auto;
  z-index: 2000;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.md-content-h3 {
  margin: 0;
  padding: 20 * $unit;
  text-align: center;
  font-size: 56 * $unit;
  font-weight: 800;
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3 * $unit 3 * $unit 0 0;
}
.scroll-div-height {
  height: 900 * $unit;
}
.md-botton-block {
  display: flex;
}
.logList{
  height: 800 * $unit;
  overflow-y:auto;
}
</style>
