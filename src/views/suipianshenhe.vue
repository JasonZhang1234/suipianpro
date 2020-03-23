<template>
    <section>
        <van-tabs @click="onTabClick">
            <van-tab title="待审批"></van-tab>
            <van-tab title="已审批"></van-tab>
        </van-tabs>
        <van-cell :title="选择日期" is-link center style="text-align:center;margin: 10px 0 0 0;" @click="showPicker = true"/>
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    <van-panel title="申请碎片包名称" desc="申请人" status="03:28">
        <!-- <div>申请碎片包名称</div> -->
        <div slot="footer" class="panel_footer">
            <van-button size="small">确定</van-button>
            <van-button size="small" type="danger">驳回</van-button>
        </div>
    </van-panel>
    <van-panel title="申请碎片包名称" desc="申请人" status="02:28">
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
                showPicker:false,
                value:"",
                minDate: new Date(),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date()
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
            onTabClick(name, title) {
                console.log(name,title)
            },
            onConfirm(time) {
                this.value = time;
                console.log(time.getTime())
                this.showPicker = false;
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
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`
                }
                return val;
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

