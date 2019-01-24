import ReponeFont from './service/extend/reponeFont'
import PageConfig from './service/mixins/pageConfig'
import Request from './service/api/axios/index'
import Logger from './service/extend/logger'
import WxApi from './service/api/wx/index'
import SocketApi from './service/api/webSocket/index'
import ErrorHandler from './service/mixins/errorHandler'
import Env from './service/env/index'

// import PayPop from './packages/pay-pop/index'
import Toast from './packages/toast/index'
import MessageBox from './packages/message-box/index'
import MessageBottom from './packages/message-bottom/index'
import MessageCase from './packages/message-case/index'
import CircleView from './packages/circle-view/index'
import Radio from './packages/radio/index'
import Checkbox from './packages/checkbox/index'

const version = '2.1.1'
export {
  version,
  ReponeFont,
  PageConfig,
  Request,
  Logger,
  WxApi,
  SocketApi,
  ErrorHandler,
  Env,
  // PayPop,
  Toast,
  MessageBox,
  MessageBottom,
  MessageCase,
  CircleView,
  Radio,
  Checkbox
}
