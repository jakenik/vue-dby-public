import errorRequset from '../extend/errorRequset'
import '../../style/index.css'
class ErrorHandler {
  install (Vue) {
    Vue.prototype.$errorRequset = errorRequset
    Vue.config.errorHandler = (error) => {
      console.error(error)
      errorRequset({Vue, error, errorHttpSrc: '无', errorHttpData: '无'})
    }
  }
}

export default new ErrorHandler()
