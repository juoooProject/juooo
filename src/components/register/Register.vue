<template>
    <div class="register-main">
        <div class="mine-header">
            <div class="arrow-wrapper" @click="back">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">注册</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="register">
            <div class="register-wrapper">
                <div class="input phone">
                    <div class="icon">
                        <span class="icon-mobile"></span>
                    </div>
                    <div class="phone-input">
                        <input class="text" type="text" placeholder="手机号">
                    </div>
                </div>
                <div class="input image">
                    <div class="icon">
                        <span class="icon-mail"></span>
                    </div>
                    <div class="image-input">
                        <input class="text" type="text" placeholder="图形码">
                    </div>
                    <div class="image-detail">

                    </div>
                </div>
                <div class="input code">
                    <div class="icon">
                        <span class="icon-mail"></span>
                    </div>
                    <div class="code-input">
                        <input class="text" type="text" placeholder="输入验证码">
                    </div>
                    <div class="get-code">
                        <button class="get-code-btn">获取验证码</button>
                    </div>
                </div>

                <div class="protocol">
                    <span class="text">注册代表您已同意</span><a href="" class="protocol-link">聚橙网服务协议</a>
                </div>
                <div class="next-step">
                    <!--<button class="next-step-btn">下一步</button>-->
                    <router-link to="/mine/finishRegister" tag="button" class="next-step-btn">下一步</router-link>
                </div>
                <div class="login">
                    <span class="text">已有账号？<a href="" class="login-now">立即登录</a></span>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Register",
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
.register-main{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 120;
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
    .register{
        margin-top: 15px;
        .register-wrapper{
            .input {
                display: flex;
                position: relative;
                background: #fff;
                padding: 0 30px;
                height: 90px;
                .icon{
                    flex: 0 0 45px;
                    display: inline-block;
                    margin-right: 5%;
                    &>span{
                        font-size: 32px;
                        line-height: 90px;
                        height: 90px;
                        color:#d8d8d8;
                    }
                }
                .phone-input,.image-input,.code-input{
                    flex: 1;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    border-bottom: 1px solid #e7e7e7;
                    height: 90px;
                    .text{
                        display: inline-block;
                        margin-top: 15px;
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        font-size: 24px;
                        color: #666;
                    }
                }
                .code-input{
                    border-bottom: none;
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
            .protocol{
                margin-top: 30px;
                padding: 0 30px;
                font-size: 24px;
                color: #b3b3b3;
                text-align: left;
                font-weight: 400;
                .protocol-link{
                    display: inline-block;
                    text-indent: 5px;
                    color: #b3b3b3;
                    text-decoration: underline;
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
            .login{
                margin:50px 30px 0;
                .text{
                    font-size: 30px;
                    color: #999;
                    font-weight: 500;
                    .login-now{
                        display: inline-block;
                        text-indent: 5px;
                        color: #666;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>