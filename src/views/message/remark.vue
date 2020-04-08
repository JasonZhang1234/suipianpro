<template>
    <section class="fragmentRemark">
        <h2 style="padding-top:10px;">重要事项上报</h2>
        <div class="tempName">
            <p><span>发件人</span>：{{$route.query.senderName}}</p>
            <p><span>时间</span>：{{list.noticeDate}}</p>
        </div>
        <van-field
            v-model="list.content"
            rows="15"
            show-word-limit
            type="textarea"
            style=""
        />
        <div class="btn">
            <van-button type="primary" block color="#ff7b7b" @click="$router.go(-1)">返回</van-button>
        </div>
    </section>
</template>
<script>
import { getNoticeDetail } from "@/api/api"
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
import Bus from '@/common/js/bus.js';  

    export default {
        components:{
            vMaskpage,
            Modal
        },
        data(){
            return {
                list:"",
                message:"",
                params:{
                    "noticeId":this.$route.query.noticeId
                }
            }
        },
        created(){
            this.request()
        },
        mounted(){
            console.log(this.message)
        },
        methods:{
            /**
             * 获取详情
             */
            request(){
                getNoticeDetail(this.params).then(res =>{
                    if(!res.data.code){
                        this.list= res.data.data
                        console.log(this.list)
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: res.data.msg
                        }).then(() => {
                            return
                        });
                    }
                    this.loading = false;
                    this.isLoading = false;
                }).catch(err =>{
                    console.log(err)
                })
            },
        },
    }
</script>
<style lang="less" scoped>
.fragmentRemark{
	
    h2{
        line-height: 240%;
        text-indent: 1em;
    }
    .van-field__value{
        padding:5px;
        border:1px red solid;
    }
    .van-goods-action{
        background-color: #fff0;
    }
}
.tempName{
    padding:0 0 5px 20px;
    p{
        span{
            display: inline-block;
            width:3em;
            text-align-last: justify;
            color: #333;
        }
    }
}
.btn{
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    padding:10px;
}
</style>

