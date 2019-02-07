
## 自定义方法

当前所有方法集合都会放在这个实例当中，大家在开发当中会在本地也放一个helper。会把两个helper合并 以便于开发时候修改。并在版本发布的时候更新插件里的helper

```javascript
  import { Helper } from 'dby-base'
  Vue.use(Helper)
  // 访问 this.$helper
```
#### 当前方法有
```javascript
/**
 * 这边有必要说一下 所有本地储存都走这个方法！！！
 * getStore 得到
 * setStore 设置
 * removeStore 删除
 */
getStore (name)
setStore (content)
removeStore (name)
/**
 * @export
 * @param {查询对象} object
 * @returns
 */
type (object)
/**
 * @export
 * @param {当前判断的参数} parame
 * @param {是否包含类型} type
 * @returns
 */
getType (parame, _type)
/**
 * 获取页面url参数 无传参直接调用
 */
getUrlData ()
/**
 * @export
 * @param {检查字符串是数组还是json} str
 */
getStringType (str)
/*
* 得到链接上的hash
*/
getHash () 

/**
 * 存储sessionStorage
 */
setSessionStorage (content) 
/**
 * 得到sessionStorage
 */
getSessionStorage (name)
/**
 * 删除sessionStorage
 */
removeSessionStorage (name)
/**
 * 挂载监听
 */
on (obj, sev, fn)

off (obj, sev, fn)
/**
 * 获得当前所处环境
 * return {
 *   isTablet: isTablet,
 *   isPhone: isPhone,
 *   isAndroid: isAndroid,
 *   isPc: isPc,
 *   isChrome
 * }
 */
browser ()
/**
 * 得到时间
 * 'YYYY-MM-DD'
 * 'YYYY-MM-DD HH:mm:ss'
 */
getTime (mode)
/**
 * 检测类 Reutrn true || false
 */
hasClass (el, cls)
/**
 * 添加类
 */
addClass (el, cls)
/**
 * 删除类
 */
removeClass (el, cls)
/**
 * 添加节点给div
 */
append (el, node)
```