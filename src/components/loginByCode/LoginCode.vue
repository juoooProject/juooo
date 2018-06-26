<template>
    <div class="code">
      <form action="">
      <div class="loginMsg">
        <span class="icon-mobile"></span>
        <input type="text" placeholder="手机号">
      </div>
      <div class="codeMsg">
        <span class="icon-envelop"></span>
        <input type="text" placeholder="请输入验证码">
        <input type="button" value="获取验证码">
      </div>
      <div class="submit">
        <input type="submit" value="登录">
      </div>
    </form>
    </div>
</template>

<script>
    export default {
        name: "LoginCode"
    }
</script>

<style scoped>

</style>
