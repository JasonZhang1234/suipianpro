<template>
    <section>
    <div class="box_exclusiveList">
         <div class="van-doc-demo-block" v-for="(i,index) in list" :key="index" v-cloak>
             <div v-for="(e,l) in i.privs" :key="l">
                <h2 class="van-doc-demo-block__title">{{e.firstPrivName}}/{{e.fragName}}</h2>
                <van-cell-group v-for="(u,x) in e.privs" :key="x">
                    <van-cell>
                        <template slot="title">
                            <span class="custom-title" style="font-size:14px;">{{u.fragName}}</span>
                        </template>
                        <p @click="threeClassClick(u,index)" style="color:#1989fa;" v-if="u.person">{{u.person}}</p>    
                        <van-icon name="add" size="18" color="#1989fa" v-else @click="threeClassClick(u,index)"/>
                    </van-cell>
                </van-cell-group>
             </div>
        </div>
        <van-popup v-model="userKefuShow" :style="{ height: '100%',width:'100%'}" position="right" :z-index=200>
            <v-userKefu v-if="userKefuShow" :check="checkChildVal">

            </v-userKefu>
        </van-popup>
    </div>
    <div class="btn">
        <van-button type="primary" block color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="$router.go(-1)">返回</van-button>

    </div>
    </section>
</template>
<script>
import { getFragmentPersonalList,getFragmentDetail,getFragmentExclusiveList,getFragmentExclusiveHistory,postExclusiveConfirm } from "@/api/api"
import vUserKefu from "@/views/guanliqueyin/userkefu"
import Bus from '@/common/js/bus.js'; 
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
    export default {
        components:{
            vMaskpage,
            Modal,
            vUserKefu
        },
        data(){
            return {
                list:[],
                threeClassVal:[],
                userKefuShow:false,
                checkChildVal:""
            }
        },
        computed: {
        },
        created(){
            this.request()
            this.childView = false
        },
        mounted(){
            Bus.$on('chindFn', target => {  
                console.log(target);
                if(target){
                    //调用排班表历史信息
                    this.fragmentExclusiveHistory()
                }
                this.userKefuShow = false  
            });  
        },
        methods:{
            /**
             * 获取任务列表
             */
            request(){
                getFragmentExclusiveList(this.params).then(res =>{
                    console.log(res)
                    this.list = res.data.data
                    res.data.data.forEach(e => {
                        e.privs.forEach( i =>{
                            i.privs.forEach( u =>{
                                this.$set(u, 'person', "");
                                this.$set(u, 'personId', "");
                                this.threeClassVal.push(u)
                            })
                        })
                        
                    });
                    //调用历史人员信息
                    this.fragmentExclusiveHistory()
                    this.loading = false;
                    this.isLoading = false;

                }).catch(err =>{
                    console.log(err)
                })
            },
            fragmentExclusiveHistory(){
                //历史排表信息
                getFragmentExclusiveHistory(this.params).then(res =>{
                        console.log(res)
                        var map = new Map();
                        res.data.data.forEach(e => {
                            map.set(e.fragId, e);
                        });
                        this.threeClassVal.forEach(e=> {
                            if(map.get(e.fragId)){
                                e.person = map.get(e.fragId).userName
                                e.personId = map.get(e.fragId).userId
                            }
                        })
                }).catch(err =>{
                    console.log(err)
                })
            },
            /** 
             * 选择人员click
            */
            threeClassClick(item){
                this.checkChildVal = item
                this.userKefuShow = true
            },
            // parentFn(item){
            //     console.log('tag', item);
            //     debugger 
            //     if(item.name){
            //         //调用排班表历史信息
            //         this.fragmentExclusiveHistory()
            //         this.userKefuShow = false
            //     }
            //     this.userKefuShow = false
            // },
            /** 
             * 选择/返回
            */
            onClickButton(index,item){
                if(index){
                    var msg = 1
                    console.log('item', item.parents)
                    item.parents.status = true
                    this.shoppingCartListWatch.forEach(e => {
                        if(e.fragId == item.parents.fragId){
                            msg = 0
                        }
                    });
                    if(msg){
                        this.shoppingCartListWatch.push(item.parents)
                        this.newList = this.shoppingCartListWatch.filter((item)=>item.status)
                    }
                }
                this.show = false;
                console.log(this.shoppingCartList)
                //  var obj = {};
                //  arr = arr.reduce(function(item, next) {
                //    obj[next.key] ? '' : obj[next.key] = true && item.push(next);
                //    return item;
                // }, []);
            },
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            //控制打开购物车内部
            shoppingCartShow(){
                this.shoppingCart=true
                setTimeout(()=>{
                    this.$refs.checkboxGroup.toggleAll(true);

                },30)
            },
            //复选框事件
            checkboxClick(){
                console.log('点击事件')
                console.log('newList', this.newList)
                this.newList = this.newList.filter((item)=>item.status)
            },
            clearClick(){
                this.newList = []
                this.newList.forEach(e => {
                    e.status = false
                });
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
section{
    height: 100%;
}
.van-cell__title{
    flex:2;
}
.triangle-topright {
    width: 0;
    height: 0;
    float: right;
    font-size: xx-small;
    
    border-left: 45px solid transparent;
    position: relative;
}
.fragmentDetailList h2{
    padding: 10px 16px;

}
.van-popup--bottom{
    bottom:55px;
}
.btn{
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    padding:10px;
}
</style>

