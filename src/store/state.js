import { PLAY_MODE, FAVORITE_KEY } from "@/assets/js/constans";
import { load } from "@/assets/js/array-store";
const state = {
  sequenceList: [], // 顺序播放列表
  playList: [], //正在播放的列表
  playing: false, //是否在播放
  playMode: PLAY_MODE.sqeuence, //顺序播放
  currentIndex: 0, //播放哪一首歌
  fullScreen: false, //全屏还是收缩的
  favoriteList: load(FAVORITE_KEY), //收藏歌曲列表
};

export default state;
