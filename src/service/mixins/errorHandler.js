import errorRequset from '../extend/errorRequset'
class ErrorHandler {
  errorHandler (error) {
    console.error(error)
    errorRequset({error, errorHttpSrc: '无', errorHttpData: '无'})
  }
}

export default new ErrorHandler().errorHandler
