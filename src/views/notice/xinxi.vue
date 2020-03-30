<template>
    <section>
        <van-dropdown-menu>
            <van-dropdown-item/>
            <div class="s_date" @click="showPickerClick()" >
                <span>{{valDate}}</span>
            </div>
            <van-dropdown-item v-model="value2" :options="option2" @change="onDropdownChange"/>
        </van-dropdown-menu>
        <van-panel v-for="(i,index) in list" :title="i.title" :desc="i.senderName" :status="i.noticeDate | isToday" :key="index" @click="onToDetailsClick(i)">

        </van-panel>
        <div>
            <van-popup
                v-model="popupShow"
                position="top"
                :style="{'height':'30%','top':'40px'}"
                />
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    </section>
</template>
<script>
import { getNoticeList,getNoticeDetail } from "@/api/api"
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
                valDate:"日期选择",
                showPicker:false,
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
                popupShow:false,
                value1: 0,
                value2: '',
                option2: [
                    { text: '全部', value: '' },
                    { text: '已读', value: '1' },
                    { text: '未读', value: '0' },
                ],
                params:{
                    "noticeDate":"", //可选 yyyy-mm-dd 不传查所有
                    "isRead":"", //可选 0-未读 1-已读 不传查所有
                    "type":"", //可选 0-普通 1-未完成碎片通报 2-备注事件通报 不传查所有
                    "limit":"10",//查多少条
                    "page":"1",//页数 从1
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
                getNoticeList(this.params).then(res =>{
                    if(!res.data.code){
                        console.log(res);
                        this.list= res.data.data
                    }
                    return 
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
            onTabClick(val){
                if(val){
                    this.popupShow =! this.popupShow
                }
            },
            /** 
             * 跳转详情click
            */
            onToDetailsClick(item){
                if(Number(item.type)){
                    this.$router.push({path:'/noticeDetails', query:{noticeId:item.noticeId}})
                }else{
                    this.$router.push({path:'/noticeDetailsRemark', query:{noticeId:item.noticeId,senderName:item.senderName}})
                }
            },
            /** 
             * 选择时间
            */
            onConfirm(time) {
                this.valDate = formatDate(time);
                this.params.noticeDate = formatDate(time);
                console.log(time.getTime())
                this.showPicker = false;
                //调用接口
                this.request()
            },
            showPickerClick(){
                console.log(222)
                this.showPicker = true
            },
            //下拉菜单change事件
            onDropdownChange(value){
                console.log(value)
                this.params.isRead = value
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
.van-tab--active{
    color:#333;
    font-weight: 300;
}
.s_date{
    width:168px;
    height:42.66px;
    position:absolute;
    background: #fff;
    z-index: 2050;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    min-width: 0;
    cursor: pointer;
    span{
        position:absolute;

        left:70px;
        top:14px;
        font-size:0.4rem;
    }
}
.van-dropdown-menu{
    // flex-direction: row-reverse;
}
.van-panel__header-value{
    color:#333;
}
</style>

