<template>
  <div id="app">
    <!--路由展示区-->
    <router-view></router-view>
  </div>
</template>
<script>
  // @ is an alias to /src
  export default {
    name: 'app',
    data(){
      return {
        tabShow: false
      }
    },
    methods:{
    },
    computed:{
    },
    components: {
    }
  }
</script>
<style lang="less">
  #app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height:100%;
    width: 100%;
    height: 100%;
  }
</style>
