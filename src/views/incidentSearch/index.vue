<template>
    <div>
        incidentSearch
    </div>
  </template>
  
  <script>
  export default {
    name: 'incidentSearch',
    data() {
      return {
      };
    },
    created() {
      // 在页面创建时进行重定向
      this.redirectToAnotherPage();
    },
    methods: {
      redirectToAnotherPage() {
      // 使用 $router.push 方法进行重定向
        this.$router.push('/incidentSearch/redirectPage');
      }
    }
  }
  
  </script>
  
  <style lang="less" scoped>
  
  </style>
  