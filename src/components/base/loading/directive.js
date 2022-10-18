import { addClass, removeClass } from "@/assets/js/dom";
import { createApp } from "vue";
import Loading from "./loading.vue";
const relativeCls = "g-relative";
// 指定对象
const loadingDirective = {
  // 组件挂载后
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    // console.log(instance);
    el.instance = instance;
    // console.log(el.instance);
    const title = binding.arg;
    if (typeof title !== "undefined") {
      instance.setTitle(title);
    }
    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
    const title = binding.arg;
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
  },
};

function append(el) {
  const style = getComputedStyle(el);

  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relativeCls);
  }
  el.appendChild(el.instance.$el);
}
function remove(el) {
  removeClass(el, relativeCls);
  el.removeChild(el.instance.$el);
}

export default loadingDirective;
