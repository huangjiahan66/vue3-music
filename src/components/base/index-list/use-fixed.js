import { ref, watch, nextTick, computed } from "vue";
export default function useFixed(props) {
  const TITLE_HEIGHT = 30;
  const groupRef = ref(null);
  const listHeights = ref([]); // 每个组的高度区间
  const scrollY = ref(0); //纵向滚动i的值
  const currentIndex = ref(0); //当前渲染组的索引
  const distance = ref(0);

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });
  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0;

    return {
      transform: `translate3d(0,${diff}px,0)`,
    };
  });

  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );

  watch(scrollY, (newY) => {
    const listHeightVal = listHeights.value;
    for (let i = 0; i < listHeightVal.length - 1; i++) {
      const hegihtTop = listHeightVal[i];
      const hegihtBottom = listHeightVal[i + 1];
      if (newY >= hegihtTop && newY <= hegihtBottom) {
        currentIndex.value = i;
        distance.value = hegihtBottom - newY;
      }
    }
  });

  // 列表高度函数
  function calculate() {
    // children 每个组的dom
    const list = groupRef.value.children;
    const listHeightVal = listHeights.value;
    let hegiht = 0; //区间高度

    listHeightVal.length = 0;
    listHeightVal.push(hegiht);
    for (let i = 0; i < list.length; i++) {
      hegiht += list[i].clientHeight;
      listHeightVal.push(hegiht);
    }
  }
  function onScroll(pos) {
    scrollY.value = -pos.y;
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex,
  };
}
