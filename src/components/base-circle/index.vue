<template>
  <div class="wave ripple danger">
    <div class="circle-view"></div>
    <div class="circle-view"></div>
    <div class="circle-view"></div>
  </div>
</template>
<script lang="babel">
export default {
  name: 'base-circle',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
$unit: 1rem/37.5!global; //单位转换
.wave {
  position: relative;
  display: inline-block;
  min-width: 80 * $unit;
  min-height: 80 * $unit;
  text-align: center;
  line-height: 80 * $unit;
  font-size: 28px;
  opacity: 0.6;
}
.wave .circle-view {
  position: absolute;
  border-radius: 50%;

  opacity: 0;
}
/* 波纹效果 */
.wave.ripple .circle-view {
  width: calc(100% - 6px); /* 减去边框的大小 */
  height: calc(100% - 6px); /* 减去边框的大小 */
  border: 3px solid #fff;
}
.wave.ripple .circle-view:first-child {
  animation: circle-view-opacity 2s infinite;
}
.wave.ripple .circle-view:nth-child(2) {
  animation: circle-view-opacity 2s infinite;
  animation-delay: 0.3s;
}
.wave.ripple .circle-view:nth-child(3) {
  animation: circle-view-opacity 2s infinite;
  animation-delay: 0.6s;
}
.wave.ripple.danger {
  color: #fa535c;
}
.wave.ripple.danger .circle-view {
  border-color: #fa535c;
}
.wave.ripple.warning {
  color: orange;
}
.wave.ripple.warning .circle-view {
  border-color: orange;
}
/* 波动效果 */
.wave.solid .circle-view {
  width: 100%;
  height: 100%;
  background: #fff;
}
.wave.solid .circle-view:first-child {
  animation: circle-view-opacity 2s infinite;
}
.wave.solid.danger {
  color: red;
}
.wave.solid.danger .circle-view {
  background: red;
}

.wave.solid.warning {
  color: #fa535c;
}
.wave.solid.warning .circle-view {
  background: #fa535c;
}
@keyframes circle-view-opacity {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
