<template>
    <div class="register-main">
        <div class="mine-header">
            <div class="arrow-wrapper" @click="back">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">注册</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="register">
            <div class="register-wrapper">
                <div class="input phone">
                    <div class="icon">
                        <span class="icon-mobile"></span>
                    </div>
                    <div class="phone-input">
                        <input id="phone" name="phoneNum" class="text" type="text" placeholder="手机号" v-model="phoneNumber">
                    </div>
                </div>
                <div class="input image">
                    <div class="icon">
                        <span class="icon-mail"></span>
                    </div>
                    <div class="image-input">
                        <input class="text" type="text" placeholder="图形码" v-model="code1">
                    </div>
                    <div class="identify">
                        <s-identify></s-identify>
                    </div>
                </div>
                <div class="input code">
                    <div class="icon">
                        <span class="icon-mail"></span>
                    </div>
                    <div class="code-input">
                        <input id="codeInput" class="text" type="text" placeholder="输入验证码" v-model="code2">
                    </div>
                    <div class="get-code">
                        <button class="get-code-btn" @click.stop.prevent="getCode">
                            <span v-if="!sendDisabled">获取验证码</span>
                            <span v-if="sendDisabled">{{time}}秒后获取</span>
                        </button>
                    </div>
                </div>

                <div class="protocol">
                    <span class="text">注册代表您已同意</span><a href="" class="protocol-link">聚橙网服务协议</a>
                </div>
                <div class="prompt" v-show="showSign">
                    <p class="prompt-text">
                        <i class="icon ion-help-circled"></i>{{showPrompt}}
                    </p>
                </div>
                <div class="next-step">
                    <!--<button class="next-step-btn">下一步</button>-->
                    <button tag="button" class="next-step-btn" :class="{'active':could}">下一步</button>
                </div>
                <div class="login">
                    <span class="text">已有账号？<a href="" @click.stop.prevent="loginNow" class="login-now">立即登录</a></span>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Bus from '../../common/js/bus'
    import SIdentify from '../identify/identify'
    import {phoneReg,emailReg,pwdReg} from '../../common/js/inputReg'
    export default {
        name: "Register",
        data(){
            return{
                phoneNumber:'',
                time:60,
                sendDisabled:false,
                showSign:false,
                phoneIsRight:false,  //手机号正确匹配
                codeNum:'',
                code1:'',
                code2:'',
                code1Err:false,
                code2Err:false,
                could:false
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            getCode(){
                this.sendDisabled = true;
                let timer = setInterval(() => {
                    if((this.time--)<= 0){
                        this.time = 60;
                        this.sendDisabled = false;
                        clearInterval(timer);
                    }
                },1000);
            },
            loginNow(){
                this.$router.push('/mine')
            }
        },
        created(){
            Bus.$on('getCode',(code)=>{
                this.codeNum = code;
                console.log(this.codeNum)
            })
        },
        computed:{
            showPrompt(){
                if(this.phoneIsRight == false){
                    return '请输入正确的手机号';
                }
                if(this.code1Err){
                    return "请输入正确的图形验证码";
                }
                if(this.code2Err){
                    return '请输入正确的验证码';
                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                const nextStepBtn = $('.next-step-btn');
                const phoneInput = $('#phone');
                phoneInput.on('input',() => {
                    let val = phoneInput.val();
                    console.log(val)
                    if(!phoneReg.test(val)){
                        console.log(1)
                        this.phoneIsRight = false;
                        this.showSign = true;
                    }else{
                        this.phoneIsRight = true;
                        this.showSign = false;
                    }
                })
                console.log(this.showSign)

                let codeInp = $('#codeInput');
                codeInp.on('blur',()=>{
                    if (this.code1Err==false && this.code2Err==false && this.phoneIsRight==true && this.code1 !=='' && this.code2 !=='')
                    {
                        this.could = true;
                    }
                })
                nextStepBtn.on('touchstart',() => {
                    //路由跳转
                    this.showSign = false;
                    if (this.code1!==this.codeNum){
                        this.code1Err = true
                        this.showSign = true;
                    }else if (this.code2!==this.codeNum){
                        this.code1Err = false
                        this.showSign = true;
                        this.code2Err = true;
                    } else if (this.code1Err==false && this.code2Err==false && this.phoneIsRight==true && this.code1 !=='' && this.code2 !==''){
                        this.could = true;
                        this.$router.push({path:'/mine/finishRegister',query:{phoneNum:this.phoneNumber}})
                    }

                })

            })
        },
        components:{
            SIdentify
        }
    }
</script>

<style scoped lang="less">
.register-main{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 120;
    width:100%;
    height:100%;
    background: #f6f6f6;
    .mine-header{
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
    .register{
        margin-top: 15px;
        .register-wrapper{
            .input {
                display: flex;
                position: relative;
                background: #fff;
                padding: 0 30px;
                height: 90px;
                .icon{
                    flex: 0 0 45px;
                    display: inline-block;
                    margin-right: 5%;
                    &>span{
                        font-size: 32px;
                        line-height: 90px;
                        height: 90px;
                        color:#d8d8d8;
                    }
                }
                .phone-input,.image-input,.code-input{
                    flex: 1;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    border-bottom: 1px solid #e7e7e7;
                    height: 90px;
                    .text{
                        display: inline-block;
                        margin-top: 15px;
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        font-size: 24px;
                        color: #666;
                    }
                }
                .identify{
                    position: absolute;
                    right: 30px;
                    top: 15px;
                    width: 240px;
                    height: 60px;
                }
                .code-input{
                    border-bottom: none;
                }
                .get-code{
                    position: absolute;
                    width: 25%;
                    top: 15px;
                    right: 28px;
                    .get-code-btn{
                        display: block;
                        width: 100%;
                        color: #999;
                        background-color: #e6e6e6;
                        cursor: not-allowed;
                        border: none;
                        outline: none;
                        font-size: 25px;
                        height: 60px;
                        line-height: 60px;
                        -webkit-border-radius: 3px;
                        -moz-border-radius: 3px;
                        border-radius: 3px;
                        font-weight: 400;
                    }
                }
            }
            .protocol{
                margin-top: 30px;
                padding: 0 30px;
                font-size: 24px;
                color: #b3b3b3;
                text-align: left;
                font-weight: 400;
                .protocol-link{
                    display: inline-block;
                    text-indent: 5px;
                    color: #b3b3b3;
                    text-decoration: underline;
                }
            }
            .prompt{
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
            .next-step{
                margin: 50px 30px 0;
                .next-step-btn{
                    display: block;
                    width: 100%;
                    height: 90px;
                    border-radius: 5px;
                    -webkit-border-radius:5px;
                    font-size: 28px;
                    border: 1px solid #e6e6e6;
                    color: #999;
                    background-color: #e6e6e6;
                    cursor: not-allowed;
                    outline: none;
                    &.active{
                        border: 1px solid #ff7919;
                        width: 100%;
                        font-size: 24px;
                        color: #fff;
                        background-color: #ff7919;
                    }
                }
            }
            .login{
                margin:50px 30px 0;
                .text{
                    font-size: 30px;
                    color: #999;
                    font-weight: 500;
                    .login-now{
                        display: inline-block;
                        text-indent: 5px;
                        color: #666;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>