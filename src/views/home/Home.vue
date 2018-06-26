<template>
  <div class="home">
    <!--<student-area></student-area>-->
      <!--<specialize-area></specialize-area>-->
    <!--<index-rest></index-rest>-->
    <!--<order-goods></order-goods>-->
    <add-address></add-address>
    <!--<test></test>-->
  </div>
</template>

<script>
// @ is an alias to /src
import StudentArea from "../../components/studentArea"
import SpecializeArea from "../../components/specializeArea"
import IndexRest from "../../components/indexRest/indexRest"
import AddAddress from "../../components/addAddress"
import Test from "../../components/test"

import OrderGoods from "../../components/orderGoods"
export default {
  name: 'home',
  components: {
      StudentArea,
      SpecializeArea,
      IndexRest,
      OrderGoods,
      AddAddress,
      Test


  }
}
</script>
<style lang="less" scoped>
    .home{
        height: 100%;
    }
</style>
