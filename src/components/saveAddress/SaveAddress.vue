<template>
    <div class="save-address">
        <div class="mine-header">
            <div class="arrow-wrapper" @click="back">
                <span class="icon icon-arrow_lift"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">新增收货地址</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="message">
            <div class="username">
                <input type="text" placeholder="姓名" v-model="username">
                <i v-if="user" @click="move" class="icon ion-close-circled"></i>
            </div>
            <div class="phone" >
                <input class="phone-input" type="number" placeholder="手机号" v-model="phoneNumber">
                <i v-if="phoneNumber" @click="move" class="icon ion-close-circled"></i>
            </div>

            <div class="pcd" @click="showChoose">
                <div id="city-data" v-show="!hasChoosed">省 市 区</div>
                <div v-show="hasChoosed">{{$store.state.address.province}} {{$store.state.address.city}} {{$store.state.address.country}}</div>
                <i class="icon ion-chevron-right"></i>
            </div>

            <div class="detail">
                <input v-model="detail" class="detail-address" type="text" placeholder="详细地址"></input>
            </div>
        </div>
        <div class="prompt" v-if="showFlag">
            <p class="prompt-text">
                <i class="icon ion-help-circled"></i>您输入的手机号不符合规范
            </p>
        </div>
        <div class="save" @click="saveAddress">保存并使用</div>
        <div class="picker-show" v-show="addressShow">
            <div class="city-picker">
                <span class="cancel" @click="hideChoose">取消</span>
                <span class="choose">选择城市</span>
                <span class="sure" @click="sureAddress">确定</span>
            </div>
            <choose-address></choose-address>
        </div>
        <div class="cover" v-show="addressShow"></div>
    </div>
</template>

<script>
    import {phoneReg,emailReg,pwdReg} from '../../common/js/inputReg'
    //import {mapState,mapMutations,mapActions} from 'vuex'
    import ChooseAddress from  './ChooseAddress'
    export default {
        name: "saveAddress",
        components:{
            ChooseAddress
        },
        data() {
            return{
                username:'',
                phoneNumber:'',
                detail:'',
                addressShow:false,
                hasChoosed:false,
                showFlag:false
            }
        },
        methods:{
            showChoose(){
                this.addressShow = true;
            },
            hideChoose(){
                this.addressShow = false;
            },
            sureAddress(){
                this.addressShow = false;
                this.hasChoosed = true
            },
            move(){
                if(this.user !== "" ){
                    this.user = ''
                }
                if(this.phoneNumber !== ""){
                    this.phoneNumber = ''
                }
            },
            back(){
                this.$router.push({
                    path:'/orderGoods',
                    query:{
                        id:this.$route.query.id
                    }
                })
            },
            saveAddress(){
                if(this.username!=='' && this.phoneNumber!=='' && this.detail!==''){
                    this.$store.commit('getDetailAddress', {
                        username: this.username,
                        phone: this.phoneNumber,
                        detail: this.detail
                    })
                    this.$router.push({
                        path:'/orderGoods',
                        query:{
                            id:this.$route.query.id
                        }
                    })
                }

            }
        },
        mounted(){
            this.$nextTick(()=>{
                let phoneInp = $('.phone-input');
                phoneInp.on('input',()=>{
                    if(!phoneReg.test(this.phoneNumber) && this.phoneNumber!==''){
                        this.showFlag = true;
                    }else{
                        this.showFlag = false;
                    }
                })
            })

        }
    }
</script>

<style scoped lang="less">
.save-address{
    position: relative;
    width:100%;
    height:100%;
    z-index: 1;
    background: #f6f6f6;
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
            .icon-arrow_lift{
                font-size: 30px;
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
    .message{
        position: relative;
        top: 114px;
        left: 0;
        width: 100%;
        padding: 0 20px 0 40px;
        background: #fff;
        .pcd{
            display: flex;
            color: #212121;
            height: 90px;
            line-height: 90px;
            width: 100%;
            border-bottom: 1px solid #d8d8d8;
            text-align: left;
            &>div{
                flex: 1;
                font-size:30px ;
            }
            .icon{
                display: block;
                flex: 0 0 30px;
                font-size:24px;
                color: #999;
            }
        }
        .username,.phone,.detail{
            display: flex;
            border-bottom: 1px solid #d8d8d8;
            color: #666;
            height: 90px;
            line-height: 90px;
            width: 100%;
            font-size: 26px;
            &:last-child{
                margin-bottom: 30px;
                border: none;
            }
            &>input{
                flex: 1;
                display: inline-block;
                width: 100%;
                height:80px;
                color: #212121;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: scroll;
                border: none;
                outline: none;
                font-size:28px ;
            }
            .icon{
                flex: 0 0 30px;
                line-height: 90px;
                height: 90px;
                font-size: 30px;
                color: #999;
            }
        }
    }
    .prompt{
        margin-top: 150px;
        color: #b3b3b3;
        &>p{
            width:100%;
            margin: 32px 0;
            font-size: 23px;
            line-height: 23px;
            text-align: left;
            text-indent: 30px;
        }
    }
    .save{
        height: 90px;
        line-height: 90px;
        width: 80%;
        margin-top: 150px;
        margin-left: 10%;
        font-size:30px;
        font-weight: 500;
        background:#ff7919;
        border: 1px solid #ff7919;
        color: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .picker-show{
        position: absolute;
        z-index: 99;
        bottom:0;
        left:0;
        width:100%;
        .city-picker{
            display: flex;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
            background: #f1f2f4;
            .cancel{
                flex: 0 0 20%;
                color: #999;
                font-size: 24px;
            }
            .choose{
                flex: 1;
                align-items: center;
                font-size: 30px;
                color: #212121;
            }
            .sure{
                flex: 0 0 20%;
                color: #ff7912;
                font-size: 24px;
            }
            &>span{
                font-weight: 500;
                display: block;
            }
        }

    }
    .cover{
         position: absolute;
         z-index:1;
         top:0;
         left:0;
         width:100%;
         height: 100%;
         background: rgba(0,0,0,0.6);
     }
}
</style>