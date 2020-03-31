<template>
    <section>
       <h2 class="van-doc-demo-block__title">{{list.title}}</h2>
        <van-cell-group v-for="(u,l) in list.content" :key="l">
            <van-cell :value="u.userName+'（ '+ u.fragList.length +' ）'" center style="text-align:center;" :value-class="van_cell_center" is-link @click="onFragListClick(u)"/>
        </van-cell-group>
        <div class="btn">
            <van-button type="primary" block color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="$router.go(-1)">返回</van-button>
        </div>
        <van-popup v-model="fragListShow" :style="{ height: '100%',width:'100%',margin:'-1px 0 0 0'}" position="right" :z-index=200>
            <h2 class="van-doc-demo-block__title">未完成碎片列表</h2>
            <div class="frag_list_box">
                <van-cell-group v-for="(i,l) in fragListData" :key="l">
                    <van-cell :value="i.fragName" center style="text-align:center;"/>
                </van-cell-group>
            </div>
            <div class="btn">
                <van-button type="primary" block color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="fragListShow = false">返回</van-button>
            </div>
        </van-popup>
    </section>
</template>
<script>
import { getNoticeList,getNoticeDetail } from "@/api/api"
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
                fragListShow:false,
                fragListData:[],
                popupShow:false,
                value1: 0,
                value2: 'a',
                option1: [
                    { text: '日期选择', value: 0 },
                ],
                option2: [
                    { text: '全部', value: 'a' },
                    { text: '已读', value: 'b' },
                    { text: '未读', value: 'c' },
                ],
                params:{
                    "noticeId":this.$route.query.noticeId
                },

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
                getNoticeDetail(this.params).then(res =>{
                    if(!res.data.code){
                        console.log(res);
                        // console.log('content', JSON.parse(res.data.data.content))
                        var json = eval("(" + res.data.data.content + ")");
                        console.log(json)
                        res.data.data.content = json
                        this.list= res.data.data
                        console.log(this.list)
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
            onFragListClick(item){
                console.log(item)
                this.fragListShow =! this.fragListShow
                this.fragListData = item.fragList
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
.btn{
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    padding:10px;
}
.frag_list_box{
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
    bottom: 60px;
    overflow: auto;
}
</style>

