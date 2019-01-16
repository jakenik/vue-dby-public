<template>
  <transition name="dby-toast-pop">
    <div
      class="dby-toast"
      v-show="visible"
      :class="customClass"
      :style="{ 'padding': iconClass === '' ? '0.26rem' : '0.53rem' }"
    >
      <i class="dby-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span
        class="dby-toast-text"
        :style="{ 'padding-top': iconClass === '' ? '0' : '0.26rem' }"
      >{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="scss">
.dby-toast {
  position: fixed;
  max-width: 80%;
  border-radius: 5 * 2 * $unit;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  left: 50%;
  top: 50%;
  @include transition(opacity 0.3s linear);
  @include translate(-50%, -50%);
}
.dby-toast-icon {
  display: block;
  text-align: center;
  font-size: 56 * 2 * $unit;
}

.dby-toast-text {
  font-size: 14 * 2 * $unit;
  display: block;
  text-align: center;
}

.dby-toast-placetop {
  top: 50 * 2 * $unit;
  left: 50%;
  transform: translate(-50%, 0);
}

.dby-toast-placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.dby-toast-placebottom {
  bottom: 50 * 2 * $unit;
  left: 50%;
  transform: translate(-50%, 0);
}
.dby-toast-pop-enter,
.dby-toast-pop-leave-active {
  opacity: 0;
}
</style>

<script type="text/babel">
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "middle"
    },
    iconClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      visible: false
    };
  },

  computed: {
    customClass() {
      var classes = [];
      switch (this.position) {
        case "top":
          classes.push("is-placetop");
          break;
        case "bottom":
          classes.push("is-placebottom");
          break;
        default:
          classes.push("is-placemiddle");
      }
      classes.push(this.className);

      return classes.join(" ");
    }
  }
};
</script>