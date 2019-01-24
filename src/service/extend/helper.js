/*
 * @Author: jake
 * @Date: 2019-01-20 11:51:30
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-24 17:56:22
 * 工具类型的封装都放在这里
 */
/**
 * @export
 * @param {查询对象} object
 * @returns
 */
export function type (object) {
  let class2type = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Object]': 'object',
    '[object Error]': 'error'
  }
  return class2type[Object.prototype.toString.call(object)]
}
/**
 * @export
 * @param {当前判断的参数} parame
 * @param {是否包含类型} type
 * @returns
 */
export function getType (parame, _type) {
  switch (typeof _type) {
    case 'string':
      return type(parame) === _type
    case 'object':
      return _type.indexOf(type(parame)) !== -1
  }
  return false
}
/**
 * 获取页面url参数 无传参直接调用
 */
export function getUrlData () {
  let url = decodeURIComponent(location.href) // 获取url中"?"符后的字串
  const index = url.indexOf('?')
  const theRequest = {}
  if (index !== -1) {
    url = url.substring(index, url.length)
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}

/**
 * @export
 * @param {检查字符串是数组还是josn} str
 */
export function getStringType (str) {
  if (str) {
    try {
      let type
      JSON.parse(str).length === undefined ? type = 'object' : type = 'array'
      return type
    } catch (error) {
      return false
    }
  }
}

export function getHash () {
  let hash = window.location.hash
  let index = hash.indexOf('?')
  if (index === -1) index = hash.length
  return hash.substring(hash.indexOf('#') + 1, index)
}

export function getStore (name) {
  if (!name) name = getHash()
  let data = window.localStorage.getItem(name)
  if (!data) {
    return false
  }
  try {
    data = JSON.parse(data)
  } catch (error) {
    return data
  }
  return data
}

export function setStore (content) {
  let name = getHash()
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export function getTime (mode) {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  switch (mode) {
    case 'YYYY-MM-DD':
      return year + '-' + month + '-' + day
    default:
      break
  }
}
