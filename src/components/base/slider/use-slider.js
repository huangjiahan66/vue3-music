import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import { onMounted, onUnmounted, ref } from "vue";

BScroll.use(Slide);

export default function useSlider(wrapperRef) {
  const slider = ref(null);
  // console.log(slider.value);
  const currentPageIndex = ref(0);

  // 初始化
  onMounted(() => {
    const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }));

    // 改变page 就是左右滑动的时候
    sliderVal.on("slideWillChange", (page) => {
      currentPageIndex.value = page.pageX;
    });
  });

  onUnmounted(() => {
    slider.value.destroy();
  });

  return {
    slider,
    currentPageIndex,
  };
}
