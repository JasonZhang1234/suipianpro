<template>
    <div>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <van-grid :column-num="3">
            <van-grid-item
                v-for="(i,index) in list"
                :key="index"
                icon="fire"
                :text="i.name"
                :to="'/'+i.icon"
                :info="i.name=='消息'?count:''"
            >
                <template #icon> 
                    <i class="iconfont" :class="'icon-'+i.icon" style="font-size: xx-large;color: #646566;"></i>
                </template>
            </van-grid-item>
        </van-grid>
    </div>
</template>
<script>
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import { getMenuView,getNoticeCount } from "@/api/api"
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
    
  },
  created(){
      this.request()
  },
  methods: {
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
                this.count = res.data.data.count>99?"99+":res.data.data.count
            }
        }).catch(err =>{
            console.log(err)
        })
      }
  },
}
</script>
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
<style lang="less" scoped>

</style>

