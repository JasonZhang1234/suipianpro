<template>
    <section>
        <van-tabs @click="onTabClick">
            <van-tab title="待审批"></van-tab>
            <van-tab title="已审批"></van-tab>
        </van-tabs>
        <!-- :min-date="minDate" -->
        <van-cell :title="valDate" is-link center style="text-align:center;margin: 10px 0 0 0;" @click="showPicker = true" v-show="paramsGet.auditStatus != '0'" icon="clear">
            <template #title>
                <span class="custom-title">{{valDate}}</span>
                <van-icon name="clear" size="20" color="#646566" @click.stop="clearDate" v-if="valDate!='日期选择'" style="line-height: inherit;" />
            </template>
            <div>
                哈
            </div>
        </van-cell>
        <!-- <van-cell :title="valDate" is-link style="text-align:center;margin: 10px 0 0 0;" @click="showPicker = true" v-show="paramsGet.auditStatus != '0'">
        
            <template #left-icon>
                <van-icon name="clear" size="20" color="#646566" @click.stop="clearDate" v-if="valDate!='日期选择'" style="line-height: inherit;"/>
            </template>
        </van-cell > -->
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    <van-panel v-for="(i,index) in list" :key="index" :title="i.packageName" :status="i.applyDate | isToday">
        <div class="audit_item">
            <div>申请人：{{i.userName}}</div>
            <div>编号：{{i.userId}}</div>
            <div v-show="paramsGet.auditStatus != '0'">审批时间：{{i.auditDate}}</div>
        </div>
        <div slot="footer" class="panel_footer">
            <van-button size="small" type="danger" v-if="i.auditStatus==0" @click="onOkClick(i)">通过</van-button>
            <van-button size="small" v-if="i.auditStatus==0" @click="onCancelClick(i)">驳回</van-button>
            <van-button plain type="primary" style="border:none;" size="small" v-if="i.auditStatus==1">已通过</van-button>
            <van-button plain type="primary" style="border:none;" size="small" v-if="i.auditStatus==2">已驳回</van-button>
        </div>
    </van-panel>
    </section>
</template>
<script>
import { postApprovalSave,getApprovalView } from "@/api/api"
import { formatDate } from "@/utils/filter.js"
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
    export default {
        components:{
            vMaskpage,
            Modal
        },
        data(){
            return {
                list:[],
                showPicker:false,
                valDate:"日期选择",
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
                paramsGet:{
                    "auditStatus":  "0",//字符串以 ","分隔//0-待审批 1-已通过 2-已驳回 可选项，不传查所有 已审批是1,2
                    "applyDate": "",//可选  不传查所有yyyy-mm-dd
                    "limit":"10", //条数
                    "page":"1"   //页数
                },
                paramsPost:{
                    "applyId":"", //申请编号
                    "auditStatus":""// 2-已通过 3-已驳回  
                }
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
                getApprovalView(this.paramsGet).then(res =>{
                    console.log(res);
                    if(res.data.data.length){
                        // 加载状态结束
                        this.list= res.data.data
                    }else{
                        this.finished = true; 
                    }
                    return 
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
             * 提交审批
            */
            http_approvalSave(){
                console.log('提交')
                postApprovalSave(this.paramsPost).then(res =>{
                    if(res.data.code){
                        console.log('成功+')
                    }
                    console.log(res);
                    this.loading = false;
                    this.isLoading = false;

                }).catch(err =>{
                    console.log(err)
                })
            },
            onTabClick(name, title) {
                console.log(name,title)
                if(name){
                    this.paramsGet.auditStatus = "1,2"
                }else{
                    this.paramsGet.auditStatus = "0"
                }
                this.paramsGet.page = 1
                
                this.request()

            },
            onConfirm(time) {
                this.valDate = formatDate(time);
                console.log(time.getTime())
                this.showPicker = false;
            },

            /** 
             * 清除日期
            */
            clearDate(){
                console.log("清除日期");
                this.valDate='日期选择'
                this.paramsGet.applyDate = "";
                //调用接口
                this.request()

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
                getApprovalSave
            },
            /** 
             * 确定按钮
            */
            onOkClick(item){
                this.$dialog.confirm({
                    title: '提交',
                    message: '确定通过?'
                }).then(() => {
                    console.log('确定')
                    // on confirm
                    this.paramsPost.applyId = item.applyId
                    this.paramsPost.auditStatus = "2"
                    this.http_approvalSave()
                }).catch(() => {
                    // on cancel
                });
            },
            /** 
             * 取消按钮
            */
            onCancelClick(item){
                this.$dialog.confirm({
                    title: '提交',
                    message: '确认驳回?'
                }).then(() => {
                    // on confirm
                    this.paramsPost.applyId = item.applyId
                    this.paramsPost.auditStatus = "3"
                    this.http_approvalSave()
                }).catch(() => {
                    // on cancel
                });
            }
        },
        filters:{
            isToday:(val)=>{
                var d = new Date(val.replace(/-/g,"/"));
                var todaysDate = new Date();
                if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
                    return val.toString().slice(10, 16)
                } else {
                    return val.toString().slice(0, 10)
                }
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
.audit_item{
    padding:0 0 0 15px;
    color:#aaa;
    border-top:2px solid #fff;
}
.van-cell:not(:last-child)::after{
    border-bottom:none;
}
.van-panel .van-cell{
    padding:15px 15px 1px 15px!important;
}
</style>

