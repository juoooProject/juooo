<template>
    <div class="loginByPwd">
      <form action="">
        <div class="user-wrapper">
          <span class="user-icon"></span>
          <input type="text" placeholder="手机号/邮箱">
        </div>
        <div class="pwd-wrapper">
          <span class="pwd-icon"></span>
          <input type="password" placeholder="密码">
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
  margin-top: 15px;

}
</style>
