<template>
    <div class="loginByPwd">
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
          <input type="submit" value="登录">
        </div>
      </form>
    </div>
</template>

<script>
    export default {
        name: "LoginPwd"
    }
</script>

<style lang="less" scoped>
.loginByPwd{
  padding: 15px 15px 0;
  .input{
    display: flex;
    width: 100%;
    height: 90px;
    line-height: 90px;
    background:#fff;
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
          color: rgba(47,53,59,0.5)
        }
      }
    }
    .text-wrapper,.pwd-wrapper{
      flex: 1;
      box-sizing:border-box;
      margin-right: 4%;
      height: 100%;
      border-bottom: 1px solid #e7e7e7;
      .text{
        display: inline-block;
        width: 100%;
        height:60px;
        line-height:60px;
        font-size: 16px;
      }
    }
    .pwd-wrapper{
      border-bottom: none;
    }
  }
  .prompt{
    color: #b3b3b3;

  }
}
</style>
