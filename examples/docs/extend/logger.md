<script lang="babel">
export default {
  mounted() {
    this.$logger.info('打印一下')
  }
}
</script>
## logger打印
开启log的debug close关闭 openView打开在视图上 openLog打开在浏览器上 你可以更具当前的环境去动态切换 开发时候打开 打包时候关闭
```javascript
  import { Logger } from 'dby-base'
  Vue.use(Logger, {debug: 'openLog'})
  // 访问 this.$logger
```
#### 当前方法有
```javascript
  $logger.log () 
  $logger.info ()
  $logger.warn ()
  $logger.error()
```