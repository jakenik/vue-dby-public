/*
 * @Author: jake
 * @Date: 2019-01-27 10:24:22
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-27 14:15:58
 * 图片压缩插件
 */
import '../../../style/index.css'
const ImRez = class ImRez {
  install (Vue) {
    Vue.prototype.$imRez = this
  }
  photoCompress (file, w, objDiv) {
    let that = this
    let ready = new FileReader()
    /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容. */
    ready.readAsDataURL(file)
    ready.onload = function () {
      let re = this.result
      that.canvasDataURL(re, w, objDiv)
    }
  }
  canvasDataURL (path, obj, callback) {
    let img = new Image()
    img.src = path
    let quality = obj.quality
    img.onload = function () {
      let that = this
      // 默认按比例压缩
      let w = that.width
      let h = that.height
      let scale = w / h
      w = obj.width || w
      h = obj.height || w / scale
      // 生成canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 创建属性节点
      let anw = document.createAttribute('width')
      anw.nodeValue = w
      let anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      // 图像质量

      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality)
      // 回调函数返回base64的值
      callback(base64)
    }
  }
  /**
   * 将以base64的图片url数据转换为Blob
   * @param urlData
   * 用url方式表示的base64图片数据
   */
  convertBase64UrlToBlob (urlData) {
    let arr = urlData.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  getTarget (res) {
    let response = res.target.response
    try {
      response = JSON.parse(response)
      return response
    } catch (e) {
      return e
    }
  }

  /**
   * @param
   * file 文件流
   * url 上传地址
   * data 上传带参
   * method 请求方式
   * size 默认1m超出这个限制就压缩
   * succ 成功回调
   * fail失败回调
   * quality 压缩比例 默认0.7
   */
  upladFile ({file, url, data, method, size = 1024, succ, fail, quality = 0.7}) {
    let xhr
    let fileObj = file // js 获取文件对象
    let form = new FormData() // FormData 对象
    for (let key in data) {
      form.append(key, data[key])
    }
    let send = (base64) => {
      xhr = new XMLHttpRequest() // XMLHttpRequest 对象
      xhr.open(method, url, true) // post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.onload = res => {
        // let s = this.getTarget(res);
        succ(res, base64)
      } // 请求完成
      xhr.onerror = res => {
        // let s = this.getTarget(res);
        fail(res, base64)
      } // 请求失败
      xhr.send(form) // 开始上传，发送form数据
    }
    this.quality = quality
    if (fileObj.size / 1024 > size) {
      // 大于1M，进行压缩上传
      this.photoCompress(
        fileObj,
        {
          quality: this.quality
        },
        base64Codes => {
          let bl = this.convertBase64UrlToBlob(base64Codes)
          form.append('file', bl, 'file_' + Date.parse(new Date()) + '.jpg') // 文件对象
          send(base64Codes)
        }
      )
    } else {
      // 小于等于1M 原图上传
      form.append('file', fileObj) // 文件对象
      send()
    }
  }
}
export default new ImRez()
