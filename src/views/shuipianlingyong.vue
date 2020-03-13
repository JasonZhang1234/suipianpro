<template>
    <section>
    <!-- 碎片领用 -->
        <div>
            <div class="van-doc-demo-block">
                <h2 class="van-doc-demo-block__title"> 通用碎片包</h2>
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="单选框 1" clickable @click="radio = '1'">
                        <van-radio slot="right-icon" name="1" />
                        </van-cell>
                        <van-cell title="单选框 2" clickable @click="radio = '2'">
                        <van-radio slot="right-icon" name="2" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
             <div class="van-doc-demo-block">
                <h2 class="van-doc-demo-block__title"> 岗位碎片包</h2>
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell
                        v-for="(item, index) in list"
                        clickable
                        :key="item"
                        :title="`复选框 ${item}`"
                        @click="toggle(index)"
                        >
                        <van-checkbox slot="right-icon" :name="item" ref="checkboxes" />
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>
            <!-- 提交 -->
            <div  class="div_btn">
                <van-button color="#b72435" block>提交</van-button>

            </div>
        </div>
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
                checked: true,
                list: ['a', 'b'],//多选框数据
                result: [], //多选框数据
                radio: true //单选框
            }
        },
        created(){
            this.childView = false

        },
        mounted(){

        },
        methods:{
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
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
.div_btn{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    padding:0 15px 15px 15px;

}
</style>

