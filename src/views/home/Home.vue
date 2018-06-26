<template>
  <div class="home">
    <!--<router-link class="to-address" tag="button" to="/home/address">全国</router-link>-->
    <!--<router-view ></router-view>-->
    <calendar-main v-if=""></calendar-main>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarMain from '../../components/calendar/CalendarMain'
export default {
  name: 'home',
    data(){
      return{
        showAddress:false
      }
    },
    methods:{
      show(){
          this.showAddress = !this.showAddress;
      }
    },
  components: {
      CalendarMain
  }
}
</script>
<style lang="less" scoped>
  .home{
    position: relative;
    height: 100%;
    .to-address{
      position: relative;
    }
  }
</style>
