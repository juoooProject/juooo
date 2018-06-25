<template>
    <div class="calendar-address" ref="calendarAddress">
        <div class="calendar-address-wrapper">
            <!--热门城市列表-->
            <div class="popular-city">
                <p class="text">热门城市</p>
                <div class="popular-city-list">
                    <span class="city-item" v-for="(city,index) in popularCitys">{{city}}</span>
                </div>
            </div>
            <!--全部城市列表-->
            <div class="all-city">
                <p class="text">全部城市</p>
                <div class="all-city-list">
                    <div class="acity-item" v-for="city in cityLists">{{city}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "CalendarAddress",
        data(){
            return{
                popularCitys:["全国","深圳","广州","北京","上海","成都","重庆","武汉","都江堰","呼和浩特","北京","上海"],
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
                ],
                cityLists:[]
            }
        },
        created(){
            this.cityAll.forEach((item) => {
                item.citys.forEach((city) => {
                    this.cityLists.push(city);
                })
            })
            this.$nextTick(() => {
                this.addressScroll = new BScroll(this.$refs.calendarAddress,{
                    click:true
                })
                this.addressScroll.refresh();
            })
        },
        methods:{

        },
        mounted(){
            window.addEventListener("DOMContentLoaded",() => {
                console.log(this.$refs.calendarAddress.offsetHeight)
            })
        }
    }
</script>

<style scoped lang="less">
.calendar-address{
    position: absolute;
    top: 85px;
    left: 0;
    width: 100%;
    z-index: 120;
    /*height:calc(100% - 200px);*/
    height: 80%;
    overflow: hidden;
    background: #fff;
    .popular-city{
        width: 100%;
        .text{
            padding: 30px;
            font-size: 30px;
            line-height: 60px;
            height: 60px;
            text-align: left;
        }
        .popular-city-list{
            padding:0 30px;
            text-align: left;
            .city-item{
                display: inline-block;
                font-size: 28px;
                padding: 20px 50px;
                margin:0 10px 20px 0;
                border: 1px solid #dadada;
                color: #666;
            }
        }
    }
    .all-city{
        width: 100%;
        .text{
            padding: 30px;
            font-size: 30px;
            line-height: 60px;
            height: 60px;
            text-align: left;
        }
        .all-city-list{
            padding:0 30px;
            text-align: left;
            .acity-item{
                font-size: 28px;
                padding: 20px 10px;
                margin:0 10px 20px 0;
                border-bottom: 1px solid #dadada;
                color: #666;
            }
        }
    }
}
</style>