<template>
    <section class="section">
        <keep-alive :include="includedComponents">
            <router-view></router-view>
        </keep-alive>
        <!-- <div class="content">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div> -->
    </section>
</template>
<script>
    import Bus from '@/common/js/bus.js'
    export default{
        components:{
        },
        data(){
            return {
                includedComponents:"message"
            }
        },
        mounted(){
            Bus.$on('keepalive', target => {
                console.log("dfsja"+target)
                this.includedComponents = target 
            });  
        }
    }
</script>
<style lang="less" scoped>
// section{
//     height: 100%;
// }
.content{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    // top:100px;
    top: 0;
    // height: 100%;
    overflow: auto;

}
.section{
    height: 100%;
}
</style>


