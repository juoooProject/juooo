<template>
    <div class="address-wrapper" >
        <div class="mine-header">
            <div class="arrow-wrapper">
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
                        <div class="current-city">全国</div>
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
                            <span v-for="city in popularCitys">{{city}}</span>
                        </div>
                    </div>
                </div>
                <div class="allcity">
                    <p class="text">全部城市</p>
                    <div class="city-all" ref="cityAll">
                        <div class="city-group-wrapper" v-for="group in cityAll" ref="cityGroup">
                            <p class="letter">{{group.letter}}</p>
                            <div class="city-one" v-for="city in group.citys"><p class="city-data">{{city}}</p></div>
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
                popularCitys:["全国","深圳","广州","北京","上海","成都","重庆","武汉"],
                letters:['A','B','C','D','F'],
                cityAll:[
                    {
                        letter:'A',
                        citys:["澳门","安顺"]
                    },
                    {
                        letter:'B',
                        citys:["滨州","蚌埠","保定","北京","百色","包头","白银"]
                    },
                    {
                        letter:'C',
                        citys:["郴州", "成都", "长春", "重庆", "长沙", "常州", "滁州", "潮州"]
                    },
                    {
                        letter:'D',
                        citys:["德阳", "德州", "东莞", "都江堰", "大连", "大理", "大庆", "大同", "东营", "达州"]
                    } ,
                    {
                        letter:'F',
                        citys:["福建", "龙岩", "佛山", "釜山", "福州"]
                    }
                ]
            }
        },
        created(){

        },
        methods:{
          selectLetter(index){
              console.log(index)
              let cityGroupList = this.$refs.cityGroup;
              let el = cityGroupList[index];
              this.addressScroll.scrollToElement(el,300);
              console.log(el)
              console.log(this.addressScroll)
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
        top: 0;
        left: 0;
        z-index: 100;
        height:100%;
        width: 100%;
        overflow: hidden;
        .city-container{
            .city-wrapper{
                margin-top: 84px;
                background: #fff;
                padding: 0px 60px 0 30px;
                .city{
                    .text{
                        color: #999;
                        height:22px;
                        margin-top:30px;
                        line-height: 22px;
                        font-size: 15px;
                        text-align: left;
                    }
                    .current-city,.position-city{
                        height: 60px;
                        margin-top: 30px;
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