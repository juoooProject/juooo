<template>
    <div class="showList">
        <ul>
            <li v-for="(item,index) in listArr" :key="index" class="singleList" @click="goToTicket(item)">
                <div class="avatar">
                    <img :src="item.other.imgUrl" alt="" width="89" height="119">
                </div>
                <div class="detail-box">
                    <div class="title">{{item.other.title}}-{{item.site.city}}站</div>
                    <p class="time">{{item.site.date}} {{item.site.time}}</p>
                    <div class="position">[{{item.site.city}}] {{item.site.place}}</div>
                    <div class="price-period">¥{{item.site.price[0]}}-{{item.site.price[item.priceLen-1]}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
        name: 'Performance',
        data(){
            return{
                listArr:[],
                sortType:0,
                allList:[],
                id:0
            }
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                this.$store.commit('changeType',this.$route.query.id);
                this.$http.get("/api/performances").then(({data})=>{
                    if(data.status){
                        var arr = [];
                        arr = this.sortList(data.allList);
                        if(this.$route.query.id==-1){
                            this.listArr=arr;
                        }else {
                            this.listArr=arr.filter((value,index)=> {
                                return value.other.performType==this.$route.query.id;
                            })
                        }
                    }
                    if(this.$route.query.sort == 1){
                        var now = new Date();
                        var nowTime = now.getTime();
                        this.listArr=this.listArr.filter(function (value,index) {
                            return value.realTime>=nowTime;
                        })
                    }

                }).catch((err)=>{
                    console.error(err);
                });
            }
        },
        methods:{

        },
        created(){
            this.$store.commit('changeType',this.$route.query.id);
            this.$http.get("/api/performances").then(({data})=> {
                if (data.status) {
                    if (this.$route.query.id == -1) {
                        var arr = [];
                        arr = data.allList;
                        this.listArr = this.sortList(arr);
                    }else {
                        // this.listArr = data.allList;
                        var arr = [];
                        arr = this.sortList(data.allList);
                        this.listArr=arr.filter((value,index)=> {
                            return value.other.performType==this.$route.query.id;
                        })
                        console.log(this.listArr)
                         var arr2 = [];
                         if(this.$route.query.key!=undefined){
                            this.listArr.forEach((value, index)=> {
                                value.other.keyWords.forEach((key,i)=> {
                                    if(key.indexOf(this.$route.query.key)>=0){
                                        arr2.push(value);
                                    }
                                })
                            })
                            this.listArr = arr2;
                        }
                    }

                }
            });

        },
        mounted(){
            this.$nextTick(()=>{
                // let listWrap = this.$refs.listWrap;
                // this.listScroll = new BScroll(listWrap,{
                //     click:true
                // })
            })
        },
        computed:{
            data(){
                return this.$route.query.id;
            }

        },
        methods:{
            sortList(list){
                var arr = [];
                var k = 1;
                list.forEach((item,i)=>{
                    item.siteAll.forEach((value,index)=>{
                        let o = {};
                        o.site = value;
                        o.other = item;
                        o.id=k++;
                        arr.push(o)
                    })
                })
                arr.forEach((value,index)=>{
                    var str1 = value.site.date;
                    var str2 = value.site.time;
                    var str = str1+" "+str2;
                    var date =  new Date(str);
                    var time = date.getTime();
                    value.realTime=time;
                    value.priceLen=value.site.price.length;
                })
                function compare(property){
                    return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
                }
                return arr.sort(compare('realTime'))
            },
            goToTicket(item){
                 // this.$store.commit('getTicket',item);
                 this.$router.push({
                     path:"/ticket",
                     query:{
                         id:item.id
                     }
                 })
            }
        }
    }
</script>

<style lang="less" scoped>
    .showList{
        position: relative;
        width: 100%;
        padding: 0 30px;
        ul{
            .singleList{
                display: flex;
                padding: 15px 0;
                border-bottom: 1px solid #e6e6e6;
               .avatar{
                   flex: 0 0 89px;
                   width: 178px;
                   height: 238px;
                   img{
                       display: block;
                   }
               }
                .detail-box{
                    flex: 1;
                    padding-left: 30px;
                    .title{
                        line-height: 36px;
                        font-size: 28px;
                        width: 100%;
                        max-height: 72px;
                        min-height: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: black;
                        margin-bottom: 25px;
                        text-align: left;
                    }
                    .time{
                         text-align: left;
                         color: dimgrey;
                         font-size: 10px;
                         height: 35px;
                         line-height: 35px;
                     }
                    .position{
                        text-align: left;
                        color: dimgrey;
                        font-size: 10px;
                        height: 35px;
                        line-height: 35px;
                    }
                    .price-period{
                        color: #ff7919;
                        font-size: 30px;
                        height: 35px;
                        line-height: 35px;
                        text-align: left;
                        font-weight: bold;
                        margin-top: 25px;
                    }
                }
            }
        }

    }
</style>