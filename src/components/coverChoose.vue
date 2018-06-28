<template>
    <div class="cover-wrapper" v-if="ShowCover" @click.stop.prevent="showCover">
        <div class="cover" >
        </div>
        <div class="go-back">
            <p @click="goToHome"><span class="icon home"></span><span>首页</span></p>
            <p @click="goToMine"><span class="icon mine"></span><span>我的聚橙</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cover-choose",
        data(){
            return {
                ShowCover:true
            }
        },
        methods:{
            goToMine(){
                this.$router.push({
                    path:"/mine"
                })
            },
            goToHome(){
                this.$router.push({
                    path:"/"
                })
            },
            showCover(){
                this.ShowCover = !this.ShowCover;
                this.$emit('isShow',this.ShowCover);
            }
        }
    }
</script>

<style scoped lang="less">

    .cover-wrapper{
        position: relative;
        z-index: 555;
        width: 100%;
        height: 100%;
        .cover{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
        .go-back{
            position: absolute;
            top: 87px;
            right: 10px;
            border-radius: 8px;
            background: white;
            &:before{
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                transform: rotateZ(45deg);
                background: white;
                position: absolute;

                right: 10px;

                top: -5px;
            }
            &>p{
                padding: 0 35px;
                line-height: 88px;
                text-align: left;

                &>span{
                    vertical-align: middle;

                }
                .icon{
                    display: inline-block;
                    height: 40px;
                    width: 40px;
                    margin-right: 20px;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .home{
                    background-image: url('http://image.juooo.com/group1/M00/00/79/rAoKmVmH47OAEN_7AAAIHv30S98667.png');
                }
                .mine{
                    background-image: url('http://image.juooo.com/group1/M00/00/79/rAoKmVmH4-uABxS3AAAH20p7I5Y344.png');
                }
            }
            &>p:nth-child(1){
                border-bottom: 1px solid #FAFBFA;


            }


        }
    }
</style>