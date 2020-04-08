<template>
    <section>
        <van-tabs @click="onTabClick">
            <van-tab title="待审批"></van-tab>
            <van-tab title="已审批"></van-tab>
        </van-tabs>
        <!-- :min-date="minDate" -->
        <van-cell class="van_cell" center :style="valDate=='日期选择'?'text-align:center':'text-align:right'" @click="showPicker = true" v-show="paramsGet.auditStatus != '0'">
            <template #title :style="valDate=='日期选择'?'text-align:center':'text-align:right'">
                <span class="custom-title">{{valDate}}</span>
            </template>
            <div style="line-height: inherit;text-align: center;" v-if="valDate!='日期选择'">
                <van-icon name="clear" size="16" color="#646566" @click.stop="clearDate" v-if="valDate!='日期选择'" style="line-height: inherit;" />
            </div>
        </van-cell>
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
        <div class="shenhe_list_box" :style="paramsGet.auditStatus==0?'top:40px':'top:90px'">
            <van-list
                v-model="loading"
                :finished="finished"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <van-panel v-for="(i,index) in list" :key="index" :title="i.packageName" :status="i.applyDate | isToday" style="margin: 10px 0 0 0;">
                    <div class="audit_item">
                        <div>申请人：{{i.userName}}</div>
                        <div>编号：{{i.userId}}</div>
                        <div v-show="paramsGet.auditStatus != '0'">审批时间：{{i.auditDate}}</div>
                    </div>
                    <div slot="footer" class="panel_footer ">
                        <van-button size="small" type="danger" v-if="i.auditStatus==0" @click="onOkClick(i)" color="#ff7b7b">通过</van-button>
                        <van-button size="small" v-if="i.auditStatus==0" @click="onCancelClick(i)">驳回</van-button>
                        <van-button plain type="danger" style="border:none;" size="small" v-if="i.auditStatus==1" color="#ff7b7b">已通过</van-button>
                        <van-button plain type="danger" style="border:none;" size="small" v-if="i.auditStatus==2" color="#ff7b7b">已驳回</van-button>
                    </div>
                </van-panel>
            </van-list>
        </div>
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
                error: false,
                loading: false,
                finished: false,
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
                    "auditStatus":""// 1-已通过 2-已驳回  
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
            request(item){
               
                getApprovalView(this.paramsGet).then(res =>{
                    if(!res.data.code){
                        console.log(res);
                        for (let index = 0; index < res.data.data.length; index++) {
                            const e = res.data.data[index];
                            console.log(e)
                            this.list.push(e)
                        }
						this.loading = false;
						if(res.data.data.length<10){
						    this.finished = true; 
						}
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: res.data.msg
                        }).then(() => {});
                    }
                    
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
                    if(!res.data.code){
						this.$dialog.alert({
						    title: '提示',
						    message: '提交成功'
						}).then(() => {this.$router.go(0)});
                        
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: res.data.msg
                        }).then(() => {});
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
                //清空list
                this.list = []
                this.request()
            },
            onConfirm(time) {
                this.valDate = formatDate(time);
                this.paramsGet.applyDate = formatDate(time);
                console.log(time.getTime())
                this.showPicker = false;
                this.paramsGet.page = 1;
                this.list = []
                //调用接口
                this.request()
            },

            /** 
             * 清除日期
            */
            clearDate(){
                console.log("清除日期");
                this.valDate='日期选择'
                this.paramsGet.applyDate = "";
                this.paramsGet.page = "1";
                this.list = [];
                //调用接口
                this.request()

            },
            /**
             * 上拉加载
             */
            onLoad() {
                // 异步更新数据
                this.loading = true;
                setTimeout(() => {
                    this.paramsGet.page++
                    this.request();
                }, 500);
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
                    this.paramsPost.auditStatus = "1"
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
                    this.paramsPost.auditStatus = "2"
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
.van-cell-group, .van-hairline--top-bottom, .van-panel{
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

	
.van_cell{
	padding:5px;
	height:40px;
}
.van-cell__title{
    min-width:60%;
}
.van-panel__header-value{
    color:#333;
}
.shenhe_list_box{
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
    overflow: auto;
}
.shenhe_list_box .van-cell-group{
	margin: 10px 0 0 0;
}
	
.van-panel_footer{
	border-top:none;
}
.van-hairline--top::after{
	border:none;
}
.van-panel__header-value{
	font-size:12px;

}
</style>

