<template>
  <div class="singer" v-loading="!singers.length">
    <indexList :data="singers" @select="selectSinger"></indexList>

    <!-- <router-view :singer="selectedSinger"></router-view> -->

    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singer";
import indexList from "@/components/base/index-list/index.list.vue";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constans";
export default {
  name: "singer",
  components: {
    indexList,
  },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.cacheSinger(singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
    // 缓存到本地存储 sessionStorage
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
