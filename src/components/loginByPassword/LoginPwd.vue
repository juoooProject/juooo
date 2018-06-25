<template>
    <div class="loginByPwd" v-if="">
      <form action="" class="password-login">
        <div class="input">
          <div class="icon-wrapper">
            <div class="icon">
              <span class="icon-user"></span>
            </div>
          </div>
          <div class="text-wrapper">
            <input id="user" class="text"  type="text" placeholder="手机号/邮箱" v-model="phoneNumber">
          </div>
        </div>
        <div class="input">
          <div class="icon-wrapper">
            <div class="icon">
              <span class="icon-lock"></span>
            </div>
          </div>
          <div class="pwd-wrapper">
            <input id="pwd" class="text" type="password" placeholder="密码" v-model="password">
          </div>
        </div>
        <div class="prompt" v-show="showSign">
          <p class="prompt-text">
            <i class="icon ion-help-circled"></i>{{showPrompt}}
          </p>
        </div>
        <div class="submit">
          <button class="submit-btn" :class="{'click':loginClick}" @click.stop.prevent="login">登录</button>
        </div>
      </form>
    </div>
</template>

<script>
  import Bus from '../../common/js/bus'
  import {phoneReg,emailReg,pwdReg} from '../../common/js/inputReg'
  const ERR_OK=1;
  const PHONE_ERR='请输入正确的手机号/邮箱';
  const PWD_ERR = '密码只能是不包含空格的6-20位字符!';
    export default {
        name: "LoginPwd",
        props:{
            good:{}
        },
        data(){
            return{
                showFlag:false,
                password:'',
                existUser:true,
                existPwd:true,
                showSign:false, //提示显隐状态标识
                phoneNumber:'',
                loginState:false, //登录状态
                loginClick:false, //登录按钮背景色控制
                msg:'',
                isOk:true, //用户名和密码是否存在
                couldReq:false //是否可以请求
            }
        },
        created(){
            // this.$router.dispatch()
        },
        methods:{
            show(){

            },
            login(){
                if(this.couldReq){
                    let param = new URLSearchParams()
                    param.append('phoneNum',this.phoneNumber)
                    param.append('passWord',this.password)
                    this.$http.post('/api/login',param).then((response) => {
                        console.log(response)
                        if(response.data.status == ERR_OK){
                            console.log('登录成功')
                            //跳转个人中心界面
                            this.$router.push('/home');
                            this.loginState = true;
                            Bus.$emit('phone',this.phoneNumber)
                            //saveToLocal(this.phoneNumber,'loginState',true);
                            sessionStorage.setItem('user',this.phoneNumber)

                        }else{
                            console.log('登录失败')
                            this.msg = response.data.msg;
                            this.isOk = false;
                            this.showSign = true;
                            console.log(this.msg)
                        }
                    })
                }
            }
        },
        computed:{
            showPrompt(){
                if(this.existUser == false ){
                    return PHONE_ERR;
                }
                if(this.existUser == false && this.existPwd == false){
                    return PHONE_ERR;
                }
                if(this.existPwd == false ){
                    return PWD_ERR;
                }
                if(this.isOk == false){
                    return this.msg;
                }
            }
        },
        mounted(){
            //手机正则："^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"
            //邮箱正则：^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$
            // pwd : ^[A-Z0-9[^ ]]{6,20}$
            this.$nextTick(() => {
                //获取登录状态


                // var phoneReg = /^(13[0-9]|14[5|7]|15[0-3]|[5-9]|18[0-9])\d{8}$/;
                // // var emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                // var pwdReg = /^[\\p{Punct}a-zA-Z0-9]{6,20}$/;
                // var isMatch = false;
                //密码输入框失去焦点,检查用户名和密码是否符合规范
                let loginBtn = $('.submit-btn');
                loginBtn.on('touchstart',()=>{
                    this.existUser = true;
                    this.existPwd = true;
                    this.showSign = false;
                    if(this.phoneNumber == "" || !phoneReg.test(this.phoneNumber)){
                        this.showSign = true;
                        this.existUser = false;
                    }else if(this.password=="" || !pwdReg.test(this.password)){
                        this.showSign = true;
                        this.existPwd = false;
                    }else{}
                    if(phoneReg.test(this.phoneNumber) && pwdReg.test(this.password)){
                        this.loginClick = !this.loginClick;
                        this.couldReq = true
                    }
                })

            })
        }
    }
</script>
<style lang="less" scoped>
.loginByPwd{
  padding-top: 15px;
  .input{
    display: flex;
    width: 100%;
    height: 90px;
    line-height: 90px;
    background:#fff;
    color: #666;
    .icon-wrapper{
      flex: 0 0 12%;
      width:12%;
      height: 100%;
      .icon{
        align-items: center;
        width:100%;
        height:32px;
        margin-top: 20px;
        .icon-user,.icon-lock {
          font-size: 32px;
          color:#d8d8d8;
        }
      }
    }
    .text-wrapper,.pwd-wrapper{
      flex: 1;
      box-sizing:border-box;
      margin-right: 5%;
      height: 100%;
      border-bottom: 1px solid #e7e7e7;
      .text{
        display: inline-block;
        width: 100%;
        height:60px;
        line-height:60px;
        font-size: 24px;
      }
    }
    .pwd-wrapper{
      border-bottom: none;
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
  .submit{
    width: 90%;
    margin: 2% 5%;
    .submit-btn{
      display: block;
      width: 100%;
      color: #999;
      background-color: #e6e6e6;
      cursor: not-allowed;
      border: none;
      outline: none;
      font-size: 32px;
      height: 75px;
      line-height: 75px;
      letter-spacing: 10px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      font-weight: 700;
      &.click{
        border: 1px solid #ff7919;
        color: #fff;
        background-color: #ff7919;
      }
    }

  }
}
</style>
