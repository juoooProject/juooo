<template>
    <div class="loginByPwd" v-if="showFlag">
      <form action="" class="password-login">
        <div class="input">
          <div class="icon-wrapper">
            <div class="icon">
              <span class="icon-user"></span>
            </div>
          </div>
          <div class="text-wrapper">
            <input class="text" type="text" placeholder="手机号/邮箱">
          </div>
        </div>
        <div class="input">
          <div class="icon-wrapper">
            <div class="icon">
              <span class="icon-lock"></span>
            </div>
          </div>
          <div class="pwd-wrapper">
            <input class="text" type="password" placeholder="密码">
          </div>
        </div>
        <div class="prompt">
          <span></span>
          <p class="prompt-text">请输入正确的手机号/邮箱</p>
        </div>
        <div class="submit">
          <button class="submit-btn">登录</button>
        </div>
      </form>
    </div>
</template>

<script>
    export default {
        name: "LoginPwd",
        data(){
            return{
                showFlag:false
            }
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
