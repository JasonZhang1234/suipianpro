<template>
    <section>
    <!-- 碎片领用 -->
        <div>
             <div class="van-doc-demo-block">
                <h2 class="van-doc-demo-block__title"> 临时碎片申请</h2>
                <van-checkbox-group v-model="result" max=2>
                    <van-cell-group>
                        <van-cell
                        v-for="(item, index) in list"
                        clickable
                        :key="item"
                        :title="`${item.packageName}`"
                        @click="toggle(index)"
                        >
                        <van-checkbox slot="right-icon" :name="item" ref="checkboxes" />
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>
             <van-field
                required
                disabled
                placeholder="最多选择两个岗位碎片包"
            />
            <!-- 提交 -->
            <div  class="div_btn">
                <van-button color="#b72435" block @click="saveClick()" :disabled="btnDisabled">提交</van-button>

            </div>
        </div>
    </section>
</template>
<script>
import { getFragmentTempView,getFragmentTempApply,getFragmentTempCheck } from "@/api/api"
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
                list: [],//多选框数据
                result: [], //多选框数据
                radio: true, //单选框
                btnDisabled:true//可以提交申请 不能提交申请
            }
        },
        created(){
            this.childView = false
            this.request()
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
                getFragmentTempView(this.params).then(res =>{
                    if(res.data.code == 0){
                        this.list = res.data.data
                    }
                    this.loading = false;
                    this.isLoading = false;
                }).catch(err =>{
                    console.log(err)
                })
                //临时碎片包申请权限查看
                getFragmentTempCheck().then(res =>{
                    if(res.data.code == 0){
                        if(res.data.data){
                            this.btnDisabled = false
                        }
                    }
                }).catch(err =>{
                    console.log(err)
                })
            },
            /** 
             * 提交按钮
            */
            saveClick(){
                //提交选中的碎片包
                console.log('tag', this.result)
                getFragmentTempApply({"packageIds":  this.result[0].packageId+','+this.result[1].packageId}).then(res =>{
                    if(res.data.code == 0){
                        this.$dialog.alert({
                            title: '提示',
                            message: '提交成功'
                        }).then(() => {
                            console.log('提交成功')
                            //需要做返回
                            this.$router.go(-1)
                        });
                    }
                    console.log('res', res.data.data)
                }).catch(err =>{
                    console.log(err)
                })
            },
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

