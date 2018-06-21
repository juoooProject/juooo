<template>
    <div class="code">
      <form action="">
      <div class="input">
        <div class="icon-wrapper">
          <div class="icon">
            <span class="icon-mobile"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <input class="text" type="text" placeholder="手机号">
        </div>
      </div>
      <div class="input">
        <div class="icon-wrapper">
          <div class="icon">
            <span class="icon-mail"></span>
          </div>
        </div>
        <div class="codeInput">
          <input class="text" type="text" placeholder="请输入验证码">
        </div>
        <div class="getCode">
          <button class="getCodeBtn">获取验证码</button>
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
        name: "LoginCode"
    }
</script>

<style scoped lang="less">
  .code{
    padding-top: 15px;
    .input{
      display: flex;
      position: relative;
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
          .icon-mobile,.icon-mail {
            font-size: 32px;
            color: rgba(47,53,59,0.5)
          }
        }
      }
      .text-wrapper{
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
          font-size: 16px;
        }
      }
      .getCode{
        position: absolute;
        width: 25%;
        top: 15px;
        right: 28px;
        .getCodeBtn{
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
    }
  }
</style>
