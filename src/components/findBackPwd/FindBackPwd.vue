<template>
    <div class="find-back-pwd">
        <div class="mine-header">
            <div class="arrow-wrapper">
                <span class="icon-angle-left"></span>
            </div>
            <div class="text-wrapper">
                <span class="text">找回密码</span>
            </div>
            <div class="arrow-wrapper">
            </div>
        </div>
        <div class="step-by-step">
            <div class="step">
                <span class="one-step active" :class="active">1.输入账号</span>
                <span class="right">&gt;</span>
                <span class="two-step">2.填写验证码</span>
                <span class="right">&gt;</span>
                <span class="three-step">3.设置新密码</span>
            </div>
            <div class="input">
                <div class="icon">
                    <span class="icon-user"></span>
                </div>
                <div class="phone-input">
                    <input class="text" type="text" placeholder="手机号/邮箱" value="">
                </div>
            </div>
            <div class="prompt">
                <p class="prompt-text">密码只能是不包含空格的6-20位字符</p>
            </div>
            <div class="next-step">
                <button class="next-step-btn">下一步</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FindBackPwd",
        data(){
            return{
                showFlag:false
            }
        }
    }
</script>

<style scoped lang="less">
.find-back-pwd{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
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
    .step-by-step{
        .step{
            padding: 0 30px;
            background: #fff;
            color: #999;
            height: 75px;
            line-height: 75px;
            font-size: 0;
            font-weight: 700;
            .one-step,.two-step,.three-step{
                display: inline-block;
                width: 30%;
                font-size: 28px;
                &.active{
                    color: #ff7919;
                }
            }
            .right{
                height: 20px;
                height: 20px;
                font-size: 20px;
                width: 5%;
            }
        }
        .input {
            display: flex;
            position: relative;
            background: #fff;
            margin-top: 30px;
            padding: 0 30px;
            height: 90px;
            .icon {
                flex: 0 0 45px;
                display: inline-block;
                margin-right: 5%;
                & > span {
                    font-size: 32px;
                    line-height: 90px;
                    height: 90px;
                    color: #d8d8d8;
                }
            }
            .phone-input {
                flex: 1;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                border-bottom: 1px solid #e7e7e7;
                height: 90px;
                .text {
                    display: inline-block;
                    margin-top: 15px;
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    font-size: 24px;
                    color: #666;
                }
            }
        }
        .prompt{
            margin-top: 30px;
            padding: 0 30px;
            font-size: 24px;
            color: #b3b3b3;
            text-align: left;
            font-weight: 400;
            .prompt-text{
                display: inline-block;
                text-indent: 5px;
                color: #b3b3b3;
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
    }
}

</style>