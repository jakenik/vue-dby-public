import '../../style/index.css'
export default {
  methods: {
    getParentNode () {
      return {
        height: this.$parent.$el.offsetHeight,
        width: this.$parent.$el.offsetWidth,
        top: this.$parent.$el.offsetTop,
        left: this.$parent.$el.offsetLeft
      }
    },
    getNodeQuery (el) {
      return {
        height: el.offsetHeight,
        width: el.offsetWidth,
        top: el.offsetTop,
        left: el.offsetLeft
      }
    }
  }
}
