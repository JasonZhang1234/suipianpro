<template>
    <section class="fragmentRemark">
        <h2>重要事项录入</h2>
        <van-field
            v-model="data"
            rows="15"
            show-word-limit
            maxlength=200
			maxHeight=500
            type="textarea"
            placeholder="记录当日处理完成的复杂工单、投诉等问题，200字以内"
        />
        <van-goods-action>
            <!-- <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
            <van-goods-action-icon icon="shop-o" text="店铺" info="12" /> -->
            <van-goods-action-button type="blue" text="返回" @click="onClickButton(0)" color="#F5F7F9" style="color:#000"/>
            <van-goods-action-button text="保存" @click="onClickButton(1)" color="#ff7b7b" />
        </van-goods-action>
    </section>
</template>
<script>
import { getDeploytList } from "@/api/api"
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
import Bus from '@/common/js/bus.js';  

    export default {
        props:["message"],
        components:{
            vMaskpage,
            Modal
        },
        data(){
            return {
                data:"",
                message:""
            }
        },
        created(){
        },
        mounted(){
            this.data = this.message
        },
        methods:{
            onClickButton(item){
                if(item){
                    Bus.$emit('remarkOkShow',this.data);
                    //调用提交事件
                    // this.http() 
                }else{
                    Bus.$emit('remarkCancelShow', 0); 
                }
            }
        },
    }
</script>
<style lang="less" scoped>
.fragmentRemark{
	background-color: #fafafa;
    h2{
        line-height: 240%;
        text-indent: 1em;
    }
    .van-field__value{
        padding:5px;
        border:1px red solid;
    }
	.van-goods-action{
		background-color: #fafafa;
	}
}
</style>

