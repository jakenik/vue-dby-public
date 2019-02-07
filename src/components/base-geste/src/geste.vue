<template>
  <transition name="base-geste-fade">
    <div class="base-geste" 
    v-show="visible"
    :style="{
      width: width,
      height: height,
      top: `${top}px`,
      left: `${left}px`
    }">
    </div>
  </transition>
</template>
<script lang="babel">
import selectorQuery from '../../../service/mixins/selectorQuery.js'
export default {
  name: 'base-geste',
  data () {
    return {
      width: 0,
      height: 0,
      visible: false,
      top: 0,
      left: 0
    }
  },
  mixins: [selectorQuery],
  methods: {
    setStyle(el) {
      let parent = this.getNodeQuery(el)
      let _length = parent.width > parent.height ? parent.width : parent.height
      this.width = _length * 2.5 + 'px'
      this.height = _length * 2.5 + 'px'
    }
  }
}
</script>
<style lang="scss" >
  $unit: 1rem/37.5!global; //单位转换
  .base-geste{
    position: absolute;
    z-index: 1;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%,-50%) scale(1,1);
    transition: all 0.35s cubic-bezier(1.0, 0.8, 0.5, 0.3);
    opacity: 0.3;
  }
  .base-geste-fade-enter{
    transform: translate(-50%,-50%) scale(0,0);
  }
  .base-geste-fade-leave-active {
    opacity: 0;
  }
  .base-geste-fade-leave-to{
    opacity: 0;
  }
</style>
