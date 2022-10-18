const mutations = {
  // 修改播放状态
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  // 设置顺序播放列表
  setSequenceList(state, list) {
    state.sequenceList = list;
  },
  // 设置播放列表
  setPlayList(state, list) {
    state.playList = list;
  },
  // 设置播放模式
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  setfavoriteList(state, list) {
    state.favoriteList = list;
  },
  addSongLyric(state, { song, lyric }) {
    state.sequenceList.map((item) => {
      if (item.mid === song.mid) {
        item.lyric = lyric;
      }
      return item;
    });
  },
};

export default mutations;
