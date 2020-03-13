<template>
<transition name="modal-fade" v-if="data">
    <div class="MaskPage" @click="close()">
        <section ref="main">
                <van-cell-group  >
                        <van-field
                            label="标题："
                            type="textarea"
                            rows="1"
                            autosize
                            :value="data.title"
                            disabled
                        />
                        <van-field
                            label="时间："
                            type="textarea"
                            rows="1"
                            autosize
                            :value="data.deployDate"
                            disabled
                        />
                        <van-field
                            label="分类："
                            type="textarea"
                            rows="1"
                            autosize
                            :value="data.deployType"
                            disabled
                        />
                        <van-field
                            label="发布机构："
                            type="textarea"
                            rows="1"
                            autosize
                            :value="data.deployDept"
                            disabled
                        />
                        <van-field
                            label="内容："
                            type="textarea"
                            rows="1"
                            autosize
                            :value="data.content"
                            disabled
                        />
                        <van-field
                            v-if="data.feedbackType != 1"
                            label="反馈内容："
                            type="textarea"
                            rows="1"
                            autosize
                            disabled
                        />
                </van-cell-group>
        </section>
    </div>
    </transition>

</template>
<script>
    import { getDeploytInfo,getFeedbcakInfo } from "../api/api"
    export default {
        props:[
            'childData'
        ],
        data(){
            return {
                closemodal:false,
                data:{
                    "content":"网点反馈支行阅知",
                    "deployDept":"北京分行-信息科技部-运行部",
                    "title":"网点反馈支行阅知",
                    "deployDate":"2018-12-05 11:15:04",
                    "conductDept":"全部网点",
                    "deployType":"一级菜单-二级菜单-双渠道反馈"
                }
            }
        },
        created() {
            this.request()

        },
        mounted(){
            console.log(this.childData)

        },
        methods:{
            /**
             * 获取反馈信息
             */
            request(){
                console.log(this.childData)
                let http = this.childData.msg?getFeedbcakInfo:getDeploytInfo;
                http().then();
            },
            /**
             * 关闭模态框
             */
            close(){      
                // this.$emit('close','fdsfds')
                
                // this.visible = false
                // debugger;
                document.addEventListener('click', this.hidePanel, false)
       
            },
            hidePanel (e) {
                // console.log(this.$refs.main)
                if (!this.$refs.main.contains(e.target)) {
                    // this.hide()
                    this.$emit('close',false)
                    document.removeEventListener('click', this.hidePanel, false)

                }
            }

        },
        watch: {  
        　　childDdata: {  
        　　　　handler(newValue, oldValue) {  
        　　　　　　console.log(newValue, oldValue)
        　　　　},  
        　　　　deep: true  
        　　}  
        },
        // beforeDestroy () {
            
        //     this.$emit('close',false)
            
        // },
        //销毁前
        beforeDestroy(){
            this.data = '';
            this.$emit('close',false)

        },
        //销毁后
        destroyed(){
            this.data = '';
            this.$emit('close',false)

        }
    }
</script>   
<style lang="less" scoped>
    .MaskPage{
        position:fixed;
        left:0;
        right: 0;
        top: 0;
        bottom:0;
        background-color:rgba(0, 0, 0, .5);
        section{
            width: 100%;
            height:80%;
            background-color:#fff;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 15px;
        }
    }
    /* 动画 */
.modal-fade-enter,.modal-fade-leave-active{
    opacity: 0;
}
.modal-fade-enter-active, .modal-fade-leave-active{
    transition: opacity 0.5s ease;
}
</style>