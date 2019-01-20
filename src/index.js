import ReponeFont from './service/reponeFont'
import PageConfig from './mixins/pageConfig'
import Request from './service/axios/index'
import Logger from './extend/logger'
import WxApi from './service/wx'
import ErrorHandler from './mixins/errorHandler'
import Env from './env'
import PayPop from '../packages/pay-pop'
import Toast from '../packages/toast'
import MessageBox from '../packages/message-box'
const version = '2.0.0'
export {
  version,
  ReponeFont,
  PageConfig,
  Request,
  Logger,
  WxApi,
  ErrorHandler,
  Env,
  PayPop,
  Toast,
  MessageBox
}
