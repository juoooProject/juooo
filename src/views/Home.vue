<template>
  <div class="home">
      <my-header></my-header>
       <div class="con">
           <div class="slide-wrap" ref="slideWrap">
               <div class="slide-con" ref="slideCon">
                   <img :src="item" alt="" v-for="item in slideimg">
               </div>
               <div class="page"><span v-for="(item,index) in pageArr" :class="{cur:index==curIndex}" ref="circle" @click="clickChange(index)"></span></div>
           </div>
           <ul class="perform-wrap">
               <li>
                   <img src="../assets/img/sing.png" alt="">
                   <span>演唱会</span>
               </li>
               <li>
                   <img src="../assets/img/music.png" alt="">
                   <span>音乐会</span>
               </li>
               <li>
                   <img src="../assets/img/show.png" alt="">
                   <span>舞台剧</span>
               </li>
               <li>
                   <img src="../assets/img/drama.png" alt="">
                   <span>音乐剧</span>
               </li>
               <li>
                   <img src="../assets/img/child.png" alt="">
                   <span>儿童</span>
               </li>
           </ul>
           <ul class="activity-wrap">
               <li><img src="../assets/img/calendar.png" alt=""><span>日历</span></li>
               <li><img src="../assets/img/jutehui.png" alt=""><span>聚特惠</span></li>
               <li><img src="../assets/img/student.png" alt=""><span>学生专区</span></li>
               <li><img src="../assets/img/card.png" alt=""><span>欢聚橙卡</span></li>
           </ul>
       </div>
       
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from "../components/head/myHead"
export default {
  name: 'home',
  data(){
      return{
          slideimg:[],
          pageArr:[],
          curFlag:false,
          curIndex:0,
          timer:0,
          dx:0,
          timer2:0
      }
  },
  created(){
      this.$http.get("/api/slide").then(({data})=>{
          console.log(data);
          this.slideimg = data[0].slideimg;
          this.pageArr = data[0].slideimg.slice(0,6);
      })
  },
  mounted(){
      this.$nextTick(()=>{
          var slideCon = this.$refs.slideCon;
          var wrap = this.$refs.slideWrap;
          var that = this;
          setTimeout(()=> {
              this.timer = setInterval(play,10);
          },2000);
          function play() {
             that.dx-=5;
             if(that.dx%100==0){
                 //清除计时器 暂停播放
                 clearInterval(that.timer);
                 setTimeout(function(){
                     that.timer=setInterval(play,10);
                 },2000)
                that.curIndex = -that.dx/100;
                if(that.curIndex == 6){
                    that.curIndex=0;
                }

             }
             if(that.dx==-600){
                 that.dx=0;
             }
             slideCon.style.left=that.dx+"%";
         }

      })
  },
  components: {
       MyHeader
  },
  methods:{
      clickChange(index){
          var timer = setInterval(function () {
              for(var i = 0; i <= timer;i++){
                  clearInterval(i);
              }
          },20)
          this.curIndex=index;
          this.dx=-this.curIndex*100;
          $(".slide-con").animate({
              left:-this.curIndex*100+"%"
          });
      }
  }
}
</script>

<style lang="less" scoped>
    .con{
        position: relative;
        top: 90px;
        .slide-wrap{
            position: relative;
            width: 100%;
            height: 310px;
            overflow:hidden;
            .slide-con{
                position: absolute;
                left: 0;
                top: 0;
                width: 700%;
                height: 310px;
                display: flex;
                img{
                    flex: 1;
                    height: 100%;
                }
            }
            .page{
                position: absolute;
                bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 200px;
                left: 0;
                right: 0;
                margin: auto;
                span{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin:0 9px;
                    border-radius: 50%;
                    background-color: #999;
                    &.cur{
                        background-color: white;
                    }
                }

            }
        }
        .perform-wrap{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-top: 25px;
            /*height: 110px;*/
            li{
                flex: 1;
                img{
                    width: 64px;
                    height: 64px;
                }
                span{
                    display: block;
                    margin-top: 15px;

                }
            }
        }
        .activity-wrap{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding:25px 20px;
            li{
                flex: 1;
                margin-right: 20px;
                height: 100%;
                background-color: #f2f2f2;
                line-height: 80px;
                border-radius: 10px;
                &:last-child{
                    margin: 0;
                }
                img{
                    width: 40px;
                    height: 40px;
                    vertical-align: middle;
                }
                span{

                }
            }
        }
    }
</style>