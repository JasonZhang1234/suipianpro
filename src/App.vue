<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <!-- <router-link to="/a">跳转a页面</router-link> -->
        <v-content></v-content>
    </div>
</template>

<script>
// import vNav from './views/nav'\
import { getAuthority } from '@/api/api'
import vContent from './components/content'
export default {
    name: 'App',
    components:{
        vContent
    },
    created() {
        // this.PushRoute();
        // getAuthority()
    },
    methods:{
        PushRoute(){
            this.$router.replace({path: '/IndexInfo', query: { plan: 'private' }})
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
html{
    height: 100%;
}
body{
    width: 100%;
    height: 100%;
    position: relative;
}
[v-cloak]{
    display: none;
}
.van-field__control:disabled {
        color:#333!important;
}
/* @media screen and (min-width: 500px){
    body{
        width: 375px;
        margin: 0 auto;
        position: relative;
        text-align: center;
        margin: 0 auto;

    }
    html{
        width: 375px;
        font-size: 37.5px!important;
        text-align: center; 
        margin: 0 auto;
        
    }
}
@media screen and (min-width: 320px){
    body{
        font-size: 16px!important;
    }
}
@media screen and (min-width: 481px) and (max-width: 640px){
    body{
        font-size: 18px!important;
    }
}
@media screen and (min-width: 641px){
    body{
        font-size:20px!important;
       
    }
} */

.van-doc-demo-block__title {
    margin: 0;
    padding: 16px 16px;
    color: rgba(69, 90, 100, 0.8);
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
}
</style>
