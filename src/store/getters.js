//当前播放歌曲是什么
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {};
};
