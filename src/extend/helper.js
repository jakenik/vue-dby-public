/**
 *
 * @export
 * @param {当前判断的参数} parame
 * @param {是否包含类型} type
 * @returns
 */
export function getType (parame, type) {
  switch (typeof type) {
    case 'string':
      // eslint-disable-next-line valid-typeof
      return typeof parame === type
    case 'object':
      for (let i = 0; i < type.length; i++) {
        // eslint-disable-next-line valid-typeof
        if (typeof parame === type[i]) {
          return true
        }
      }
  }
  return false
}
