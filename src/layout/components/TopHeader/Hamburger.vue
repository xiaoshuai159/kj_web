<template>
    <div class="navbar">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  
  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .navbar {
    height: 40px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgb(255, 255, 255);
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  
    .hamburger-container {
      line-height: 36px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
  
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  
    .breadcrumb-container {
      float: left;
    }
  }
  </style>
  
  