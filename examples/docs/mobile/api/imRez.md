<script>
export default {
  methods: {
    onChangeUpladFile (e) {
      let files = e.target.files;
      for(let file of files){
        this.$imRez.upladFile({file, url: this.$env.apiH5 + '/a', data: {'c':'11'}, method: 'POST', succ(){}, fail(){}})
      } 
    },
    onChangePhotoCompress(e) {
      let files = e.target.files;
      for(let file of files){
        this.$imRez.photoCompress(
          file,
          {
            quality: 0.1
          },
          base64Codes => {
            this.$refs.img.src = base64Codes
          }
        )
      } 
    }
  }
}
</script>
## imRez图片压缩
```javascript
  import { ImRez } from 'dby-base'
  Vue.use(ImRez)
  // 访问 this.$imRez
```
#### upladFile 上传图片文件
:::demo
``` html
<template>
  <input type="file" name="image"  accept="image/*" @change="onChangeUpladFile">
</template>
<script>
export default {
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
  methods: {
    onChangeUpladFile (e) {
      let files = e.target.files;
      for(let file of files){
        this.$imRez.upladFile({file, url: this.$env.apiH5 + '/a', data: {}, method: 'POST', succ(){}, fail(){}})
      } 
    }
  }
}
</script>
```
:::

#### photoCompress 直接压缩返回base64
:::demo
``` html
<template>
  <div>
    <input type="file" name="image"  accept="image/*" @change="onChangePhotoCompress">
    <img src=""  ref="img" style="max-width: 500px;">
  </div>
</template>
<script>
export default {
  methods: {
    onChangePhotoCompress(e) {
      let files = e.target.files;
      for(let file of files){
        /**
         * @param
         * file 文件流
         * quality 压缩比例
         * base64
         */
        this.$imRez.photoCompress(
          file,
          {
            quality: 0.1
          },
          base64Codes => {
            this.$refs.img.src = base64Codes
          }
        )
      } 
    }
  }
}
</script>
```
:::