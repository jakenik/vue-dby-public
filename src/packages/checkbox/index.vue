<template>
  <label
    class="el-checkbox"
    :class="[
      border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed': isChecked"
    :aria-disabled="isDisabled"
    :id="id"
  >
    <span
      class="el-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      aria-checked="mixed"
    >
      <span class="el-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="el-checkbox__original"
        type="checkbox"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
      <input
        v-else
        class="el-checkbox__original"
        type="checkbox"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span class="el-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: "checkbox",
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },

  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store
          : this.value !== undefined
          ? this.value
          : this.selfModel;
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true);

          this.isLimitExceeded === false &&
            this.dispatch("ElCheckboxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
          this.selfModel = val;
        }
      }
    },

    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },

    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElCheckboxGroup") {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled ||
            this.disabled ||
            (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize =
        this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    border: Boolean,
    size: String
  },

  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit("change", value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch("ElCheckboxGroup", "change", [
            this._checkboxGroup.value
          ]);
        }
      });
    }
  },

  created() {
    this.checked && this.addToStore();
  },
  mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute("aria-controls", this.controls);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-checkbox,
.el-checkbox__input {
  display: inline-block;
  position: relative;
}
.el-checkbox-button__inner,
.el-checkbox__input {
  white-space: nowrap;
  vertical-align: middle;
  outline: 0;
}
.el-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14* 2 * $unit;
  cursor: pointer;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.el-checkbox.is-bordered {
  padding: 9* 2 * $unit 20* 2 * $unit 9* 2 * $unit 10* 2 * $unit;
  border-radius: 4* 2 * $unit;
  border: 1* 2 * $unit solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: normal;
  height: 40* 2 * $unit;
}
.el-checkbox.is-bordered.is-checked {
  border-color: #409eff;
}
.el-checkbox.is-bordered.is-disabled {
  border-color: #ebeef5;
  cursor: not-allowed;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 10* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--medium {
  padding: 7* 2 * $unit 20* 2 * $unit 7* 2 * $unit 10* 2 * $unit;
  border-radius: 4* 2 * $unit;
  height: 36* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label {
  line-height: 17* 2 * $unit;
  font-size: 14* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__inner {
  height: 14* 2 * $unit;
  width: 14* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--small {
  padding: 5* 2 * $unit 15* 2 * $unit 5* 2 * $unit 10* 2 * $unit;
  border-radius: 3* 2 * $unit;
  height: 32* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label {
  line-height: 15* 2 * $unit;
  font-size: 12* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
  height: 12* 2 * $unit;
  width: 12* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner::after {
  height: 6* 2 * $unit;
  width: 2* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--mini {
  padding: 3* 2 * $unit 15* 2 * $unit 3* 2 * $unit 10* 2 * $unit;
  border-radius: 3* 2 * $unit;
  height: 28* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label {
  line-height: 12* 2 * $unit;
  font-size: 12* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner {
  height: 12* 2 * $unit;
  width: 12* 2 * $unit;
}
.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner::after {
  height: 6* 2 * $unit;
  width: 2* 2 * $unit;
}
.el-checkbox__input {
  cursor: pointer;
  line-height: 1;
}
.el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #edf2fc;
  border-color: #dcdfe6;
  cursor: not-allowed;
}
.el-checkbox__input.is-disabled .el-checkbox__inner::after {
  cursor: not-allowed;
  border-color: #c0c4cc;
}
.el-checkbox__input.is-disabled .el-checkbox__inner + .el-checkbox__label {
  cursor: not-allowed;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #c0c4cc;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
  background-color: #c0c4cc;
  border-color: #c0c4cc;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-checkbox__input.is-checked .el-checkbox__inner::after {
  -webkit-transform: rotate(45deg) scaleY(1);
  transform: rotate(45deg) scaleY(1);
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #409eff;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #409eff;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  content: "";
  position: absolute;
  display: block;
  background-color: #fff;
  height: 2* 2 * $unit;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 5* 2 * $unit;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::after {
  display: none;
}
.el-checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1* 2 * $unit solid #dcdfe6;
  border-radius: 2* 2 * $unit;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14* 2 * $unit;
  height: 14* 2 * $unit;
  background-color: #fff;
  z-index: 1;
  -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.el-checkbox__inner:hover {
  border-color: #409eff;
}
.el-checkbox__inner::after {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: "";
  border: 1* 2 * $unit solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7* 2 * $unit;
  left: 4* 2 * $unit;
  position: absolute;
  top: 1* 2 * $unit;
  -webkit-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 3* 2 * $unit;
  -webkit-transition: -webkit-transform 0.15s
    cubic-bezier(0.71, -0.46, 0.88, 0.6) 50ms;
  transition: -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 50ms;
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 50ms;
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 50ms,
    -webkit-transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 50ms;
  -webkit-transform-origin: center;
  transform-origin: center;
}
.el-checkbox__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  z-index: -1;
}
.el-checkbox-button,
.el-checkbox-button__inner {
  display: inline-block;
  position: relative;
}
.el-checkbox__label {
  display: inline-block;
  padding-left: 10* 2 * $unit;
  line-height: 19* 2 * $unit;
  font-size: 14* 2 * $unit;
}
.el-checkbox + .el-checkbox {
  margin-left: 30* 2 * $unit;
}
.el-checkbox-button__inner {
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
  background: #fff;
  border: 1* 2 * $unit solid #dcdfe6;
  border-left: 0;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12* 2 * $unit 20* 2 * $unit;
  font-size: 14* 2 * $unit;
  border-radius: 0;
}
.el-checkbox-button__inner.is-round {
  padding: 12* 2 * $unit 20* 2 * $unit;
}
.el-checkbox-button__inner:hover {
  color: #409eff;
}
.el-checkbox-button__inner [class*="el-icon-"] {
  line-height: 0.9;
}
.el-checkbox-button__inner [class*="el-icon-"] + span {
  margin-left: 5* 2 * $unit;
}
.el-checkbox-button__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  margin: 0;
  z-index: -1;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  -webkit-box-shadow: -1* 2 * $unit 0 0 0 #8cc5ff;
  box-shadow: -1* 2 * $unit 0 0 0 #8cc5ff;
}
.el-checkbox-button.is-disabled .el-checkbox-button__inner {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.el-checkbox-button:first-child .el-checkbox-button__inner {
  border-left: 1* 2 * $unit solid #dcdfe6;
  border-radius: 4* 2 * $unit 0 0 4* 2 * $unit;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.el-checkbox-button.is-focus .el-checkbox-button__inner {
  border-color: #409eff;
}
.el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 0 4* 2 * $unit 4* 2 * $unit 0;
}
.el-checkbox-button--medium .el-checkbox-button__inner {
  padding: 10* 2 * $unit 20* 2 * $unit;
  font-size: 14* 2 * $unit;
  border-radius: 0;
}
.el-checkbox-button--medium .el-checkbox-button__inner.is-round {
  padding: 10* 2 * $unit 20* 2 * $unit;
}
.el-checkbox-button--small .el-checkbox-button__inner {
  padding: 9* 2 * $unit 15* 2 * $unit;
  font-size: 12* 2 * $unit;
  border-radius: 0;
}
.el-checkbox-button--small .el-checkbox-button__inner.is-round {
  padding: 9* 2 * $unit 15* 2 * $unit;
}
.el-checkbox-button--mini .el-checkbox-button__inner {
  padding: 7* 2 * $unit 15* 2 * $unit;
  font-size: 12* 2 * $unit;
  border-radius: 0;
}
.el-checkbox-button--mini .el-checkbox-button__inner.is-round {
  padding: 7* 2 * $unit 15* 2 * $unit;
}
.el-checkbox-group {
  font-size: 0;
}
</style>

