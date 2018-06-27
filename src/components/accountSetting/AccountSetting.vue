<template>
    <div class="account-setting">
        <div class="mine-header">
            <div class="arrow-wrapper" @click="back">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">账户设置</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="box my-avatar">
            <div class="left">头像</div>
            <div class="right">
                <div class="avatar">
                    <img height="30" width="30" src="https://m.juooo.com/public/basic/Home/app/app-juooo4/images/common/logo-user.png" alt="">
                </div>
            </div>
        </div>
        <div class="box nickname">
            <div class="left">昵称</div>
            <div class="right">18380591638</div>
        </div>
        <div class="box phone">
            <div class="left">手机号</div>
            <div class="right">183****1638</div>
        </div>
        <div class="box">
            <div class="left">邮箱</div>
        </div>
        <div class="box">
            <div class="left">登录密码</div>
            <div class="right">
                <span>修改</span><i class="icon ion-chevron-right right"></i>
            </div>
        </div>
        <div class="box">
            <div class="left">支付密码</div>
            <div class="right">
                <span>设置</span><i class="icon ion-chevron-right right"></i>
            </div>
        </div>
        <div class="box">
            <div class="left">实名认证</div>
            <div class="right">
                <span>未认证</span> <i class="icon ion-chevron-right right"></i>
            </div>
        </div>

        <div class="box">
            <div class="left">学生身份认证</div>
            <div class="right">
                <span>去验证</span><i class="icon ion-chevron-right right"></i>
            </div>
        </div>
        <div class="box young">
            <div class="left">Young身份认证</div>
            <div class="right">
                <span>去验证</span><i class="icon ion-chevron-right right"></i>
            </div>
        </div>
        <div class="out-login" @click="loginOut">
            <div class="left">退出登录</div>
        </div>
    </div>
</template>

<script>
    import Bus from '../../common/js/bus'
    export default {
        name: "accountSetting",
        data(){
            return{
                isLogin:false
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            loginOut(){
                Bus.$emit('loginOut',this.isLogin);
                sessionStorage.removeItem('user')
                this.$router.push('/mine');
                console.log(sessionStorage.getItem('user'))
            }
        },
        mounted(){
            this.$nextTick(() => {

            })
        }
    }
</script>

<style scoped lang="less">
.account-setting{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 120;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
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
    .my-avatar,.phone{
        margin-top: 20px;
    }
    .nickname,.young{
        border: none;
    }
    .box{
        display: flex;
        padding: 0 30px;
        background: #fff;
        color: #666;
        border-bottom: 1px solid #ebebeb;
        .left{
            flex: 0 0 50%;
            text-align: left;
            height: 100px;
            line-height: 100px;
            font-size: 28px;
            font-weight: 500;
        }
        .right{
            flex: 0 0 50%;
            height: 100px;
            width: 100px;
            line-height: 100px;
            text-align: right;
            position: relative;
            .avatar{
                position: absolute;
                right: 10px;
                top: 10px;
                height: 80px;
                width: 80px;
                border-radius: 50%;
                background: #f5f5f5;
                &>img{
                    display: block;
                    border-radius: 50%;
                    margin: 10px;
                }
            }
            &>span{
                display: inline-block;
                margin-right: 10px;
            }
            .icon{
                font-size: 20px;
                color: rgba(7,17,27,0.3);
            }
        }
    }
    .out-login{
        width: 80%;
        height: 60px;
        border: 1px solid rgba(47,53,59,0.2) ;
        line-height: 60px;
        font-size: 26px;
        margin: 30px 10%;
    }
}
</style>