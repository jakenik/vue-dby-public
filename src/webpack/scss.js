/*
 * @Author: jake
 * @Date: 2019-01-22 13:42:54
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-22 13:43:44
 * 输出sass打包时候混入全局变量
 */
export default function generateSassResourceLoader ({
  cssLoader,
  options,
  ExtractTextPlugin,
  path
}) {
  var resolveResource = function (name) {
    return path.resolve(__dirname, './style/' + name)
  }
  var loaders = [
    cssLoader,
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
        resources: [resolveResource('mixins.scss')]
      }
    }
  ]
  if (options.extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}
