/**
 * @export
 * @param {查询对象} object
 * @returns
 */
export function $type (object) {
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
export function $getType (parame, type) {
  switch (typeof type) {
    case 'string':
      return $type(parame) === type
    case 'object':
      return type.indexOf($type(parame)) !== -1
  }
  return false
}
/**
 * 获取页面url参数 无传参直接调用
 */
export function $getUrlData () {
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
export function $getStringType (str) {
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

export function $getStore (name) {
  if (!name) return
  let data = window.localStorage.getItem(name)
  if (!data) {
    return false
  }
  try {
    const json = JSON.parse(data)
    data = json
  } catch (error) {
    return error
  }
  return data
}
