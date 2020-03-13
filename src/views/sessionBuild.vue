<template>
    <div class="sessionBuild">
        <h2>正在验证...</h2>
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
        <div class="spinner1">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>

    </div>
</template>

<script>
import { getAuthority } from '@/api/api'
import { getDeploytList } from "../api/api"

export default {
    // name: 'App',
    data(){
        return {
            params:{
                "code":"q580TIJPvz3xYneEspufAthoPjEYdC4"
            },
            level:{
                "1":"--分行用户",
                "2":"/TopTask",
                "3":"--网点用户"
            }
        }
    },
    components:{
        // vContent
    },
    created() {
        this.PushRoute();
        return false;
        getAuthority(this.params).then(res =>{
                    console.log(res);
                    if(res.data.level){
                        setTimeout(()=>{
                            this.$router.push({path: this.level[res.data.level], query: { plan: 'private' }})

                        },1000)
                        /** 
                         * 需要考虑验证失败的页面/没有权限
                        */
                    }
                }).catch(err =>{
                    console.log(err)
                })
    },
    methods:{
        PushRoute(){
            this.$router.push({path: '/Home', query: { plan: 'private' }})
        }
    }
}
</script>

<style lang="less" scoped>
.sessionBuild{
    h2{
        text-align: center;
        margin: 50px auto;
    }
}
.spinner {
  margin: 100px auto;
  width: 32px;
  height: 32px;
  position: relative;
}

.cube1,
.cube2 {
  background-color: #c7000a;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: -50%;

  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

.spinner1 {
  margin: 100px auto;
  width: 90px;
  height: 90px;
  position: relative;
  text-align: center;

  -webkit-animation: rotate 2s infinite linear;
  animation: rotate 2s infinite linear;
}

.dot1,
.dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #c7000a;
  border-radius: 100%;

  -webkit-animation: bounce 2s infinite ease-in-out;
  animation: bounce 2s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0px;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
