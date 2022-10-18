<template>
  <m-header></m-header>
  <Tab></Tab>
  <router-view />
  <player></player>
</template>

<script>
import Header from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
import player from "@/components/player/player.vue";
export default {
  components: {
    MHeader: Header,
    Tab,
    player,
  },
};
</script>
<style lang="scss"></style>
