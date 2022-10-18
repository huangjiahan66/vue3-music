import { useStore } from "vuex";
import { computed } from "vue";
import { save, remove } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constans";
export default function useFavorite() {
  // 根据歌曲是否在收藏列表
  const store = useStore();
  const favoriteList = computed(() => store.state.favoriteList);
  const maxLen = 100;
  function getFavoriteIcon(song) {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }
  function isFavorite(song) {
    return (
      favoriteList.value.findIndex((item) => {
        return item.id === song.id;
      }) > -1
    );
  }

  function toggleFavorite(song) {
    let list;
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare);
      //remove
    } else {
      list = save(song, FAVORITE_KEY, compare);
      //save
    }
    store.commit("setfavoriteList", list);

    function compare(item) {
      return item.id === song.id;
    }
  }

  return { toggleFavorite, getFavoriteIcon };
}
