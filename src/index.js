import payPop from '../packages/pay-pop';
const install = function(Vue) {
    Vue.component(payPop.name, payPop);
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};