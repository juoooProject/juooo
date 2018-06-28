<template>
  <div class="home">

    <keep-alive>
        <router-view ></router-view>
    </keep-alive>


      <div class="head-wrap">
          <!--顶部导航-->
          <div class="navbar-top">
              <div class="left" @click="goToAddress">
                  <span>{{this.$store.state.currentCity}}</span>
                  <i class="icon ion-chevron-down"></i>
              </div>
              <div class="right">
                  <div class="search-btn" @click="gotoSearch">
                      <i class="icon ion-android-search"></i>
                      <span>搜索演出,艺人或场馆</span>
                  </div>
              </div>
          </div>
      </div>
       <div class="con">
           <div class="slide-wrap" ref="slideWrap">
                  <div class="slide-con" ref="slideCon">
                      <img :src="item.imgSrc" alt="" v-for="(item,index) in slideimg" @click="gotoPage(index,item.keyWords)">
                  </div>
                  <div class="dots"><span v-for="(item,index) in dots" :class="{cur:index==curIndex}" ref="circle" @click="clickChange(index)"></span></div>
           </div>
           <ul class="perform-wrap">
               <li v-for="(item,index) in classMap" @click="gotoPage(index,item.word)">
                   <img :src="item.src" alt="">
                   <span>{{item.word}}</span>
               </li>
           </ul>
           <ul class="activity-wrap">
               <li @click="goToCalendar"><img src="../../assets/img/calendar.png" alt=""><span>日历</span></li>
               <li @click="goToSpecialize"><img src="../../assets/img/jutehui.png" alt=""><span>聚特惠</span></li>

               <li @click="goToStudent"><img src="../../assets/img/student.png" alt=""><span>学生专区</span></li>
               <li @click="goToCard"><img src="../../assets/img/card.png" alt=""><span>欢聚橙卡</span></li>
           </ul>
           <index-rest></index-rest>
       </div>
       

       <foot></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarMain from '../../components/calendar/CalendarMain'
import StudentArea from "../../components/studentArea"
import SpecializeArea from "../../components/specializeArea"
import IndexRest from "../../components/indexRest/indexRest"
import AddAddress from "../../components/addAddress"
import MyHeader from "../../components/head/myHead"
import BScroll from "better-scroll"
import Search from '../../components/search/Search'
import Foot from '../../components/foot/foot'
import OrderGoods from "../../components/orderGoods"
import ChooseAddress from '../../components/saveAddress/ChooseAddress'
export default {
  name: 'home',
    data(){
      return{
        showAddress:false,
          slideimg:[],
          pageArr:[],
          curFlag:false,
          curIndex:0,
          timer:0,
          loop:true,
          autoPlay:true,
          interval:2000,
          dots:[],
          classMap:[{src:'http://10.80.13.228:8088/img/sing.png',word:'演唱会'},{src:'http://10.80.13.228:8088/img/music.png',word:'音乐会'},{src:'http://10.80.13.228:8088/img/show.png',word:'舞台剧'},{src:'http://10.80.13.228:8088/img/drama.png',word:'音乐剧'},{src:'http://10.80.13.228:8088/img/child.png',word:'儿童'}],
          searchShow:false
      }
    },
   // methods: {
        // show() {
        //     this.showAddress = !this.showAddress;
        // },
        // init() {
        //     this.scroll = new BScroll(this.$refs.slideWrap, {
        //         click: true,
        //         scrollX: true,
        //         snap: {
        //             loop: true,
        //             threshold: 0,
        //             easing: {
        //                 style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        //                 fn: function (t) {
        //                     return t * (2 - t)
        //                 }
        //             }
        //         }
        //     })
        //     this.play();
        //     this.scroll.on('scrollEnd', () => {
        //         let pageIndex = this.scroll.getCurrentPage().pageX;
        //         this.curIndex = pageIndex;
        //         if (this.autoPlay) {
        //             this.play();
        //         }
        //     })
        //     this.scroll.on('beforeScrollStart', () => {
        //         if (this.autoPlay) {
        //             clearTimeout(this.timer);
        //         }
        //     })
        // },
        // play() {
        //     let pageIndex = this.curIndex + 1
        //     if (pageIndex == 7) {
        //         pageIndex = 0;
        //         this.scroll.goToPage(pageIndex, 0, 0.01);
        //     }
        //     var vm = this;
        //     this.timer = setTimeout(() => {
        //         this.scroll.goToPage(pageIndex, 0, 400);//跳转到的页数 初始化页数 滑动总时间
        //     }, this.interval);
        // },
        // clickChange(index) {
        //     this.scroll.goToPage(index, 0, 400)
        // },
        // gotoPage(index, key) {
        //     this.$http.get(`api/search?keys=${key}`).then(({data}) => {
        //         console.log(data.searchList);
        //         this.curIndex = 1;
        //         this.$router.push({
        //             path: "/performance/showPerform",
        //             query: {
        //                 id: data.searchList[0].performType,
        //                 key: key
        //             }
        //         });
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // },
        // gotoSearch() {
        //     //this.$store.state.footShow = false;
        //     this.$router.push({
        //         path: "/search"
        //     })
        // },
        // goToAddress() {
        //     // console.log(1)
        //     // this.$store.state.footShow = false;
        //     this.$router.push({
        //         path:"/saveAddress"
        //     })
        // },

   // },
  created(){
      this.$http.get("/api/slide").then(({data})=>{
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
              this.$refs.slideCon.style.width = 700 + '%';
          })
      })
  },
  mounted(){
       this.$nextTick(()=>{
          this.init();
      })
  },
  components: {
       MyHeader,
       Search,
       Foot,
       StudentArea,
       SpecializeArea,
       IndexRest,
       OrderGoods,
       AddAddress,
      CalendarMain,
      ChooseAddress
  },
  methods:{
      goToStudent(){
          this.$router.push({
              path:"/student"
          })
      },
      goToSpecialize(){
          this.$router.push({
              path:"/specialize"
          })
      },
      goToCard(){
          this.$router.push({
              path:"/happyCard"
          })
      },
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
              console.log(data.searchList);
              this.curIndex=1;
              this.$router.push({
                  path:"/performance/showPerform",
                  query:{
                      id:data.searchList[0].performType,
                      key:key
                  }
              });
          }).catch((err)=>{
              console.log(err);
          })
      },
      gotoSearch(){
          this.$router.push({
              path:'/home/address'
          })
        },
        goToCalendar(){
            this.$router.push({
                path:'/calendarMain'
            })
        },
      goToAddress(){
          this.$router.push({
              path:'/address'
          })
      },
      // goToSomewhere(){
      //     this.$router.push({
      //         path:'/saveAddress'
      //     })
      // }
    },
}
</script>



<style lang="less" scoped>
    .home{
        height: 100%;
    }
    .head-wrap{
        .navbar-top{
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            justify-content:center;
            height: 90px;
            width: 100%;
            .left{
                width: 120px;
                font-size: 0;
                margin-right: 32px;
                text-align: right;
                span{
                    display: inline-block;
                    height: 100%;
                    font-size: 28px;
                    line-height:90px;
                    text-align: center;
                    margin-right: 10px;
                }
                .icon{
                    font-size:14px;
                    color: #999;
                }
            }
            .right{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 570px;
                height: 100%;
                .search-btn{
                    width: 100%;
                    height: 60px;
                    background-color: #f2f2f2;
                    border-radius: 28px;
                    font-size: 26px;
                    line-height: 60px;
                    color: #999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon{
                        font-size:30px;
                    }
                    span{
                        display: inline-block;
                        margin-left: 20px;
                    }
                }
            }
        }
        .search-wrap{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 22;
            background-color: #fff;
        }
    }
    .con{
        position: relative;
        top: 90px;
        height: 100%;
        overflow: scroll;
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
                /*flex: 1;*/
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
                text-align: center;
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

