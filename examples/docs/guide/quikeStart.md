## 快速上手

本节将介绍如何在项目中使用组件库。

### 引入 dby-base

你可以引入整个 dby-base，或是根据需要仅引入部分组件。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import DbyBase from 'dby-base';
import 'dby-base/lib/theme/index.css';
import App from './App.vue';

Vue.use(DbyBase);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

注意：样式文件需要单独引入。


#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "dby-base",
        "styleLibraryName": "theme"
      }
    ]
  ]
}

```

接下来，如果你只希望引入部分组件，比如 只需要引入素材通用模块中的Content（latex转义html解析），那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import App from './App.vue';
// 所有组件都带有base
import { Circle, Toast, Button, Checkbox, MessageBottom,
  MessageBox, MessageCase, Radio, Geste, Request, Env, WxApi,
  Logger, SocketApi, ImRez, ReponeFont, Helper, ErrorHandler } from 'dby-base'
Vue.config.productionTip = false
Vue.component(Circle.name, Circle)
Vue.component(Button.name, Button)
Vue.component(Checkbox.name, Checkbox)
Vue.component(MessageBottom.name, MessageBottom)
Vue.component(MessageCase.name, MessageCase)
Vue.component(Radio.name, Radio)
Vue.use(Helper)
Vue.use(Env)
Vue.use(Logger, {debug: 'openView'})
Vue.use(Request)
Vue.use(ErrorHandler)
Vue.use(SocketApi)
Vue.use(WxApi)
Vue.use(Geste)
Vue.use(ImRez)
Vue.use(Toast)
Vue.use(MessageBox)
ReponeFont.init()
/* 或写为
 * Vue.use(Input)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```
