<template>
    <div class="find-back-pwd">
        <div class="mine-header">
            <div class="arrow-wrapper" @click="back">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">找回密码</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="step-by-step">
            <div class="step">
                <span class="one-step" :class="{'active':state==1}" @click="state==1">1.输入账号</span>
                <span class="right">&gt;</span>
                <span class="two-step" :class="{'active':state==2}" @click="state==2">2.填写验证码</span>
                <span class="right">&gt;</span>
                <span class="three-step" :class="{'active':state==3}" @click="state==3">3.设置新密码</span>
            </div>
            <div class="input" v-show="state==1">
                <div class="icon">
                    <span class="icon-user"></span>
                </div>
                <div class="phone-input">
                    <input class="text phoneInput" type="text" placeholder="手机号/邮箱" value="" v-model="phoneNumber">
                </div>
            </div>
            <div class="my-phone" v-show="state==2||state==3">
                <div class="phone-number">
                    <p>{{phoneNumber}}</p>
                </div>
            </div>
            <div class="input code" v-show="state==2" >
                <div class="icon">
                    <span class="icon-mail"></span>
                </div>
                <div class="code-input">
                    <input id="codeInput" class="text" type="text" placeholder="输入验证码" v-model="codeNum">
                </div>
                <div class="get-code">
                    <button class="get-code-btn" @click.stop.prevent="getCode">
                        <span v-if="!sendDisabled">获取验证码</span>
                        <span v-if="sendDisabled">{{time}}秒后获取</span>
                    </button>
                </div>
            </div>
            <div class="input pwd" v-show="state==3">
                <div class="icon">
                    <span class="icon-lock"></span>
                </div>
                <div class="pwd-input">
                    <input id="passwd" name="passWord" class="text passwd" type="password" placeholder="设置密码" v-model="password">
                </div>
            </div>

            <div class="prompt" v-show="showSign">
                <p class="prompt-text"><i class="icon ion-help-circled"></i>{{showPrompt}}</p>
            </div>
            <div class="next-step">
                <button v-show="state==1" class="next-step-btn phone-right" @click="" :class="{'active':showSign==false}">下一步</button>
                <button v-show="state==2" class="next-step-btn code-right" @click="" :class="{'active':showSign==false}">下一步</button>
                <button v-show="state==3" class="next-step-btn pwd-right" @click="" :class="{'active':showSign==false}">确定</button>
            </div>
        </div>

    </div>
</template>

<script>
    import {phoneReg,emailReg,pwdReg} from '../../common/js/inputReg'
    export default {
        name: "FindBackPwd",
        data(){
            return{
                showFlag:false,
                state:1,
                code:1234,
                password:'',
                phoneNumber:'',
                codeNum:'',
                time:60,
                sendDisabled:false,
                phoneRight:false,
                showSign:false,  //显示提示
                codeRight:false, //验证码是否正确
                pwdRight:false,  //密码是否正确
                couldTurn:false //点击可以跳转
            }
        },
        computed:{
            showPrompt(){
                if(this.state == 1){
                    return '请输入正确的手机号';
                }
                if(this.state == 2){
                    return '验证码错误';
                }
                if(this.state == 3){
                    return '密码只能是不包含空格的6-20位字符';
                }
            },
            // btnText(){
            //     if(this.state == 1 ||this.state == 2 ){
            //         return '下一步';
            //     }
            //     if(this.state == 3){
            //         return '确定';
            //     }
            // }
        },
        methods:{
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
            back(){
                this.$router.go(-1)
            },
            nextStep(){
                if(this.state == 3){
                    return;
                }
                this.state++;
            }
        },
        mounted(){
            this.$nextTick(() => {
                let phoneInput = $(".phoneInput");
                let codeInput = $('#codeInput');
                let pwdInput = $('.passwd');
                let phoneBtn = $('.phone-right')
                let codeBtn = $('.code-right')
                let pwdBtn = $('.pwd-right')

                phoneInput.on('input',()=>{
                   if(!phoneReg.test(this.phoneNumber) && this.phoneNumber!==""){
                       console.log(1)
                       this.showSign = true;
                   }else{
                       this.showSign = false;
                       this.phoneRight = true; //手机号正确
                   }
                })
                phoneBtn.on('touchstart',() => {
                    if(this.phoneRight){
                        this.nextStep();
                    }
                    // if(!this.showSign && phoneReg.test(this.phoneNumber)){
                    //     this.nextStep()
                    // }
                    // if(!this.showSign && (this.codeNum == this.code)) {
                    //     this.nextStep()
                    // }
                    // if(!this.showSign && pwdReg.test(this.password)){
                    //     this.nextStep()
                    // }
                    // if(phoneReg.test(this.phoneNumber)){
                    //     this.nextStep();
                    //
                    //     this.showSign = false;
                    // }
                    // if(this.codeNum !== this.code && this.codeNum!==''){
                    //     this.showSign = true;
                    // }else{
                    //     this.showSign = false;
                    //     this.nextStep()
                    // }
                })
                codeInput.on('input',() => {
                    if(this.code == this.codeNum){
                        this.showSign = false;
                    }
                })
                codeBtn.on('touchstart',() => {
                    this.phoneRight = false;
                    if(this.code !== this.codeNum && this.codeNum!==''){
                        this.showSign = true;
                    }
                    if(this.code == this.codeNum){
                        this.showSign = false;
                        this.nextStep();
                        this.codeRight = true;
                    }
                })
                pwdInput.on('input',() => {
                    if(pwdReg.test(this.password)){
                        this.showSign = false;
                    }
                })
                pwdBtn.on('touchstart',() => {
                    this.codeRight = false;
                    if(!pwdReg.test(this.password) && this.password !== ''){
                        this.showSign = true;
                    }
                    if(pwdReg.test(this.password)){
                        this.showSign = false;
                        this.$router.push('/mine')
                    }
                })

            })
        }
    }
</script>

<style scoped lang="less">
.find-back-pwd{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
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
    .step-by-step{
        .step{
            padding: 0 30px;
            background: #fff;
            color: #999;
            height: 75px;
            line-height: 75px;
            font-size: 0;
            font-weight: 700;
            .one-step,.two-step,.three-step{
                display: inline-block;
                width: 30%;
                font-size: 28px;
                &.active{
                    color: #ff7919;
                }
            }
            .right{
                height: 20px;
                height: 20px;
                font-size: 20px;
                width: 5%;
            }
        }
        .my-phone{
            background: #f6f6f6;
            font-weight: 700;
            line-height: 60px;
            height: 60px;
            .phone-number{
                padding: 15px 0;
                &>p{
                    font-size: 36px;
                    font-weight: 700;
                    color: grey;
                }
            }
        }
        .input {
            display: flex;
            position: relative;
            background: #fff;
            margin-top: 30px;
            padding: 0 30px;
            height: 90px;
            .icon {
                flex: 0 0 45px;
                display: inline-block;
                margin-right: 5%;
                & > span {
                    font-size: 32px;
                    line-height: 90px;
                    height: 90px;
                    color: #d8d8d8;
                }
            }
            .phone-input,.code-input,.pwd-input {
                flex: 1;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                height: 90px;
                .text {
                    display: inline-block;
                    margin-top: 15px;
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    font-size: 24px;
                    color: #666;
                }
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
        .prompt{
            margin-top: 30px;
            padding: 0 30px;
            font-size: 24px;
            color: #b3b3b3;
            text-align: left;
            font-weight: 400;
            .prompt-text{
                display: inline-block;
                text-indent: 5px;
                color: #b3b3b3;
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
    }
}

</style>