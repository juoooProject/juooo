<template>
    <div class="address-wrapper">
        <div class="student-banner">
            <span class="icon icon-arrow_lift"></span>
            <span>确认订单</span>
            <div></div>
        </div>

        <iframe id="iframe" src="http://www.17sucai.com/preview/869565/2017-11-08/CityPicker/example/cityPicker.html" frameborder="0"  width="100%"></iframe>






    </div>
</template>

<script>

    export default {
        name: "add-address",

    }
</script>

<style scoped lang="less">
    @import "../css/style.css";

    .address-wrapper{
        height: 100%;
    }
    .student-banner{
        position: fixed;
        background: #FCFDFC;
        top: 0;
        left: 0;
        z-index: 555;
        width: 100%;
        height: 87px;
        display: flex;
        border-bottom: 1px solid #F1F2F1;
        justify-content: space-between;
        align-items: center;
        .icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 0.36rem;
        }
        span:nth-child(2){
            font-weight: 700;
            font-size: 0.48rem;

        }


    }
    #iframe{
        margin-top: 18px;
        height: 100%;
        /*.content-block.button.button-fill{*/
            /*background: red;*/
        /*}*/
    }


   
</style>