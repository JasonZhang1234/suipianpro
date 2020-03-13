<template>
    <section class="nav">
    <van-nav-bar title="tpms" left-text="返回" right-text="清除记录" left-arrow @click-left="onClickLeft" @click-right="onClickRight" style="font-size:1.2em!important;"/>
    <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    </section>
     
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    methods:{
        //点击返回
        onClickLeft() {
            this.$toast('返回');
            this.$router.go(-1);
        },
        //点击按钮
        onClickRight() {
            localStorage.clear();
            // console.log(this)
            // this.name = "";
            this.$store.commit('SET_NAME',[])
            
            this.$toast('清除记录成功');
        },
    }
}
</script>
<style lang="less" >
// .van-ellipsis .van-nav-bar__title{
//     font-size: 2em!important;
// }
// .van-nav-bar__title{
//     font-size: 1.2em;
// }
.nav{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
}
</style>



