<template>
    <div class="hot-wrapper" v-if="tourList[0]">
        <div class="hot" v-for="(hot,index) in tourList" @click="goToTicket(hot.id)">
            <div class="hot-left">
                <img :src="hot.other.imgUrl" alt="">
            </div>
            <div class="hot-right">
                <p class="title">{{hot.other.title}}</p>
                <p class="hot-date">{{hot.other.timePeriod}}</p>
                <div class="hot-place">
                    <span>[{{hot.site.city}}]</span>
                    <span>{{hot.site.place}}</span>
                </div>
                <div class="hot-price">
                    ¥ {{hot.other.newPrice}}-{{hot.other.oldPrice}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "hot-performance",
        props:{
            hotLength:Number

            // tourList:Array,
        },
        data(){
            return{
                data:[]
            }
        },
        created(){
            this.$http.get("/api/all").then(({data})=> {
                console.log(data);

                if (data.status) {
                    this.data = data.allList;
                    console.log(this.data);
                }
            });
        },
        methods:{
            goToTicket(item){
                this.$router.push({
                    path:"/ticket",
                    query:{
                        id:item
                    }
                })
            }
        },
        computed:{
            city(){
                if(this.$store.state.currentCity != "全国"){
                    this.$store.state.isShowTour = false;
                }else{
                    this.$store.state.isShowTour = true;
                }
                return this.$store.state.isShowTour;
            },
            tourList(){
                var arr = [];
                if(this.$store.state.currentCity == "全国"){
                    console.log(1);
                    arr = this.data;
                }else {
                    arr = this.data.filter((value,index)=>{
                        return value.site.city==this.$store.state.currentCity;
                    })
                }
                //将对象元素转换成字符串以作比较
                function obj2key(obj, keys){
                    var n = keys.length,
                        key = [];
                    while(n--){
                        key.push(obj[keys[n]]);
                    }
                    return key.join('|');
                }
                //去重操作
                function uniqeByKeys(array,keys){
                    var arr = [];
                    var hash = {};
                    for (var i = 0, j = array.length; i < j; i++) {
                        var k = obj2key(array[i].other, keys);
                        if (!(k in hash)) {
                            hash[k] = true;
                            arr .push(array[i]);
                        }
                    }
                    return arr ;
                }
                var arr = uniqeByKeys(arr,['_id']);
                // this.tourList=arr;
                // var city = "";
                // city = this.$store.state.currentCity;
                return arr;
            }


        }
    }
</script>

<style scoped lang="less">

    .hot{
        /*height: 240px;*/
        padding: 15px 0;
        border-bottom: 1px solid #F2F3F2;
        overflow: hidden;
        .hot-left{
            float: left;
            width: 178px;
            height: 240px;
            margin-right: 25px;
            &>img{
                width: 100%;
                height: 100%;

            }
        }
        .hot-right{
            width: 485px;
            float: left;
            text-align: left;
            &>p{
                margin-bottom: 10px;
                line-height: 30px;
            }
            .hot-title{
                font-size: 30px;
                margin-bottom: 20px;
            }
            .hot-date{
                color: #9A9B9A;
            }
            .hot-place{
                span{
                    color: #9A9B9A;
                    margin-right: 10px;

                }
            }
            .hot-price{
                color: red;
                font-weight: 500;
                font-size: 30px;
                margin-top: 25px;
            }
        }

    }
</style>