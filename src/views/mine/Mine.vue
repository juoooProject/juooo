<template>
    <div class="mine">
      <div class="mine-wrapper">
        <div class="mine-header">
          <div class="arrow-wrapper" @click="toHome">
            <span class="icon-angle-left"></span>
          </div>
          <div class="logo-wrapper">
            <span class="logo"></span>
          </div>
          <div class="arrow-wrapper">
          </div>
        </div>
        <div class="loginWay">
          <div class="pwd" @click="addActive" :class="{'active':state%2==0}">
            <span class="pwd-text">密码登录</span>
          </div>
          <div class="code" @click="addActive" :class="{'active':state%2==1}">
            <span class="code-text">验证码登录</span>
          </div>
        </div>
        <div class="input-main">
          <login-pwd v-show="state%2==0"></login-pwd>
          <login-code v-show="state%2==1"></login-code>
        </div>
        <div class="mine-footer">
          <!--子路由-->
          <div class="footer-link">
            <router-link to="/mine/register" class="registerNow">立即注册</router-link>
            <router-link to="/mine/findBackPwd" class="forgetPwd">忘记密码？</router-link>
          </div>
          <div class="otherLoginWay">
            <div class="left-split"></div>
            <div class="middle">其他登录方式</div>
            <div class="right-split"></div>
          </div>
          <div class="login-way-main">
            <div class="qq-way"></div>
            <div class="bd-way"></div>
            <div class="wb-way"></div>
          </div>
        </div>
        <router-view></router-view>
      </div>
      <my-page :phoneNumber="phoneNumber" v-if="logined==true"></my-page>
    </div>
</template>

<script>
  import LoginCode from '../../components/loginByCode/LoginCode'
  import LoginPwd from '../../components/loginByPassword/LoginPwd'
  import MyPage from '../../components/myPage/MyPage'
  import Bus from '../../common/js/bus'
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
    export default {
        name: "Mine",
        data(){
          return{
              state:0,
              logined:false,
              phoneNumber:''
          }
        },
        methods:{
          addActive(){
              this.state++;
          },
          toHome(){
              this.$router.push('/home')
          }
        },
        components:{
          LoginCode,
          LoginPwd,
            MyPage
        },
        created(){
            //this.logined = window.localStorage.loginState;

        },
        mounted(){
          this.$nextTick(() => {
              Bus.$on('phone',(phone)=>{
                  this.phoneNumber = phone;
              })
              this.logined = loadFromLocal(this.phoneNumber,'loginSate',false)
              console.log(this.logined)
              // Bus.$on('isLogin',(loginState)=>{
              //     this.logined = loginState
              // })

          })
        }
    }
</script>

<style lang="less" scoped>
.mine{
  position: fixed;
  width:100%;
  height:100%;
  background: #f6f6f6;
  z-index: 100;
  .mine-wrapper{
    position: relative;
    background: #f6f6f6;
    z-index: 100;
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
      .logo-wrapper{
        flex: 1;
        text-align: center;
        .logo{
          display: inline-block;
          width: 136px;
          height: 35px;
          margin: 25px auto;
          background-image:url("icon-logo.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
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
    .mine-footer{
      margin: 22px 0 0;
      .footer-link{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 45px;
        &>a{
          display: inline-block;
          position: absolute;
          width: 30%;
          font-size: 28px;
          height: 50px;
          line-height: 50px;
          color: #666;
        }
        .registerNow{
          margin-left: 0;
          left: 0;
        }
        .forgetPwd{
          margin-right: 0;
          right: 0;
        }
      }
      .otherLoginWay{
        display: flex;
        color: #999;
        font-size: 23px;
        margin-top: 150px;
        &>div{
          flex:1
        }
      }
      .login-way-main{
        display: flex;
        margin-top: 60px;
        width: 45%;
        margin-left: 27.5%;
        height: 100px;
        text-align: center;
        justify-content: space-around;
        &>div{
          width: 100px;
          height: 100px;
          background-repeat: no-repeat;
          background-size: 100px 100px;
        }
        .qq-way{
          background-image: url('qq.png');
        }
        .bd-way{
          background-image: url('bd.png');
        }
        .wb-way{
          background-image: url('wb.png');
        }
      }
    }
  }
}
</style>
