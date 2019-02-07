import BaseCircle from './components/base-circle'
import BaseToast from './components/base-toast'
import BaseButton from './components/base-button'
import BaseCheckbox from './components/base-checkbox'
import BaseMessageBottom from './components/base-message-bottom'
import BaseMessageBox from './components/base-message-box'
import BaseMessageCase from './components/base-message-case'
import BaseRadio from './components/base-radio'

import BaseGeste from './directives/base-geste'

import Request from './service/api/axios/index'
import Env from './service/env/index'
import WxApi from './service/api/wx/index'
import Logger from './service/extend/logger'
import SocketApi from './service/api/webSocket/index'
import ImRez from './service/api/imRez/index'
import ReponeFont from './service/extend/reponeFont.js'
import Helper from './service/extend/helper.js'
import ErrorHandler from './service/mixins/errorHandler.js'
const version = '0.0.2'
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

function install (Vue) {
  Vue.component(BaseCircle.name, BaseCircle)
  Vue.component(BaseButton.name, BaseButton)
  Vue.component(BaseCheckbox.name, BaseCheckbox)
  Vue.component(BaseMessageBottom.name, BaseMessageBottom)
  Vue.component(BaseMessageCase.name, BaseMessageCase)
  Vue.component(BaseRadio.name, BaseRadio)
  Vue.use(Helper)
  Vue.use(Env)
  Vue.use(Logger, {debug: 'openLog'})
  Vue.use(Request)
  Vue.use(ErrorHandler)
  Vue.use(SocketApi)
  Vue.use(WxApi)
  Vue.use(BaseGeste)
  Vue.use(ImRez)
  Vue.use(BaseToast)
  Vue.use(BaseMessageBox)
  Vue.use(ReponeFont)
}

export default {
  install,
  BaseToast,
  BaseCircle,
  BaseButton,
  BaseCheckbox,
  BaseMessageBottom,
  BaseMessageBox,
  BaseGeste,
  BaseMessageCase,
  BaseRadio,
  Request,
  Env,
  WxApi,
  Logger,
  ImRez,
  ReponeFont,
  Helper,
  ErrorHandler,
  version
}
