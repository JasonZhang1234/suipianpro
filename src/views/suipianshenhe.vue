<template>
    <section>
    碎片审核
    <van-panel title="申请碎片包名称" desc="申请时间" status="状态">
        <!-- <div>申请碎片包名称</div> -->
        <div slot="footer" class="panel_footer">
            <van-button size="small">确定</van-button>
            <van-button size="small" type="danger">驳回</van-button>
        </div>
    </van-panel>
    <van-panel title="申请碎片包名称" desc="申请时间" status="状态">
        <!-- <div>申请碎片包名称</div> -->
        <div slot="footer" class="panel_footer">
            <van-button size="small">确定</van-button>
            <van-button size="small" type="danger">驳回</van-button>
        </div>
    </van-panel>
    </section>
</template>
<script>
import { getDeploytList } from "../api/api"
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
    export default {
        components:{
            vMaskpage,
            Modal
        },
        data(){
            return {
            }

        },
        created(){
            this.childView = false

        },
        mounted(){

        },
        methods:{
            /**
             * 获取任务列表
             */
            request(){
                getDeploytList(this.params).then(res =>{
                    console.log(res);

                    if(res.data.rows.length){
                        // 加载状态结束
                        this.list= res.data.rows
                    }else{
                        this.finished = true; 
                    }
                    if(res.data.total/10 < 1){
                        this.finished = true; 
                    }
                    this.loading = false;
                    this.isLoading = false;

                }).catch(err =>{
                    console.log(err)
                })
            },
            /**
             * 下拉刷新
             */
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.params.page = 1;
                    this.request();
                }, 500);
            },
            /**
             * 上拉加载
             */
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    this.params.page++
                    this.request();
                }, 500);
            },
            childLink(deployId){
                this.childData = {
                    "deployId":deployId,
                    "msg":0
                };
                this.childView = true;

            },
            /**
             * 关闭按钮
             */
            close(data){
                console.log(data)
                this.childView = false;
            },
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
.van-cell-group{
    margin: 10px 0 0 0;

}
.panel_footer{
    display:flex;
    flex-direction: row-reverse;
    >button{
        margin: 0 5px;
    }
}
</style>

