<template>
    <section>
        <van-grid clickable :column-num="2">
			<van-grid-item text="排班表" to="/queren">
				<template #icon> 
				    <i class="iconfont icon-roster" style="font-size: xx-large;color: #646566;"></i>
				</template>
			</van-grid-item>
			<van-grid-item  text="自选碎片分发" to="/fenfa">
				<template #icon> 
				    <i class="iconfont icon-zxFragAssign" style="font-size: xx-large;color: #646566;"></i>
				</template>
			</van-grid-item>
        </van-grid>
    </section>
</template>
<script>
import { getDeploytList } from "@/api/api"
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

</style>

