<template>
    <!--<router-view></router-view>-->
    <div class="performWrap">
        <div class="navbar-top">
            <div class="left">
                <span>全国</span>
                <i class="icon ion-chevron-down"></i>
            </div>
            <div class="right">
                <div class="search-btn" @click="gotoSearch">
                    <i class="icon ion-android-search"></i>
                    <span>搜索演出,艺人或场馆</span>
                </div>
            </div>
            <div class="menus" @click="">
                <i class="icon ion-android-menu"></i>
            </div>
        </div>
        <div class="search-wrap" v-show="searchShow" >
            <search></search>
        </div>
        <div class="sortWrap">
             <ul class="sortType">
                 <span class="tri"></span>
                 <li @click="sortChange">推荐排序<i class="icon ion-checkmark-round" v-show="isFlag"></i></li>
                 <li>事件排序</li>
             </ul>
        </div>
        <div class="topWrap" ref="topWrap">
            <ul class="topbar">
                <li @click="gotoAll" :class="{active:curIndex==0}">全部</li>
                <li @click="gotoSing" :class="{active:curIndex==1}">演唱会</li>
                <li @click="gotoMusic" :class="{active:curIndex==2}">音乐会</li>
                <li @click="gotoDrama" :class="{active:curIndex==3}">话剧歌剧</li>
                <li @click="gotoChild" :class="{active:curIndex==4}">儿童亲子</li>
                <li @click="gotoMusicial" :class="{active:curIndex==5}">音乐剧</li>
                <li @click="gotoDance" :class="{active:curIndex==6}">舞蹈芭蕾</li>
                <li @click="gotoOpera" :class="{active:curIndex==7}">戏曲综艺</li>
                <li @click="gotoShow" :class="{active:curIndex==8}">展览</li>
            </ul>
        </div>
        <div class="splite"></div>
        <!--<show-perform v-if="allFlag==true"></show-perform>-->
        <div ref="listWrap" class="listWrap">
                <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    import Search from "../components/search/Search"
    import ShowPerform from "../components/showPerform/showPerform"
export default {
  name: 'Performance',
  data(){
      return{
          curIndex:0,
          searchShow:false,
          isFlag:false,
          listArr:[],
          allFlag:true
      }
  },
  created(){
      console.log(this.$route.query)
      this.$http.get("/api/performances").then(({data})=>{
          this.listArr=data.allList;
      }).catch((err)=>{
          console.error(err);
      });
  },
  mounted(){
      let topWrapper = this.$refs.topWrap;
      this.topScroll = new BScroll(topWrapper,{
          click:true,
          scrollX:true
      })
      let listWrap = this.$refs.listWrap;
      this.listScroll = new BScroll(listWrap,{
          click:true
      })
  },
  methods:{
      gotoSearch(){
         this.$router.push({
             path:"/search"
         })
      },
      gotoAll(){
          this.curIndex=0;
          this.allFlag=true;
          this.$router.push({
              path:"/performance",
              query:{
                  id:-1
              }
          });
      },
      gotoSing(){
          this.curIndex=1;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:0
              }
          });
      },
      gotoMusic(){
          this.curIndex=2;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:1
              }
          });
      },
      gotoDrama(){
          this.curIndex=3;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:2
              }
          });
      },
      gotoChild(){
          this.curIndex=4;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:3
              }
          });
      },
      gotoMusicial(){
          this.curIndex=5;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:4
              }
          });
      },
      gotoDance(){
          this.curIndex=6;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:5
              }
          });
      },
      gotoOpera(){
          this.curIndex=7;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:6
              }
          });
      },
      gotoShow(){
          this.curIndex=8;
          this.allFlag=false;
          this.$router.push({
              path:"/performance",
              query:{
                  id:7
              }
          });
      },
      sortChange(){

      }
  },
  components:{
      ShowPerform,
      Search
  }
}
</script>

<style lang="less" scoped>
    .performWrap{
        position: relative;
        top: 90px;
        bottom: 50px;
        z-index: 33;
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
                margin-right: 15px;
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
                width: 530px;
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
            .menus{
                width: 50px;
                height: 100%;
                line-height: 90px;
                .icon{
                    font-size:40px;
                    color: #999;
                }
            }
        }
        .sortWrap{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.2);
            z-index: 88;
            display: none;
            .sortType{
                position: absolute;
                right: 16px;
                top: 90px;
                width: 200px;
                padding: 6px 12px;
                background-color: #fff;
                border-radius: 10px;
                .tri{
                    position: absolute;
                    top: -10px;
                    right: 20px;
                    width: 10px;
                    height: 10px;
                    border-left: .21333rem solid transparent;
                    border-right: .21333rem solid transparent;
                    border-bottom: .21333rem solid #fff;
                }
                li{
                    padding-left: 30px;
                    height: 75px;
                    line-height: 75px;
                    color: dimgrey;
                    text-align: left;
                    i{
                        text-indent: 10px;
                        font-size: 24px;
                        color:#ff7919;
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
        .topWrap{
            width: 100%;
            height: 75px;
            overflow: hidden;
            .topbar{
                margin-left: 30px;
                height: 75px;
                display: flex;
                width: 1200px;
                li{
                    height: 69px;
                    padding: 0 28px;
                    line-height: 75px;
                    &.active{
                        border-bottom: 1px solid orangered;
                        color: orangered;
                    }
                }



            }
        }
        .splite{
            height: 10px;
            width: 100%;
            background-color: #F1F2F1;
        }
        .listWrap{
            height: 1050px;
            overflow: hidden;
        }
    }
</style>
