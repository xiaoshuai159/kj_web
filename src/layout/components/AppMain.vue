<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <router-view :key="key" /> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="key"/>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 40px);
  /* background-color: #eaf1f7; */
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
