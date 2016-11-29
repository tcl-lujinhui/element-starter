export default {
  install(Vue) {
    // Vue.prototype.$myName = "zhagngsan";
    Vue.prototype.$get = (value) => {

    };
    Vue.prototype.$post = (value) => {

    };

    Vue.directive("uname", {
      bind() {
        console.log("bind"); // 只会调用一次
      },
      update(el, binding, vnode) {
        console.log(el);
        console.log(binding);
        console.log(vnode);
      },
    })
  }
}
