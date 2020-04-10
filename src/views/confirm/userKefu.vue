<template>
    <section class="box_userKefu">
        <van-search v-model="value" placeholder="请输入姓名" @input="onSearchInput()"/>
         <div class="van-doc-demo-block">
            <van-radio-group v-model="radio">
                <!-- 暂不分配 -->
                <van-cell title="暂不分配" clickable @click="radio = '0'" style="margin:0 0 10px 0;">
                    <van-radio slot="right-icon" name="0" />
                </van-cell>
                <van-cell-group v-for="(i,index) in fSearch" :key="index">
                    <van-cell :title="i.name" clickable @click="radio = i.personId">
                        <van-radio slot="right-icon" :name="i.personId" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <van-goods-action>
            <van-goods-action-button type="warning" text="返回" @click="onClickButton(0)" color="#F5F7F9" style="color:#000"/>
            <van-goods-action-button type="danger" text="确认" @click="onClickButton(1)"  color="#ff7b7b"/>
        </van-goods-action>
    </section>
</template>
<script>
import { getUserKefuList,postExclusiveConfirm } from "@/api/api"
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
import Bus from '@/common/js/bus.js';  
    export default {
        props:['check'],
        components:{
            vMaskpage,
            Modal
        },
        data(){
            return {
                list:[],
                userList:[],
                value:"",
                radio:"",
                params:{
                    "fragId":"",       
                    "personId": "",
                }
            }
        },
        computed : {  //设置计算属性
            fSearch(){
                if(this.value){
                    return this.list.filter((item)=>{  //过滤数组元素
                        return item.name.includes(this.value); //如果包含字符返回true
                    });
                }else{
                    return this.list
                }
            }
        },
        created(){
            this.childView = false
            this.request()  
        },
        mounted(){
            console.log(this.check)
            this.params.fragId = this.check.fragId
            if(this.check.personId){
                this.radio = this.check.personId
            }else{
                this.radio = "0"
            }
        },
        methods:{
            /**
             * 获取客服列表
             */
            request(){
                getUserKefuList(this.params).then(res =>{
                    this.list = res.data.data
                    this.fSearch = res.data.data
                    console.log(res);
                    this.loading = false;
                    this.isLoading = false;

                }).catch(err =>{
                    console.log(err)
                })
            },
            /** 
             * 提交事件
            */
            onClickButton(item){
                console.log(this.radio);
                if(item){
                    // Bus.$emit('chindFn', this.radio);
                    //调用提交事件
                    if(this.radio){
                        this.params.personId = this.radio
                        this.exclusiveConfirm() 
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: '请选择人员!'
                        }).then(() => {});
                    }
                }else{
                    Bus.$emit('chindFn', 0); 
                }
               
            },
            exclusiveConfirm(){
                postExclusiveConfirm(this.params).then(res =>{
                    if(!res.data.code){
                        this.$dialog.alert({
                            title: '提示',
                            message: '提交成功'
                        }).then(() => {
                            console.log('提交成功')
                            //关闭遮罩层
                            Bus.$emit('chindFn', this.radio); 
                        });
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: res.data.msg
                        }).then(() => {
                            console.log('提交失败')
                        });
                    }
                    console.log(res);
                    this.loading = false;
                    this.isLoading = false;
                }).catch(err =>{
                    console.log(err)
                })
            },
            onSearchInput(){
            //     this.list = this.list.filter((item)=>{  //过滤数组元素
            //         return item.name.includes(this.value); //如果包含字符返回true
            //     });
            }
        },
        
        //keepalive 生命周期
        activated(){
            this.childView = false;
        },
        beforeDestroy(){
            this.childView = false;
        },
        //销毁前
        beforeDestroy(){
            // alert(1)
        },
        //销毁后
        destroyed(){
            // alert(2)
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            //to.meta.keepAlive = false;  // B 跳转到 A 时，让 A 缓存，即不刷新
            next();
        }
    }
</script>
<style lang="less" scoped>
.van-cell__value--alone{
    text-align: center!important;
}
.van_cell_center{
    text-align: center;
}
.box_userKefu  {
    // padding: 0 0 80px 0;
    background: #fafafa;
    .van-doc-demo-block{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 60px;
        overflow: auto;
        top: 45px;
    }
}
</style>

