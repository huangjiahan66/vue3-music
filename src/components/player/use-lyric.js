import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { getLyric } from "@/service/song";
import Lyric from "lyric-parser";
export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null);
  const currentLineNum = ref(0); //当前显示的行号
  const lyricScrollRef = ref(null);
  const lyricListRef = ref(null);

  const store = useStore();
  const currentSong = computed(() => store.getters.currentSong);
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return;
    }
    const lyric = await getLyric(newSong);
    store.commit("addSongLyric", {
      song: newSong,
      lyric,
    });
    if (currentSong.value.lyric !== lyric) {
      return;
    }
    currentLyric.value = new Lyric(lyric, handleLyric);
    // 当歌词开始播放时候
    if (songReady.value) {
      playLyric();
    }
  });

  // 播放歌词
  function playLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000);
    }
  }

  function handleLyric({ lineNum }) {
    currentLineNum.value = lineNum;

    const scrollComp = lyricScrollRef.value;
    const listEl = lyricListRef.value;
    // debugger;
    if (!listEl) {
      return;
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5];
      scrollComp.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000);
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
  };
}
