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
            <input id="user" class="text" value="" type="text" placeholder="手机号/邮箱" v-model="username">
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
          <span></span>
          <p class="prompt-text">{{showPrompt}}</p>
        </div>
        <div class="submit">
          <button class="submit-btn" @click="login">登录</button>
        </div>
      </form>
    </div>
</template>

<script>
    export default {
        name: "LoginPwd",
        data(){
            return{
                showFlag:false,
                password:'',
                username:'',
                existUser:false,
                existPwd:false,
                showSign:false
            }
        },
        created(){

        },
        methods:{
            show(){
                return this.showSign;
            },
            login(){
                this.$http.post('/api/login',{phoneNum:this.phoneNumber,passWord:this.password}).then((response) => {
                    console.log(response)
                })
            }
        },
        computed:{
            showPrompt(){
                if(this.existUser == false && this.existPwd == true || (this.existUser == false && this.existPwd == false)){
                    return '请输入正确的手机号/邮箱';
                }
                if(this.existPwd == false && this.existPwd == true){
                    return '密码只能是不包含空格的6-20位字符!';
                }
            }
        },
        mounted(){
            //手机正则："^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"
            //邮箱正则：^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$
            // pwd : ^[A-Z0-9[^ ]]{6,20}$
            this.$nextTick(() => {
                var phoneReg = /^(13[0-9]|14[5|7]|15[0-3]|[5-9]|18[0-9])\d{8}$/;
                var emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                var pwdReg = /^[\\p{Punct}a-zA-Z0-9]{6,20}$/;
                console.log(this.showSign)
                // var isMatch = false;
                $('#pwd').blur(function(){
                    this.username = $('#user').val();
                    this.password = $('#pwd').val();
                    if(phoneReg.test(this.username) || emailReg.test(this.username)){
                        this.existUser = true;
                    }else{
                        this.existUser = false;
                    }
                    if(pwdReg.test(this.password)){
                        this.existPwd = true;
                    }else{
                        this.existPwd = false;
                    }
                    if((!this.existPwd) || (!this.existUser) || ((!this.existUser) && (!this.existPwd))){
                        this.showSign = true;
                        console.log(this.showSign)
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
    }
    &.btn-clock{
      display: block;
      border: 1px solid #ff7919;
      -webkit-border-radius: .128rem;
      border-radius: .128rem;
      width: 100%;
      font-size: .68267rem;
      color: #fff;
      background-color: #ff7919;
    }
  }
}
</style>
