<template>
    <div class="order-wrapper">
        <div class="student-banner">
            <span class="icon icon-arrow_lift"></span>
            <span>确认订单</span>
            <div></div>
        </div>

        <div class="order-goods">
            <div class="order-detail">
                <div class="order-left"><img src="../img/00.jpg" alt=""></div>
                <div class="order-right">
                    <p>hhhj</p>
                    <p>dsa</p>
                    <p>fff</p>
                </div>
            </div>
            <div class="order-price">
                <div class="price-left">合计(1张) :</div>
                <div class="price-right">
                    <span>¥ 80.00</span>
                    <span @click="ShowDetail=!ShowDetail" :class="{active:ShowDetail}"> ^ </span>
                </div>
            </div>

            <div class="order-sale-detail" v-show="ShowDetail">
                <div class="sale-left">¥ 80.00 x 1</div>
                <div class="sale-right">¥ 80.00</div>
            </div>
        </div>

        <div class="order-discount">
            <div class="discount-left">活动/优惠</div>
            <div class="discount-right">活动/优惠券/优购码 ></div>
        </div>

        <div class="order-delivery">
            <div class="delivery-title">配送方式:</div>
            <div class="delivery-methods">
                <span v-for="(item,index) in methods" :class="{methodsActive:showMethods[index]}" @click="showMethodsDetail(index)">{{item}}</span>
            </div>
            <div class="delivery-methods-express" v-show="showMethods[0]">
                完善配送信息
            </div>
            <div class="delivery-methods-visit" v-show="showMethods[1]">
                <p class="visit-title">请填写姓名和手机号，该信息将作为取票凭证</p>
                <div class="visit-inputs">
                    <p><input type="text" placeholder="姓名"></p>
                    <p><input type="text" placeholder="手机号"></p>
                </div>
                <div class="visit-address">
                    <p>取票地址:</p>
                    <p>北京市东城区东四北大街107号科林大厦B座B609</p>
                </div>
                <div class="visit-time">
                    <p>工作时间:</p>
                    <p>周一至周五(8:30-18:00)</p>
                </div>
            </div>
            <div class="delivery-methods-live" v-show="showMethods[2]">
                <p class="visit-title">请填写姓名和手机号，该信息将作为取票凭证</p>
                <div class="visit-inputs">
                    <p><input type="text" placeholder="姓名"></p>
                    <p><input type="text" placeholder="手机号"></p>
                </div>
                <div class="visit-address">
                    <p>取票地址:</p>
                    <p>北京市东城区东四北大街107号科林大厦B座B609</p>
                </div>
            </div>
        </div>
        
        <div class="order-summation">
            <p><span>商品合计:</span><span>¥ 80.00</span></p>
            <p><span>运费合计:</span><span>¥ 0.00</span></p>
            <p><span>优惠</span><span>¥ 0.00</span></p>
        </div>

        <div class="order-bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "order-goods",
        data(){
            return {
                ShowDetail:false,
                methods:["快递","上门取票","现场取票"],
                showMethods:[true,false,false],
            }
        },
        methods:{
            showMethodsDetail(num){
                this.$nextTick(()=>{
                    this.showMethods=[]

                    switch (num){
                        case 0:this.showMethods.push(true,false,false);
                        break;
                        case 1:this.showMethods.push(false,true,false);
                        break;
                        case 2:this.showMethods.push(false,false,true);
                        break;
                        default:this.showMethods.push(true,false,false);
                        break;
                    }

                })


            }

        }
    }
</script>

<style scoped lang="less">
    @import "../css/style.css";
    .student-banner{
        position: fixed;
        background: #FCFDFC;
        top: 0;
        left: 0;
        z-index: 555;
        width: 100%;
        height: 87px;
        display: flex;
        border-bottom: 1px solid #F1F2F1;
        justify-content: space-between;
        align-items: center;
        .icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 0.36rem;
        }
        span:nth-child(2){
            font-weight: 700;
            font-size: 0.48rem;

        }


    }
    .order-wrapper{
        background: #EFF0EF;
        width: 100%;
    }

    .order-goods{
        /*width: 100%;*/
        margin-top: 87px;
        padding: 30px;
        background: white;
        margin-bottom: 22px;
        .order-detail{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-bottom: 30px;
            border-bottom: 1px solid #F5F6F5;
            .order-left{
                margin-right: 20px;
                width: 146px;
                height: 193px;
                &>img{
                    width: 100%;
                    height: 100%;
                }
            }
            .order-right{
                width: 508px;

                text-align: left;
                &>p{
                    margin-top: 10px;
                }
                &>p:nth-child(1){
                    font-size: 30px;
                    font-weight: 500;

                }
                &>p:nth-child(2),&>p:nth-child(3){
                    color: #A5A6A5;
                }
            }
        }
        .order-price{
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            padding-bottom: 30px;

            .price-left{
                font-size: 30px;

            }
            .price-right{
                &>span{
                    vertical-align: middle;
                }
                &>span:nth-child(1){
                    color: #F7791B;
                    font-size: 30px;
                }
                &>span:nth-child(2){
                    width: 35px;
                    height: 35px;
                    display: inline-block;
                    border-radius: 50%;
                    border: 2px solid #B1B2B1;
                    color: #B1B2B1;
                    text-align: center;
                    line-height: 45px;
                    transform: rotateZ(180deg);
                    &.active{
                        transform: rotateZ(0);
                    }
                }
            }

        }
        .order-sale-detail{
            padding: 30px 0;
            display: flex;
            border-top: 1px solid #F5F6F5;
            justify-content: space-between;
            &>div{
                color: #9A9B9A;
                font-size: 28px;
            }
        }


    }

    .order-discount{
        height: 87px;
        display: flex;
        justify-content: space-between;
        background: white;
        line-height: 87px;
        padding: 0 30px;
        margin-bottom: 22px;
        .discount-left{
            font-size: 28px;
            &:before{
                content: "";
                display: inline-block;
                width: 30px;
                height: 30px;
                background: url("https://m.juooo.com/public/basic//Home/app/app-juooo4/images/icon-gift.png") no-repeat;
                background-size: cover;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
        .discount-right{
            color: #989998;
        }
    }

    .order-delivery{
        padding: 30px;
        background: white;
        text-align: left;
        margin-bottom: 22px;
        .delivery-title{
            color: #656665;
            text-align: left;
            margin-bottom: 30px;
        }
        .delivery-methods{
            text-align: left;
            margin-bottom: 20px;
            &>span{
                margin-right: 22px;
                display: inline-block;
                width: 160px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                color: #656665;
                border: 1px solid #EDEEED;
                border-radius: 6px;
                &.methodsActive{
                    background: #F7791B;
                    color: white;
                    border: 1px solid #F7791B;
                }
            }
        }
        .delivery-methods-express{
            padding: 25px;
            border-radius: 10px;
            background: #F4F5F4;
            color: #989998;
            &:before{
                content: "+";
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
                color: #F68B41;
                border: 2px solid #F68B41;
                margin-right: 10px;
            }
            &:after{
                content: ">";
                display: inline-block;
                margin-left: 400px;
                color: #BBBCBB;
                font-size: 30px;
            }
        }

        .delivery-methods-visit,.delivery-methods-live{
            padding: 25px;
            border-radius: 10px;
            background: #F4F5F4;
            .visit-title{
                color: #9A9B9A;
                text-align: center;
                margin-bottom: 15px;
            }
            .visit-inputs{
                margin-bottom: 25px;
                background: white;
                padding: 0 15px;
                border-radius: 10px;
                &>p{
                    width: 100%;
                    line-height: 90px;

                    &>input{
                        display: inline-block;
                        color: #747574;
                        border: none;
                        outline: none;

                    }
                    &:before{
                        content: "";
                        display: inline-block;
                        width: 30px;
                        height: 50px;
                        margin-right: 10px;
                        vertical-align: middle;
                    }

                    &:nth-child(1){
                        border-bottom: 1px solid #F5F6F5;
                        &:before{
                            background: url("https://m.juooo.com/public/basic//Home/app/app-juooo4/images/icon2.png") no-repeat;
                            background-size: contain;
                        }
                    }
                    &:nth-child(2):before{
                        background: url("https://m.juooo.com/public/basic//Home/app/app-juooo4/images/icon3.png") no-repeat;
                        background-size: contain;

                    }
                }



            }
            .visit-address,.visit-time{
                color: #9A9B9A;
                margin-bottom: 15px;
                &>p{
                    line-height: 33px;
                }
            }

        }
    }

    .order-summation{
        padding: 30px;
        background: white;
        &>p{
            line-height: 90px;
            border-bottom: 1px solid #F8F9F8;
            display: flex;
            justify-content: space-between;
        }
    }
    .order-bottom{
        height: 200px;
    }
</style>