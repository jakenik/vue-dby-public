import Vue from 'vue'

const gesteConstructor = Vue.extend(require('./geste.vue').default)
let gestePool = []

let getAnInstance = () => {
  if (gestePool.length > 0) {
    let instance = gestePool[0]
    gestePool.splice(0, 1)
    return instance
  }
  return new gesteConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    gestePool.push(instance)
  }
}

let removeDom = (event) => {
  if (event.target.parentNode && event.path[0].visible === false) {
    event.target.parentNode.removeChild(event.target)
  }
}

gesteConstructor.prototype.close = function () {
  this.visible = false
  this.$el.visible = false
  this.$el.addEventListener('transitionend', removeDom)
}

let geste = (options = {}) => {
  let instance = getAnInstance()
  let { el, top, left } = options
  instance.setStyle(el)
  instance.top = top
  instance.left = left
  el.appendChild(instance.$el)
  
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
  })
  return instance
}

export default geste
