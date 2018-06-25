<template>
  <div class="home">
      <my-header></my-header>
       <div class="con">
           <div class="slide-wrap" ref="slideWrap">
              <!--<div class="slide-innner">-->
                  <div class="slide-con" ref="slideCon">
                      <img :src="item.imgSrc" alt="" v-for="(item,index) in slideimg" @click="gotoPage(index,item.keyWords)">
                  </div>
                  <div class="dots"><span v-for="(item,index) in dots" :class="{cur:index==curIndex}" ref="circle" @click="clickChange(index)"></span></div>
              <!--</div>-->
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
import BScroll from "better-scroll"
export default {
  name: 'home',
  data(){
      return{
          slideimg:[],
          pageArr:[],
          curFlag:false,
          curIndex:0,
          timer:0,
          loop:true,
          autoPlay:true,
          interval:2000,
          dots:[]
      }
  },
  created(){
      this.$http.get("/api/slide").then(({data})=>{
          console.log(data);
          this.slideimg = data;
          this.dots = new Array(this.slideimg.length-1);
          this.$nextTick(()=>{
              let width =0;
              let sliderWidth = 100;
              for(let i = 0; i < this.slideimg.length; i ++){
                  width += sliderWidth;
              }
              if(this.loop){
                  width += 2*sliderWidth;
              }
              console.log(width);
              this.$refs.slideCon.style.width = 700 + '%';
              console.log(sliderWidth);
          })
      })
  },
  mounted(){
      console.log(this.slideimg)
       this.$nextTick(()=>{

          this.init();

      })
  },
  components: {
       MyHeader
  },
  methods:{
      init(){
          this.scroll = new BScroll(this.$refs.slideWrap,{
              click:true,
              scrollX:true,
              snap: {
                  loop: true,
                  threshold: 0,
                  easing: {
                      style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      fn: function(t) {
                          return t * (2 - t)
                      }
                  }
              }
          })
          this.play();
          this.scroll.on('scrollEnd', () => {
              let pageIndex = this.scroll.getCurrentPage().pageX;
              this.curIndex = pageIndex;
              if(this.autoPlay) {
                  this.play();
              }
          })
          this.scroll.on('beforeScrollStart', () => {
              if(this.autoPlay){
                  clearTimeout(this.timer);
              }
          })
      },
      play(){
          let pageIndex = this.curIndex + 1
          if(pageIndex==7){
              pageIndex=0;
              this.scroll.goToPage(pageIndex, 0 , 0.01);
          }
          var vm = this;
          this.timer = setTimeout(() => {
              this.scroll.goToPage(pageIndex, 0 , 400);//跳转到的页数 初始化页数 滑动总时间
          },this.interval);
      },
      clickChange(index){
          this.scroll.goToPage(index, 0 , 400)
      },
      gotoPage(index,key){
          this.$http.get(`api/search?keys=${key}`).then(({data})=>{
              console.log(data.searchList[0].performType);
              // this.curIndex=1;
              this.$router.push({
                  path:"/performance/showPerform",
                  query:{
                      id:data.searchList[0].performType
                  }
              });
          }).catch((err)=>{
              console.log(err);
          })
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
            /*.slide-inner{*/
                .slide-con{
                    position: absolute;
                    left: 0;
                    top: 0;
                    /*width: 700%;*/
                    height: 310px;
                    display: flex;
                    img{
                        width: 750px;
                        height: 100%;
                    }
                }
                .dots{
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
            /*}*/
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