<template>
    <div class="calendar-address" ref="calendarAddress">
        <div class="calendar-address-wrapper">
            <!--热门城市列表-->
            <div class="popular-city">
                <p class="text">热门城市</p>
                <div class="popular-city-list">
                    <span @click="chooseAddress(city)" class="city-item" v-for="(city,index) in popularCitys">{{city}}</span>
                </div>
            </div>
            <!--全部城市列表-->
            <div class="all-city">
                <p class="text">全部城市</p>
                <div class="all-city-list">
                    <div @click="chooseAddress(city)" class="acity-item" v-for="city in cityLists">{{city}}</div>
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
                popularCitys:[],
                letters:[],
                cityAll:[],
                cityLists:[]
            }
        },
        created(){
            this.$http.get('/api/address').then(({data})=>{
                if(data.address){
                    this.cityAll = data.address.cityAll
                    data.address.cityAll.forEach((city)=>{
                        this.letters.push(city.letter)
                        city.citys.forEach((city)=>{
                            this.cityLists.push(city);
                        })
                    })
                    this.popularCitys = data.address.popular;
                }
            })
            this.$nextTick(() => {
                this.addressScroll = new BScroll(this.$refs.calendarAddress,{
                    click:true
                })
                this.addressScroll.refresh();
            })
        },
        methods:{
            chooseAddress(city){
                this.$store.state.calendarCity = city;
                this.$store.state.showCalendarAddress = false;
            }
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
    .calendar-address-wrapper{
        .popular-city{
            width: 100%;
            padding-top: 30px;
            .text{
                font-size: 30px;
                margin: 30px;
                line-height: 60px;
                height: 60px;
                text-align: left;
            }
            .popular-city-list{
                margin:0 30px;
                padding-bottom: 30px;
                text-align: left;
                border-bottom: 1px solid #dadada;
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
                margin: 30px;
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
}
</style>