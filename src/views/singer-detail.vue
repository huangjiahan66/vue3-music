<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import MusicList from "../components/music-list/music-list.vue";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constans";
export default {
  name: "singer-detail",
  props: {
    singer: Object,
  },
  components: { MusicList },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  async created() {
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path;
      // console.log(this.$route.matched[0].path); //上级路由
      this.$router.push({
        path,
      });
      return;
    }
    const result = await getSingerDetail(this.computedSinger); //歌手详情
    this.songs = await processSongs(result.songs); //每个歌手的音乐详情

    this.loading = false;
  },
  computed: {
    computedSinger() {
      let ret = null;
      const singer = this.singer;
      if (singer) {
        ret = singer;
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY);
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          ret = cachedSinger;
        }
      }
      return ret;
    },
    pic() {
      const singer = this.computedSinger;
      return singer && singer.pic;
    },
    title() {
      const singer = this.computedSinger;
      return singer && singer.name;
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
