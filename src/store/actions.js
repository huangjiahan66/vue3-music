import { PLAY_MODE } from "@/assets/js/constans";
import { shuffle } from "@/assets/js/util";
export function selectPlay({ commit }, { list, index }) {
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlayList", list);
  commit("setCurrentIndex", index);
}

export function randomPlay({ commit }, list) {
  commit("setPlayMode", PLAY_MODE.random);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlayList", shuffle(list));
  commit("setCurrentIndex", 0);
}

export function changeMode({ commit, state, getters }, mode) {
  // 缓存当前歌曲播放的id
  const currentId = getters.currentSong.id;
  if (mode === PLAY_MODE.random) {
    // 切成随机模式的时候
    commit("setPlayList", shuffle(state.sequenceList));
  } else {
    // 顺序播放或者循环播放
    commit("setPlayList", state.sequenceList);
  }

  const index = state.playList.findIndex((song) => {
    return song.id === currentId;
  });
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}
