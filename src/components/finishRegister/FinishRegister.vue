<template>
    <div class="finish-register">
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
                        <input name="phoneNum" class="text" type="number" placeholder="" v-model="phoneNumber">
                    </div>
                </div>
                <div class="input pwd">
                    <div class="icon">
                        <span class="icon-lock"></span>
                    </div>
                    <div class="pwd-input">
                        <input id="passwd" name="passWord" class="text" type="password" placeholder="设置密码">
                    </div>
                </div>
                <div class="prompt">
                    <p class="prompt-text">密码只能是不包含空格的6-20位字符</p>
                </div>
                <div class="submit">
                    <button @click="register" class="submit-btn">完成注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FinishRegister",
        data(){
            return{
                phoneNumber:this.$route.query.phoneNum,
                password:''
            }
        },
        methods:{
            register(){
                this.$http.post('/api/register',{phoneNum:this.phoneNumber,passWord:this.password}).then((response) => {
                    alert('register success');
                    console.log(response)
                })
            },
            back(){
                this.$router.go(-1)
            },
        },
        mounted(){
            this.$nextTick(() => {
                let pwdVal = $("#passwd");
                $("#passwd").blur(()=>{
                   this.password = $("#passwd").val()
                    console.log(this.password)
                })
            })
        }
    }
</script>

<style scoped lang="less">
    .finish-register{
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
                    .phone-input,.pwd-input{
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
                    .pwd-input{
                        border-bottom: none;
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
                .submit{
                    margin: 50px 30px 0;
                    .submit-btn{
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
    }
</style>