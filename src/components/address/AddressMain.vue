<template>
    <div class="address-wrapper" >
        <div class="mine-header">
            <div class="arrow-wrapper" @click="back">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">切换城市</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="city-main" ref="addressWrapper">
            <div class="city-container">
                <div class="city-wrapper">
                    <div class="current city">
                        <p class="text">当前城市</p>
                        <div class="current-city">{{this.$store.state.currentCity}}</div>
                    </div>
                    <div class="position city">
                        <p class="text">定位城市</p>
                        <div class="position-city">
                            定位失败，点击重试<span></span>
                        </div>
                    </div>
                    <div class="popular city">
                        <p class="text">热门城市</p>
                        <div class="popular-city" >
                            <span @click="checkPopular(city)" v-for="city in popularCitys">{{city}}</span>
                        </div>
                    </div>
                </div>
                <div class="allcity">
                    <p class="text">全部城市</p>
                    <div class="city-all" ref="cityAll">
                        <div class="city-group-wrapper" v-for="group in cityAll" ref="cityGroup">
                            <p class="letter">{{group.letter}}</p>
                            <div @click="checkPopular(city)" class="city-one" v-for="city in group.citys"><p class="city-data">{{city}}</p></div>
                        </div>
                    </div>
                </div>
                <div class="side-bar">
                    <span class="title">当前定位热门</span>
                    <div class="side-bar-wrapper">
                        <p class="side-item" v-for="(group,index) in cityAll" @click="selectLetter(index)">{{group.letter}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "address-main",
        data(){
            return {
                popularCitys:[],
                letters:[],
                cityAll:[]
            }
        },
        created(){
            this.$http.get('/api/address').then(({data})=>{
                if(data.address){
                    this.cityAll = data.address.cityAll
                    data.address.cityAll.forEach((city)=>{
                        this.letters.push(city.letter)
                    })
                    this.popularCitys = data.address.popular;
                }
            })
        },
        methods:{
          selectLetter(index){
              console.log(index)
              let cityGroupList = this.$refs.cityGroup;
              let el = cityGroupList[index];
              this.addressScroll.scrollToElement(el,300);
          },
            back(){
              this.$router.go(-1)
            },
            checkPopular(city){
                this.$router.go(-1)
                console.log(1)
                this.$store.state.currentCity = city;

                // this.$store.state.currentCity = city;
                // this.$store.commit("changeCity",city);
                // console.log(city)
            }
        },
        mounted(){
            this.addressScroll = new BScroll(this.$refs.addressWrapper,{
                click:true,
                probeType:2
            })
        }
    }
</script>

<style scoped lang="less">
.address-wrapper{
    position: relative;
    width:100%;
    height: 100%;
    overflow: hidden;
    .mine-header{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 120;
        display: flex;
        width: 100%;
        height: 85px;
        line-height: 85px;
        border-bottom: 1px solid #e7e7e7;
        color: #212121;
        background:#fdfdfd;
        .arrow-wrapper{
            flex:0 0 10%;
            .icon-angle-left{
                font-size: 60px;
                line-height: 85px;
                font-weight: 400;
                color:#212121
            }
        }
        .text-wrapper{
            flex: 1;
            text-align: center;
            .text{
                font-size: 32px;
            }
        }
    }
    .city-main{
        position:absolute;
        top: 84px;
        left: 0;
        z-index: 100;
        height:100%;
        width: 100%;
        overflow: hidden;
        .city-container{
            padding-top:30px;
            .city-wrapper{
                margin-top: 0;
                background: #fff;
                padding: 0px 60px 0 30px;
                .city{
                    margin-bottom: 25px;
                    .text{
                        color: #999;
                        height:22px;
                        margin-bottom: 30px;
                        line-height: 22px;
                        font-size: 15px;
                        text-align: left;
                    }
                    .current-city,.position-city{
                        height: 60px;
                        line-height: 60px;
                        font-size: 25px;
                        background-color: #f5f5f5;
                    }
                    .current-city{
                        width: 30%;
                        color: #212121;
                    }
                    .position-city{
                        width: 40%;
                        color: #ff7919;
                    }
                    .popular-city{
                        margin-bottom: 30px;
                        text-align: left;
                        font-size: 0;
                        &>span{
                            display: inline-block;
                            text-align: center;
                            width: 30%;
                            height: 60px;
                            margin: 30px 1% 0;
                            line-height: 60px;
                            font-size: 25px;
                            background-color: #f5f5f5;
                        }
                    }
                }
            }
            .allcity{
                background: #fff;
                .text{
                    color: #999;
                    height:22px;
                    margin-left: 30px;
                    line-height: 22px;
                    font-size: 15px;
                    text-align: left;
                }
                .city-all{
                    margin-top: 30px;
                    .city-group-wrapper{
                        .letter{
                            padding: 0 60px 0 30px;
                            height: 40px;
                            line-height: 40px;
                            font-size: 24px;
                            background: #f6f6f6;
                            color: #666;
                            text-align: left;
                        }
                        .city-one{
                            color: #333;
                            &:last-child{
                                .city-data{
                                    border: none;
                                }
                            }
                            .city-data{
                                font-size: 28px;
                                text-align: left;
                                margin: 0 60px 0 30px;
                                height: 80px;
                                line-height: 80px;
                                border-bottom:1px solid #e6e6e6;
                            }
                        }
                    }
                }
            }
            .side-bar{
                position: fixed;
                right: 15px;
                width: 60px;
                top: 250px;
                font-size: 0;
                color: #666;
                text-align: right;
                .title{
                    display: inline-block;
                    width: 60px;
                    font-size:24px ;
                    line-height: 30px;
                    font-weight: 400;
                }
                .side-bar-wrapper{
                    .side-item{
                        margin-top: 5px;
                        width: 60px;
                        height: 30px;
                        font-size: 24px;
                        font-weight: 700;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>