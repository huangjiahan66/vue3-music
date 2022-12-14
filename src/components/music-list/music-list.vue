<template>
  <div class="music-list">
    <div class="back" @click="goBack"><i class="icon-back"></i></div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImage" :style="bgImageStyle">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div class="play-btn" v-show="songs.length > 0" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部音乐</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll.vue";
import SongList from "@/components/base/song-list/song-list.vue";
import { mapActions } from "vuex";
const RESERVED_HEIGHT = 40; // 顶部的距离
export default {
  components: {
    Scroll,
    SongList,
  },
  props: {
    // 歌曲列表
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String, //标题
    pic: String, //背景图片
    loading: Boolean,
  },
  data() {
    return {
      imageHeight: 0, //图片高度
      scrollY: 0,
      maxTranslateY: 0, // 最大可以滚动的距离
    };
  },
  computed: {
    bgImageStyle() {
      const scrollY = this.scrollY; // y
      let zIndex = 0;
      let paddingTop = "70%";
      let height = 0;
      let translateZ = 0; // 适配苹果兼容
      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }

      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }
      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      if (scrollY >= 0) {
        blur = Math.min(
          this.maxTranslateY / imageHeight,
          (scrollY / imageHeight) * 20
        );
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    playBtnStyle() {
      let display = "";
      if (this.scrollY >= this.maxTranslateY) {
        display = "none";
      }
      return { display };
    },
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT; // 290-40

    console.log(this.imageHeight);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
      console.log(this.scrollY);
    },
    selectItem({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    random() {
      this.randomPlay(this.songs);
    },
    ...mapActions(["selectPlay", "randomPlay"]),
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    // height: 0;
    // padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    // overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
