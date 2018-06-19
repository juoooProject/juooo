<template>
    <div class="mine">
      <div class="mine-header">
        <div class="arrow-wrapper">
          <span class="arrow"><</span>
        </div>
        <div class="logo-wrapper">
          <span class="logo">JUOOO</span>
        </div>
        <div class="arrow-wrapper">
        </div>
      </div>
      <div class="loginWay">
        <div class="pwd active">
          <span class="pwd-text">密码登录</span>
        </div>
        <div class="code">
          <span class="code-text">验证码登录</span>
        </div>
      </div>
      <div class="input-main">
        <login-pwd></login-pwd>
        <login-code></login-code>
      </div>
    </div>
</template>

<script>
  import LoginCode from '../components/loginByCode/LoginCode'
  import LoginPwd from '../components/loginByPassword/LoginPwd'
    export default {
        name: "Mine",
        components:{
          LoginCode,
          LoginPwd
        }
    }
</script>

<style lang="less" scoped>
.mine{
  position:relative;
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
    }
    .logo-wrapper{
      flex: 1;
      text-align: center;
    }
  }
  .loginWay{
    display: flex;
    height: 78px;
    width:100%;
    font-size: 30px;
    color: #212121;
    font-weight: 400;
    background-color: #fff;
    line-height: 78px;
    .pwd{
      height: 100%;
      flex: 0 0 50%;
      .pwd-text{
        display: inline-block;
        height: 100%;
      }
      &.active{
        .pwd-text{
          color: #ff7919;
          border-bottom: 2px solid #ff7919;
        }
      }
    }
    .code{
      height: 100%;
      flex: 0 0 50%;
      .code-text{
        display: inline-block;
        height: 100%;
      }
      &.active{
        .code-text{
          color: #ff7919;
          border-bottom: 2px solid #ff7919;
        }
      }
    }
  }
}
</style>
