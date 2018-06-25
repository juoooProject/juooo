<template>
    <div class="calendar-main">
        <!--头部-->
        <div class="mine-header">
            <div class="arrow-wrapper" @click="">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">演出日历</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="calendar-container" ref="calendarContainer">
            <div class="calendar-wrapper">
                <!--日历-->
                <div class="flex">
                    <div class="calendar-wrapper">
                        <calendar
                                ref="calendar1"
                                :events="calendar1.events"
                                :lunar="calendar1.lunar"
                                :value="calendar1.value"
                                :begin="calendar1.begin"
                                :end="calendar1.end"
                                :weeks="calendar1.weeks"
                                :months="calendar1.months"
                                @select="calendar1.select"
                                @selectMonth="calendar1.selectMonth"
                                @selectYear="calendar1.selectYear"></calendar>
                        <div class="address" @click="showCalendarAddress">
                            <span>全国</span>
                            <span class="icon-angle-left"></span>
                        </div>
                    </div>

                </div>
                <!--渲染数据-->
                <div class="filter-result">
                    <div class="perform-detail">
                        <span class="time">2018.6.21</span>
                        <div class="text">共有<span>13</span>场演出(主办演出<span>8</span>场)</div>
                    </div>
                    <ul>
                        <li class="perform-data">
                            <div class="left-image">
                                <img width="86" height="115" src="http://image.juooo.com/group1/M00/01/0F/rAoKmVqT6DiARLaGAACelcqXRfY181.jpg" alt="">
                            </div>
                            <div class="right-data">
                                <div class="title">[沈阳]【小橙堡】印象莫奈：时光映迹艺术展 沈阳站</div>
                                <div class="detail">
                                    <p class="time">时间：2018.03.30-2018.06.06</p>
                                    <p>场馆：沈阳玖伍文化城</p>
                                </div>
                                <div class="price">
                                    <span>￥79 - 199</span>
                                </div>
                            </div>
                        </li>
                        <li class="perform-data">
                            <div class="left-image">
                                <img width="86" height="115" src="http://image.juooo.com/group1/M00/01/0F/rAoKmVqT6DiARLaGAACelcqXRfY181.jpg" alt="">
                            </div>
                            <div class="right-data">
                                <div class="title">[沈阳]【小橙堡】印象莫奈：时光映迹艺术展 沈阳站</div>
                                <div class="detail">
                                    <p class="time">时间：2018.03.30-2018.06.06</p>
                                    <p>场馆：沈阳玖伍文化城</p>
                                </div>
                                <div class="price">
                                    <span>￥79 - 199</span>
                                </div>
                            </div>
                        </li>
                        <li class="perform-data">
                            <div class="left-image">
                                <img width="86" height="115" src="http://image.juooo.com/group1/M00/01/0F/rAoKmVqT6DiARLaGAACelcqXRfY181.jpg" alt="">
                            </div>
                            <div class="right-data">
                                <div class="title">[沈阳]【小橙堡】印象莫奈：时光映迹艺术展 沈阳站</div>
                                <div class="detail">
                                    <p class="time">时间：2018.03.30-2018.06.06</p>
                                    <p>场馆：沈阳玖伍文化城</p>
                                </div>
                                <div class="price">
                                    <span>￥79 - 199</span>
                                </div>
                            </div>
                        </li>
                        <li class="perform-data">
                            <div class="left-image">
                                <img width="86" height="115" src="http://image.juooo.com/group1/M00/01/0F/rAoKmVqT6DiARLaGAACelcqXRfY181.jpg" alt="">
                            </div>
                            <div class="right-data">
                                <div class="title">[沈阳]【小橙堡】印象莫奈：时光映迹艺术展 沈阳站</div>
                                <div class="detail">
                                    <p class="time">时间：2018.03.30-2018.06.06</p>
                                    <p>场馆：沈阳玖伍文化城</p>
                                </div>
                                <div class="price">
                                    <span>￥79 - 199</span>
                                </div>
                            </div>
                        </li>
                        <li class="perform-data">
                            <div class="left-image">
                                <img width="86" height="115" src="http://image.juooo.com/group1/M00/01/0F/rAoKmVqT6DiARLaGAACelcqXRfY181.jpg" alt="">
                            </div>
                            <div class="right-data">
                                <div class="title">[沈阳]【小橙堡】印象莫奈：时光映迹艺术展 沈阳站</div>
                                <div class="detail">
                                    <p class="time">时间：2018.03.30-2018.06.06</p>
                                    <p>场馆：沈阳玖伍文化城</p>
                                </div>
                                <div class="price">
                                    <span>￥79 - 199</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="cover" v-show="addressShow"></div>
        <calendar-address v-if="addressShow"></calendar-address>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import calendar from './calendar.vue'
    import CalendarAddress from '../calendarAddress/CalendarAddress'
    export default {
        name: 'calendar-main',
        components: {
            calendar,
            CalendarAddress
        },
        data(){
            return {
                calendar1:{
                    value:[2017,7,20], //默认日期
                    // lunar:true, //显示农历
                    weeks:['日', '一', '二', '三', '四', '五', '六'],
                    months:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12'],
                    events:{
                    },
                    select(value){
                        console.log(value.toString());
                    },
                    selectMonth(month,year){
                        console.log(year,month)
                    },
                    selectYear(year){
                        console.log(year)
                    },
                    timestamp:Date.now()
                },
                addressShow:false
            }
        },
        methods:{
            showCalendarAddress(){
                this.addressShow = !this.addressShow;
            }
        },
        created(){
          this.$http.get('/api/address').then(({data}) => {
              console.log(data);
          })
        },
        mounted(){
            new BScroll(this.$refs.calendarContainer,{
                click:true
            })
        }
    }
</script>

<style scoped lang="less">
.calendar-main{
    position: relative;
    z-index: 100;
    height: 100%;
    width: 100%;
    background: #fff;
    .mine-header{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
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
    .calendar-container{
        position: absolute;
        width: 100%;
        top: 85px;
        height:calc(100% - 85px);
        overflow: hidden;
        .calendar-wrapper{
            .flex{
                width: 100%;
                box-sizing: border-box;
                display: -webkit-box;
                -webkit-box-pack: start;
                -webkit-box-align: start;
                display: -webkit-flex;
                -webkit-justify-content: space-between;
                display: flex;
                justify-content: space-between;
                .calendar-wrapper{
                    width:100%;
                    min-width:300px;
                    border: 1px solid #eee;
                    border-radius: 2px;
                    position: relative;
                    .address{
                        position: absolute;
                        z-index: 200;
                        top: 0;
                        right: 20px;
                        width: 100px;
                        height: 50px;
                        &>span{
                            display: inline-block;
                            font-size: 30px;
                            line-height: 60px;
                            height: 60px;
                            &.icon-angle-left{
                                margin-left: 20px;
                                transform: rotateZ(-90deg);
                            }
                        }
                    }
                    &>span{
                        position: absolute;
                        left:0px;
                        top:0px;
                        padding:5px 10px;
                        font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
                        font-size:10px;
                        border-radius:0 0 2px 0;
                        background:#ea6151;
                        color:#fff;
                    }
                    &>input{
                        box-sizing: border-box;
                        width:100%;
                        margin-top:20px;
                        border-radius: 2px;
                        border:1px solid #dedede;
                        padding:10px;
                        font-size: 16px;
                        background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
                        padding-left: 36px;
                        color:#666;
                    }
                }
            }
            .filter-result{
                .perform-detail{
                    display: flex;
                    width: 100%;
                    background: #f2f2f2;
                    height: 75px;
                    font-size: 28px;
                    line-height: 75px;
                    font-weight: 500;
                    .time{
                        flex:0 0 20%;
                        display: inline-block;
                        color: #ff7919;
                        text-align: left;
                        margin-left: 30px;
                    }
                    .text{
                        flex: 1;
                        display: inline-block;
                        color: #666;
                        text-align: right;
                        margin-right: 30px;
                    }
                }
                .perform-data{
                    display: flex;
                    margin: 30px;
                    padding-bottom: 30px;
                    border-bottom: 1px solid #f2f2f2;
                    text-align: left;
                    .left-image{
                        flex: 0 0 86px;
                        margin-right: 20px;
                        display: inline-block;
                    }
                    .right-data{
                        flex: 1;
                        display: inline-block;
                        .title{
                            color: #212121;
                            font-size: 30px;
                            overflow: hidden;
                            height: 80px;
                            line-height: 40px;
                            font-weight: 400;
                        }
                        .detail{
                            margin-top: 20px;
                            &>p{
                                line-height: 44px;
                                height: 44px;
                                font-size: 26px;
                            }
                        }
                        .price{
                            color: #ff7919;
                            line-height: 42px;
                            height: 42px;
                            font-size: 28px;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
    .cover{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 110;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.6);
    }
}




</style>
