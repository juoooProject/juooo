<template>
  <div id="app">
    <!--中间路由展示区-->
    <router-view></router-view>
    <!--底部菜单-->
    <div class="footer-nav">
      <div class="nav-item">
        <router-link to="/">
          <p class="icon home"></p>
          <p class="text">首页</p>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/performance">
          <p class="icon perform"></p>
          <p class="text">演出库</p>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/mine">
          <p class="icon mine"></p>
          <p class="text">我的</p>
        </router-link>
      </div>
    </div>
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
    .footer-nav {
      position: fixed;
      bottom:0;
      left:0;
      z-index: 11;
      width: 100%;
      height:100px;
      display: flex;
      border-top: 1px solid #e6e6e6;/*no*/
      background-color: white;
      .nav-item{
        flex:1;
        height:100px;
        line-height: 100px;
        color: #333;
        a {
          display:block;
          color: #2c3e50;
          &.router-link-exact-active {
            .text{
              color: #ff7919;
            }
            .icon{
              background-position: 0 -50px;
            }
          }
          .icon{
            height: 50px;
            width: 50px;
            margin: 0 auto;
            background-repeat: no-repeat;
            -webkit-background-size: 50px 100px;
            background-size: 50px 100px;
          }
          .home{
            background-image: url('http://image.juooo.com/group1/M00/00/79/rAoKmVmH47OAEN_7AAAIHv30S98667.png');
          }
          .perform{
            background-image: url('http://image.juooo.com/group1/M00/01/22/rAoKNVmH4-OAM1QNAAAHaiocpZI543.png');
          }
          .mine{
            background-image: url('http://image.juooo.com/group1/M00/00/79/rAoKmVmH4-uABxS3AAAH20p7I5Y344.png');
          }
          .text{
            height: 50px;
            line-height: 50px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
