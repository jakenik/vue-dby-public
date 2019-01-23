<template>
  <label
    class="dby-radio"
    :class="[
      border && radioSize ? 'dby-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = label"
  >
    <span
      class="dby-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="dby-radio__inner"></span>
      <input
        class="dby-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span class="dby-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: "radio",
  inject: {
    elForm: {
      default: ""
    },

    elFormItem: {
      default: ""
    }
  },

  componentName: "radio",

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },

  data() {
    return {
      focus: false
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElRadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("ElRadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
      }
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    radioSize() {
      const temRadioSize =
        this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize;
    },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled ||
            this.disabled ||
            (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },
    tabIndex() {
      return !this.isDisabled
        ? this.isGroup
          ? this.model === this.label
            ? 0
            : -1
          : 0
        : -1;
    }
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup &&
          this.dispatch("ElRadioGroup", "handleChange", this.model);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@charset "UTF-8";
.dby-radio,
.dby-radio--medium.is-bordered .dby-radio__label {
  font-size: 14 * 2 * $unit;
}
.dby-radio,
.dby-radio__input {
  white-space: nowrap;
  line-height: 1;
  outline: 0;
}
.dby-radio,
.dby-radio__inner,
.dby-radio__input {
  position: relative;
  display: inline-block;
}
.dby-radio {
  color: #606266;
  font-weight: 500;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.dby-radio.is-bordered {
  padding: 12 * 2 * $unit 20 * 2 * $unit 0 10 * 2 * $unit;
  border-radius: 4 * 2 * $unit;
  border: 1 * 2 * $unit solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 40 * 2 * $unit;
}
.dby-radio.is-bordered.is-checked {
  border-color: #409eff;
}
.dby-radio.is-bordered.is-disabled {
  cursor: not-allowed;
  border-color: #ebeef5;
}
.dby-radio__input.is-disabled .dby-radio__inner,
.dby-radio__input.is-disabled.is-checked .dby-radio__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}
.dby-radio.is-bordered + .dby-radio.is-bordered {
  margin-left: 10 * 2 * $unit;
}
.dby-radio--medium.is-bordered {
  padding: 10 * 2 * $unit 20 * 2 * $unit 0 10 * 2 * $unit;
  border-radius: 4 * 2 * $unit;
  height: 36 * 2 * $unit;
}
.dby-radio--mini.is-bordered .dby-radio__label,
.dby-radio--small.is-bordered .dby-radio__label {
  font-size: 12 * 2 * $unit;
}
.dby-radio--medium.is-bordered .dby-radio__inner {
  height: 14 * 2 * $unit;
  width: 14 * 2 * $unit;
}
.dby-radio--small.is-bordered {
  padding: 8 * 2 * $unit 15 * 2 * $unit 0 10 * 2 * $unit;
  border-radius: 3 * 2 * $unit;
  height: 32 * 2 * $unit;
}
.dby-radio--small.is-bordered .dby-radio__inner {
  height: 12 * 2 * $unit;
  width: 12 * 2 * $unit;
}
.dby-radio--mini.is-bordered {
  padding: 6 * 2 * $unit 15 * 2 * $unit 0 10 * 2 * $unit;
  border-radius: 3 * 2 * $unit;
  height: 28 * 2 * $unit;
}
.dby-radio--mini.is-bordered .dby-radio__inner {
  height: 12 * 2 * $unit;
  width: 12 * 2 * $unit;
}
.dby-radio + .dby-radio {
  margin-left: 30 * 2 * $unit;
}
.dby-radio__input {
  cursor: pointer;
  vertical-align: middle;
}
.dby-radio__input.is-disabled .dby-radio__inner {
  cursor: not-allowed;
}
.dby-radio__input.is-disabled .dby-radio__inner::after {
  cursor: not-allowed;
  background-color: #f5f7fa;
}
.dby-radio__input.is-disabled .dby-radio__inner + .dby-radio__label {
  cursor: not-allowed;
}
.dby-radio__input.is-disabled.is-checked .dby-radio__inner::after {
  background-color: #c0c4cc;
}
.dby-radio__input.is-disabled + span.dby-radio__label {
  color: #c0c4cc;
  cursor: not-allowed;
}
.dby-radio__input.is-checked .dby-radio__inner {
  border-color: #409eff;
  background: #409eff;
}
.dby-radio__input.is-checked .dby-radio__inner::after {
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
}
.dby-radio__input.is-checked + .dby-radio__label {
  color: #409eff;
}
.dby-radio__input.is-focus .dby-radio__inner {
  border-color: #409eff;
}
.dby-radio__inner {
  border: 1 * 2 * $unit solid #dcdfe6;
  border-radius: 100%;
  width: 14 * 2 * $unit;
  height: 14 * 2 * $unit;
  background-color: #fff;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.dby-radio__inner:hover {
  border-color: #409eff;
}
.dby-radio__inner::after {
  width: 4 * 2 * $unit;
  height: 4 * 2 * $unit;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  -webkit-transition: -webkit-transform 0.15s
    cubic-bezier(0.71, -0.46, 0.88, 0.6);
  transition: -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6);
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6);
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6),
    -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6);
}
.dby-radio__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
.dby-radio:focus:not(.is-focus):not(:active) .dby-radio__inner {
  -webkit-box-shadow: 0 0 2 * 2 * $unit 2 * 2 * $unit #409eff;
  box-shadow: 0 0 2 * 2 * $unit 2 * 2 * $unit #409eff;
}
.dby-radio__label {
  font-size: 14 * 2 * $unit;
  padding-left: 10 * 2 * $unit;
}
</style>