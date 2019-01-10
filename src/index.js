import PayPop from '../packages/pay-pop';
const version = "1.0.6";
const install = function(Vue) {

};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};
export {
    version,
    PayPop
}