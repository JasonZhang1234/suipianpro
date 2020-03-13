<template>
    <section class="nav" v-if="taskName">
        <h4 class="navTask">任务名称:{{taskName}}</h4>
        <h4>上级单位:{{backBranch}}</h4>
        <!-- <input type="number" @keydown="handleInput1"  @keyup="handleInput1" @input="handleInput1" placeholder="请输入" v-model="SaleQty">
        <van-field 
        type="number" 
        label="啊哈哈"
        @keydown="headInput(value)"  
        @keyup="headInput(value)" 
        @input="headInput(value)" 
        @change="headInput(value)" 
        placeholder="请输入" 
        v-model="SaleQty" />
        {{SaleQty}} -->
    </section>
     
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            SaleQty:''
        }
    },
    computed: {
        ...mapGetters([
            'name',
            'taskName',
            'backBranch'
        ])
    },
    methods:{
        //点击返回
        onClickLeft() {
            this.$toast('返回');
            this.$router.go(-1);
        },
        //点击按钮
        onClickRight() {
            localStorage.clear();
            // console.log(this)
            // this.name = "";
            this.$store.commit('SET_NAME',[])
            
            this.$toast('清除记录成功');
        },
        handleInput1(e) {
            // log(e.target.value)
            // e.target.value=e.target.value.replace(/[^\d]/g,'');
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || ""
            // this.SaleQty = e.target.value 
            // if(this.SaleQty.length >=4)this.SaleQty =String(this.SaleQty).slice(0,4)
            console.log(this.SaleQty)

        },
        headInput(e){
            e.target.value = e.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符  
            e.target.value = e.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是  
            e.target.value= e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
            e.target.value= e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            e.target.value= e.target.value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'); //只能输入6个小数  
        }
    }
}
</script>
<style lang="less" >
// .van-ellipsis .van-nav-bar__title{
//     font-size: 2em!important;
// }
// .van-nav-bar__title{
//     font-size: 1.2em;
// }
.nav{
    background-color: gainsboro;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;

    text-align: center;
    padding: 15px;
    font-size: 16px;
}
.navTask{
    color: firebrick;
}
</style>



