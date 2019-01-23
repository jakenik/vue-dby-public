import Vue from 'vue'
let LoggerViewConstructor = Vue.extend(require('./logger-view').default)
let getTance = () => {
  return new LoggerViewConstructor({
    el: document.createElement('div')
  })
}
let LoggerView = () => {
  let instance = getTance()
  document.body.appendChild(instance.$el)
}
export default LoggerView
