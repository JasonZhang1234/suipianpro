<template>
    <div>
        <van-image :src="require('../../static/header.jpg')" />
        <van-grid :column-num="3">
            <van-grid-item
                v-for="(i,index) in list"
                :key="index"
                icon="fire"
                :text="i.name"
                :to="i.url"
                :info="i.name=='消息'?count:''"
            >
                <template #icon> 
                    <i class="iconfont" :class="i.icon" style="font-size: xx-large;color: #646566;"></i>
                </template>
            </van-grid-item>
        </van-grid>
    </div>
</template>
<script>
import { getMenuView,getNoticeCount,loginTemp } from "@/api/api"
import Bus from '@/common/js/bus.js'

export default {
  data() {
    return {
      checked: false,
      value: 5,
      list:[],
      count:"",
      params:{

      }
    };
  },
  mounted() {
        Bus.$emit('keepalive',"aaa");
    
  },
  created(){
   		this.login();
      this.request()
  },
  methods: {
      login(){
        let loginParam = {
			username:"020016762",//zg
          //username:"001200007",//ls
          //username:"000790033", //kf 
          //username:"001195593",
          password:"1",
          logintype:"0"
        };
        loginTemp(loginParam).then(res =>{
            if(res.code != 0){
                console.log(res.msg);
            }
        })
      },
      request(){
        getMenuView(this.params).then(res =>{
            if(!res.data.code){
                this.list = res.data.data
            }
        }).catch(err =>{
            console.log(err)
        })
        //获取未读消息数
        getNoticeCount().then(res =>{
            if(!res.data.code){
                this.count = res.data.data>99?"99+":res.data.data
            }
        }).catch(err =>{
            console.log(err)
        })
      }
  },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.path==="/message"){
            to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
        }
        next();
    }
}
</script>
<style lang="less" scoped>
.van-image{
	width: 100%;
}
</style>

