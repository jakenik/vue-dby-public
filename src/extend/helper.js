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
