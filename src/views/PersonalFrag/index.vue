<template>
    <section>
    <div class="box_tree">
        <!-- {{newList}} -->
        <div class="tree">
            <li @click="oneClassClick(i,index)" v-for="(i,index) in oneClassVal" :key="index" v-if="i.fragName" :class="oneClassStyl==index?' van-sidebar-item--select van-tree-select__nav-item font_weight':''">
                <p>{{i.fragName}}</p>
            </li>
        </div>
        <div class="tree" >
            <li @click="twoClassClick(i,index)" v-for="(i,index) in twoClassVal" :key="index" v-if="i.fragName" :class="twoClassStyl==index?' van-sidebar-item--select van-tree-select__nav-item font_weight':''">
                <p>{{i.fragName}}</p>
            </li>
        </div>
        <div class="tree">
            <li  v-for="(i,index) in threeClassVal" :key="index" :class="threeClassStyl==index?' van-sidebar-item--select van-tree-select__nav-item font_weight':'font_weight'">
                <p @click="threeClassClick(i,index)">{{i.fragName}}</p>
                <div class="triangle-topright" style="border-top: 1.2rem solid #ff7b7b;" v-if="i.isFinish=='0'&&i.isOpen=='2'">
                    <div class="word">未完成</div>
                </div>
                <div class="triangle-topright" style="border-top: 1.2rem solid #3399ff;" v-else-if="i.isOpen=='1'&&i.isFinish=='1'||i.isOpen=='2'&&i.isFinish=='1'">
                    <div class="word">已完成</div>
                </div>
                <div class="triangle-topright" style="border-top: 1.2rem solid #79888f;" v-else-if="i.isOpen=='0'">
                    <div class="word">未开放</div>
                </div>
                <van-checkbox v-model="i.status" @click="checkboxClick()" :disabled="!i.status" shape="square" v-else-if="i.status"></van-checkbox>
                <!-- <span class="checkFiexd"></span>i.isOpen=='1'&&i.isFinish=='0' -->
                <!-- //isOpen是否开放 0-未开放 1-开放 2-已过期
                    //"isFinish"是否已完成 0-未完成 1-完成  -->
            </li>
        </div>
    </div>
    <div class="shop-cart-wrapper">
        <div class="shop-cart-wrapper-bar">
            <div class="logo-wrapper" >
                <div class="logo" @click="shoppingCartShow">
					<i class="iconfont icon-cart"  >
                        <div class="van-info newlist_length" v-if="newList.length" >{{this.newList.filter((item)=>item.status).length}}</div>
					</i>
                    <!-- <van-icon name="shopping-cart" size="30" color="#999" @click="shoppingCartShow">
                    </van-icon> -->
                </div>
            </div>
            <van-button color="#ff7b7b" class="shop-cart-wrapper-btn" @click="saveClick()" style="width:50%">提交</van-button>
        </div>
    </div>
   <van-popup
        v-model="show"
        position="left"
        closeable
        :style="{ height: '100%' }"
        :z-index="100"
        >
        <div v-for="(i,index) in fragmentDetailList" :key="index" class="fragmentDetailList">
            <h2>{{i.fragName}}</h2>
            <van-panel title="履职标准：" :desc="i.duty" />
            <van-panel title="十字诀：" :desc="i.tip" />
            <van-panel title="主管：" :desc="i.supervisor" />
            <van-panel title="完成时间：" :desc="i.showTimeName" />
            <van-panel title="碎片性质：" :desc="i.typeName" />
            <van-goods-action>
                <van-goods-action-button type="warning" text="返回" @click="onClickButton(0,i)"  color="#F5F7F9" style="color:#000"/>
                <van-goods-action-button type="danger" text="选择" @click="onClickButton(1,i)" v-if="!i.parents.status&&i.status" color="#ff7b7b"/>
            </van-goods-action>
        </div>
    </van-popup>
    <!-- 购物车内部 -->
    <van-popup v-model="shoppingCart" :style="{ maxHeight: '50%',width:'100%'}" position="bottom" :z-index=90>
        <div class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title" style="background:#ebedf0;">碎片包 <span style="color:#3399ff;float:right;margin-right:5px;" @click="clearClick()"> 清空 </span> <span style="color:#3399ff;float:right;margin-right:10px;" @click="remarkShowClick()"> 重要事项 </span> </h2>
            <div class="cart_box">
                <van-cell-group>
                    <van-cell
                    v-for="(item, index) in newList"
                    clickable
                    :key="index"
                    :title="`${item.fragName}`"
                    @click="toggle(index)"
                    v-show="item.status"
                    >
                        <van-checkbox slot="right-icon" @click="checkboxClick()" v-model="item.status"/>
                    </van-cell>
                </van-cell-group>
                <van-cell v-if="params.details" :title="params.details" class="cell_details" >
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-icon
                        name="clear"
                        size="20"
                        @click="clearDetailsClick()"
                        />
                    </template>
                </van-cell>
            </div>
        </div>
    </van-popup>
    
    <van-popup v-model="fragmentremarkShow" :style="{ height: '100%',width:'100%'}" position="right" :z-index=200>
        <v-fragmentremark v-if="fragmentremarkShow" :message="params.details">

    </v-fragmentremark>
    </van-popup>
    </section>
</template>
<script>
import { getFragmentPersonalList,getFragmentDetail,postFragmentPersonalSave } from "@/api/api"
import vFragmentremark from "@/views/PersonalFrag/Fragmentremark"
import vMaskpage from "@/components/maskpage"
import Modal from "@/components/Modal"
import Bus from '@/common/js/bus.js'
    export default {
        components:{
            vMaskpage,
            Modal,
            vFragmentremark
        },
        data(){
            return {
                fragmentremarkShow:false,//备注信息
                show:false,
                list:[],
                newList:[],
                fragmentDetailList:[],
                shoppingCart:false, //打开/关闭状态
                shoppingCartList:[],//碎片包&&购物车列表
                shoppingCartListWatch:[],//碎片包&&购物车列表watch
                checkboxGroup:[],//碎片包&&购物车
                oneClassVal:[],//一级分类val
                twoClassVal:[],//二级分类val
                threeClassVal:[],//三级分类val Styl
                oneClassStyl:"",//一级分类style
                twoClassStyl:"",//二级分类style
                threeClassStyl:"",//三级分类style
                activeIds: [1, 2],
                activeIndex: 0,
                goods: [],
                selectedFood: {},
                scrollOptions: {
                    click: false,
                    directionLockThreshold: 0
                },
                params:{    
                    "fragIds":"",//字符串以 ","分隔
                    "details":""//可选
                }
            }
        },
        watch: {
            shoppingCartListWatch: {
                handler(newName, oldName) {
                    console.log('obj.a changed');
                },
                immediate: true
            }
        },
        created(){
            this.request()
            this.childView = false
        },
        mounted(){
            Bus.$on('remarkOkShow', target => {
                this.params.details = target
                this.fragmentremarkShow = false 
            });
            Bus.$on('remarkCancelShow', target => {
                this.fragmentremarkShow = false 
            });
        },
        methods:{
            /**
             * 一级分类
             */
            oneClassClick(i,index){
                this.oneClassStyl = index
                console.log(i)
                console.log(this.oneClassStyl)
                this.twoClassVal = i.privs
                this.twoClassStyl = 0
                this.threeClassStyl = 0

                this.threeClassVal = i.privs[0].privs
            },
            /**
             * 二级分类
             */
            twoClassClick(i,index){
                this.twoClassStyl = index
                console.log(this.twoClassStyl)
                // debugger;
                this.threeClassVal = []
                i.privs.forEach(e => {
                    if(!e.hasOwnProperty('status')){
                        e.status = false
                    }
                    this.threeClassVal.push(e)
                });
            },
            /**
             * 三级分类
             */
            threeClassClick(i,index){
                this.threeClassStyl = index
                this.show =! this.show 
                console.log(this.threeClassStyl)
                this.FragmentDetail(i)
            },
            /**
             * 获取任务列表
             */
            request(){
                getFragmentPersonalList(this.params).then(res =>{
                    if(res.data.code == 0){
                        if(!res.data.data.length){
                            this.$dialog.alert({
                                title: '提示',
                                message: '您目前尚未分配碎片！'
                            }).then(() => {
                                this.$router.go(-1)
                            });
                            return false;
                        }
                        console.log(res)
                        this.list = res.data.data
                        //一级菜单
                        res.data.data.forEach(e => {
                            this.oneClassVal.push(e)
                        });
                        //二级菜单
                        res.data.data[0].privs.forEach(e =>{
                            // if(t.firstPrivId == e.fragId){
                                //     this.twoClassVal.push(e)
                                // }
                            this.twoClassVal.push(e)
                        })
                        //三级菜单
                        res.data.data[0].privs[0].privs.forEach(t =>{
                            this.$set(t,'status',false)
                            // t.status = false
                            this.threeClassVal.push(t)
                        })
                        this.loading = false;
                        this.isLoading = false;
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: '网络错误请稍后再试！'
                        }).then(() => {
                            this.$router.go(-1)
                        });
                    }

                }).catch(err =>{
                    console.log(err)
                })
            },
            /** 
             * 获取详情
            */
            FragmentDetail(i){
                this.fragmentDetailList = []
                getFragmentDetail({"fragId":i.fragId}).then(res =>{
                    //判断以开放和未完成的状态
                    // debugger
                    if(i.isFinish=='0'&&i.isOpen == '1'){
                        res.data.data.status = true
                    }else{
                        res.data.data.status = false
                    }
                    res.data.data.parents = i
                    this.fragmentDetailList.push(res.data.data)
                    
                    this.loading = false;
                    this.isLoading = false;

                }).catch(err =>{
                    console.log(err)
                })
            },
            /** 
             * 提交碎片
            */
            FragmentPersonalSave(){
                postFragmentPersonalSave(this.params).then(res =>{
                    if(res.data.code == 0){
                        this.$dialog.alert({
                            title: '提示',
                            message: '提交成功'
                        }).then(() => {
                            console.log('提交成功')
                            //返回到上一页(不需要可删除)
                            this.$router.go(-1)
                        });
                    }else{
                        this.$dialog.alert({
                            title: '提示',
                            message: res.data.msg
                        })
                    }
                    this.loading = false;
                    this.isLoading = false;
                }).catch(err =>{
                    console.log(err)
                })
            },
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
                    }
                    this.newList = this.shoppingCartListWatch.filter((item)=>item.status)
                }
                this.show = false;
                console.log(this.shoppingCartList)
            },
            /** 
             * 清除备注
            */
            clearDetailsClick(){
                console.log()
                this.params.details = ""
            },
            /** 
             * 提交
            */
            saveClick(){
                //防止重复提交
                this.params.fragIds = ""
                if(!this.newList.filter((item)=>item.status).length && this.params.details.trim() == ""){
                    this.$dialog.alert({
                        title: '提示',
                        message: '请选择碎片或添加重要事项'
                    }).then(() => {
                        return false
                    });
                    return false
                    
                }
                this.newList.forEach(e => {
                    if(e.status){
                        this.params.fragIds += e.fragId+","
                    }
                });
                if (this.params.fragIds.length > 0) {
                    this.params.fragIds = this.params.fragIds.substr(0, this.params.fragIds.length - 1);
                }
                console.log(this.params)
                //调用提交保存
                this.FragmentPersonalSave()
            },
            /** 
             * 备注 开/关
            */
            remarkShowClick(){
              this.fragmentremarkShow = true;
            },
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            //控制打开购物车内部
            shoppingCartShow(){
                this.shoppingCart=true
                console.log(this.$refs.checkboxGroup)
                // this.$refs.checkboxGroup.toggleAll(true);
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
            //清空
            clearClick(){
                this.newList.forEach(e => {
                    e.status = false
                });
                this.newList = []
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
.box_tree{
    height: 100%;
    display: flex;
    flex-direction:row;
    color: #535151;
    font-size: 14px;
    padding:0 0 56px 0;
    .tree{
        width: 25%;
        height: 100%;
        padding:  5px 0;
        border-right:#ffffff 2px solid;
        overflow: auto;
		// font-weight:900!importan;
        li{
            .triangle-topright .word{
                transform: scale(.9) rotate(45deg);
            }
            padding: 10px 0;
            p{
                padding:0 5Px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3; //行数
                -webkit-box-orient: vertical;
            }
        }
    }
    .tree:nth-child(2){
        // background: green;
        width: 25%;
    }
    .tree:nth-child(3){
        // background: blue;
        border: none;
        width: 50%;
		background:#fff;
		font-weight:900;
        li{
            padding:0 5px;	
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            min-height:40px;
            position: relative;
            >p{
                padding:10px 0;
            }
            .checkFiexd{
                    height: 100%;
                    width: 50px;
                    background: rgba(0, 0, 0, 0);
                    position: absolute;
                    right: 0;
                    top: 0;
            }
        }
    }
}

.shop-cart-wrapper{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    background:#666666;
    color:#fff;
    z-index:95;
    .shop-cart-wrapper-btn{
        font-size:14px;
        float:right;
        line-height:300%;
        height:56px;
        padding:0 20%;
    }
}

.van-sidebar-item--select{
    border: none;
}
.word {
    text-align: center;
    margin: auto;
    position: absolute;
    display: inline-block;
    right: 5px;
    top: -40px;
    color: #FFF;
    transform-origin: bottom center;
    transform: rotate(50deg);
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
.cart_box{
    max-height: 500px;
    overflow: auto;
}
.cell_details{
    line-height: inherit;
    border-top:10px rgba(200,200,200,0.2) solid;
    
    
    .van-cell__title{
            width:80%;

        span{
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width:80%;
        }
    }
}
.newlist_length{
	 padding:0.08rem 0.08rem;min-width:.6rem;top:-5px;right:-5px;
}
	
.font_weight{
	font-weight:700!important;
}
.icon-cart{
	font-size: 25px;color: #646566;position: relative;
}
	
.logo-wrapper .logo{
	border: 1px solid #646566;
}
</style>
<style lang="stylus" scoped>
.logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: $color-background
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #ffffff
            padding: 10px 0 0 0
            &.highlight
              background: blue
            .icon-shopping_cart
              line-height: 44px
              font-size: 14px
              color: red
              &.highlight
                color: green
</style>

