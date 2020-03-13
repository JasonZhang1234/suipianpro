<template>
  <div class="hello">

        <router-link to="/ProjectDataList">
            <p>立项数据审批</p>
        </router-link>

        <router-link to="/ProjectDataDetails">
            <p>立项数据审批详情</p>
        </router-link>

        <router-link to="/ChangeDataList">
            <p>变更数据审批</p>
        </router-link>

        <router-link to="/ChangeDataDetails">
            <p>变更数据审批详情</p>
        </router-link>
        <router-link to="/TaskPlanList">
            <p>任务计划审批</p>
        </router-link>
        <router-link to="/TaskPlanDetails">
            <p>任务计划审批详情</p>
        </router-link>
        <p class="koi">测试</p>                                   
        <span class="fa fa-camera-retro fa-lg"></span>
        测试<input type="number" v-model="hah" name="" id=""  onchange='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'>
        <button @click="num">确定</button>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">标题</van-tabbar-item>
            <van-tabbar-item icon="chat" dot>标题</van-tabbar-item>
            <van-tabbar-item icon="records" info="5">标题</van-tabbar-item>
            <van-tabbar-item icon="gold-coin" info="20">标题</van-tabbar-item>
        </van-tabbar>

   
  </div>
</template>

<script>
// import { goPreProApply } from '@/api/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active:0,
      hah:''
    }
  },
  created(){
    goPreProApply().then(res=>{
      console.log(res)
    }).catch(err =>{
      console.log(err)
    })
  },
  methods:{
    num(){
      console.log(this.hah);
      if(this.hah){
        alert(this.hah)

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  font-size: .426667rem;
}
</style>
<style lang="less" scoped>
.koi{
    font-size:20  px;
}
</style>

