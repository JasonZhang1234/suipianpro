<template>
    <section class="box_roster">
        <div class="van-doc-demo-block" v-for="(i,index) in list" :key="index">
            <h2 class="van-doc-demo-block__title">{{i.posName}}</h2>
            <van-cell-group v-for="(u,l) in i.userList" :key="l">
                <van-cell :value="u.userName" center style="text-align:center;" :value-class="van_cell_center"/>
            </van-cell-group>
        </div>
        <van-goods-action>
            <van-goods-action-button type="warning" text="添加" @click="onClickButton" disabled/>
            <van-goods-action-button type="danger" text="确认" @click="onClickButton" />
        </van-goods-action>
    </section>
</template>
<script>
import { getRosterList } from "@/api/api"
    export default {
        components:{
        },
        data(){
            return {
                params:{

                },
                list:[]
            }

        },
        created(){
            this.childView = false
            this.request()
        },
        mounted(){

        },
        methods:{
            /**
             * 获取任务列表
             */
            request(){
                getRosterList(this.params).then(res =>{
                    this.list = res.data.data
                    console.log(res);
                    this.loading = false;
                    this.isLoading = false;

                }).catch(err =>{
                    console.log(err)
                })
            },
            /** 
             * 添加/提交
            */
            onClickButton(){

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
.box_roster{
    padding: 0 0 80px 0;
}
</style>

