import { useIntersectionObserver } from "@vueuse/core";

export const lazyPlugin = {
  install(app) {
    //懒加载逻辑代码
    // 定义全局指令
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el表示绑定的那个元素
        // binding: binding.value  指令等于号后面绑定的表达式的值 图片url
        // console.log(el, binding.value);
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // console.log(isIntersecting);
          if (isIntersecting) {
            //进入视口区域
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
