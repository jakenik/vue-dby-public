const buildUrl = url => `./src/${url}`
const Guide = () => import('./docs/guide/index.md')
const Install = () => import('./docs/guide/install.md')
const QuikeStart = () => import('./docs/guide/quikeStart.md')
const Readme = () => import('./docs/guide/readme.md')
const Know = () => import('./docs/guide/know.md')
const Env = () => import('./docs/env/index.md')
const Extend = () => import('./docs/extend/index.md')
const ReponeFont = () => import('./docs/extend/reponeFont.md')
const Helper = () => import('./docs/extend/helper.md')
const Logger = () => import('./docs/extend/logger.md')
const Mixins = () => import('./docs/mixins/index.md')
const ErrorHandler = () => import('./docs/mixins/errorHandler.md')
const PageConfig = () => import('./docs/mixins/pageConfig.md')
const Mobile = () => import('./docs/mobile/index.md')
const Components = () => import('./docs/mobile/components/index.md')
const BaseCircle = () => import('./docs/mobile/components/base-circle.md')
const BaseToast = () => import('./docs/mobile/components/base-toast.md')
const BaseMessageBottom = () => import('./docs/mobile/components/base-message-bottom.md')
const BaseMessageBox = () => import('./docs/mobile/components/base-message-box.md')
const BaseMessageCase = () => import('./docs/mobile/components/base-message-case.md')
const BaseRadio = () => import('./docs/mobile/components/base-radio.md')

const BaseButton = () => import('./docs/mobile/components/base-button.md')
const BaseCheckbox = () => import('./docs/mobile/components/base-checkbox.md')
const Directives = () => import('./docs/mobile/directives/index.md')
const Geste = () => import('./docs/mobile/directives/geste.md')
const Api = () => import('./docs/mobile/api/index.md')
const Axios = () => import('./docs/mobile/api/axios.md')
const WxApi = () => import('./docs/mobile/api/wxApi.md')
const SocketApi = () => import('./docs/mobile/api/socketApi.md')
const ImRez = () => import('./docs/mobile/api/imRez.md')

const routes = [{
  path: '/',
  redirect: '/guide/install'
},
{
  path: '/guide',
  component: Guide,
  name: '开发指南',
  children: [{
    path: 'install',
    name: '安装',
    component: Install
  },
  {
    path: 'quikeStart',
    name: '快速上手',
    component: QuikeStart
  },
  {
    path: 'readme',
    name: '目录描述',
    component: Readme
  },
  {
    path: 'know',
    name: '开发需知',
    component: Know
  }],
  icon: 'el-icon-edit-outline'
},
{
  path: '/env',
  component: Env,
  name: '环境',
  buildName: 'env',
  buildUrl: buildUrl('service/env/index.js'),
  icon: 'el-icon-sort'
},
{
  path: '/extend',
  component: Extend,
  name: '扩展',
  icon: 'el-icon-share',
  children: [
    {
      path: 'reponeFont',
      name: 'reponeFont 适配',
      component: ReponeFont,
      buildName: 'repone-font',
      buildUrl: buildUrl('service/extend/reponeFont.js')
    },
    {
      path: 'helper',
      name: 'helper 方法',
      component: Helper,
      buildName: 'helper',
      buildUrl: buildUrl('service/extend/helper.js')
    },
    {
      path: 'logger',
      name: 'logger 控制台',
      component: Logger,
      buildName: 'logger',
      buildUrl: buildUrl('service/extend/logger.js')
    }
  ]
},
{
  path: '/mixins',
  component: Mixins,
  name: '混入',
  icon: 'el-icon-refresh',
  children: [
    {
      path: 'errorHandler',
      component: ErrorHandler,
      name: '全局错误捕获',
      buildName: 'error-handler',
      buildUrl: buildUrl('service/mixins/errorHandler.js')
    },
    {
      path: 'pageConfig',
      component: PageConfig,
      name: '页面配置',
      buildName: 'page-config',
      buildUrl: buildUrl('service/mixins/pageConfig.js')
    }
  ]
},
{
  path: '/mobile',
  component: Mobile,
  name: '手机端组件',
  group: true,
  icon: 'el-icon-mobile-phone',
  children: [
    {
      path: 'components',
      name: '组件',
      component: Components,
      children: [
        {
          path: 'circle',
          name: 'circle 水波',
          component: BaseCircle,
          buildName: 'circle',
          buildUrl: buildUrl('components/base-circle')
        },
        {
          path: 'toast',
          name: 'toast 提示窗',
          component: BaseToast,
          buildName: 'toast',
          buildUrl: buildUrl('components/base-toast')
        },
        {
          path: 'button',
          name: 'button 按钮',
          component: BaseButton,
          buildName: 'button',
          buildUrl: buildUrl('components/base-button')
        },
        {
          path: 'checkbox',
          name: 'checkbox 多选框',
          component: BaseCheckbox,
          buildName: 'checkbox',
          buildUrl: buildUrl('components/base-checkbox')
        },
        {
          path: 'messageBottom',
          name: 'messageBottom 弹窗',
          component: BaseMessageBottom,
          buildName: 'message-bottom',
          buildUrl: buildUrl('components/base-message-bottom')
        },
        {
          path: 'messageBox',
          name: 'messageBox 弹窗',
          component: BaseMessageBox,
          buildName: 'message-box',
          buildUrl: buildUrl('components/base-message-box')
        },
        {
          path: 'messageCase',
          name: 'messageCase 带框',
          component: BaseMessageCase,
          buildName: 'message-case',
          buildUrl: buildUrl('components/base-message-case')
        },
        {
          path: 'baseRadio',
          name: 'baseRadio 单选框',
          component: BaseRadio,
          buildName: 'radio',
          buildUrl: buildUrl('components/base-radio')
        }
      ]
    },
    {
      path: 'directives',
      name: '指令',
      component: Directives,
      children: [
        {
          path: 'geste',
          name: 'geste 点击水波',
          component: Geste,
          buildName: 'geste',
          buildUrl: buildUrl('directives/base-geste')
        }
      ]
    },
    {
      path: 'api',
      name: 'api封装',
      component: Api,
      children: [
        {
          path: 'axios',
          name: 'axios 请求封装',
          component: Axios,
          buildName: 'request',
          buildUrl: buildUrl('service/api/axios/index.js')
        },
        {
          path: 'wx',
          name: 'wx 请求封装',
          component: WxApi,
          buildName: 'wx-api',
          buildUrl: buildUrl('service/api/wx/index.js')
        },
        {
          path: 'socketApi',
          name: 'webSocket 封装',
          component: SocketApi,
          buildName: 'socket-api',
          buildUrl: buildUrl('service/api/webSocket/index.js')
        },
        {
          path: 'imRez',
          name: 'imRez 图片压缩',
          component: ImRez,
          buildName: 'im-rez',
          buildUrl: buildUrl('service/api/imRez/index.js')
        }
      ]
    }
  ]
}]

module.exports = routes
