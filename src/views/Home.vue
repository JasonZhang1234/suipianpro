<template>
    <div>
        <van-grid :column-num="3" :gutter="10">
            <van-grid-item
                icon="fire"
                text="碎片查看"
                to="/fragment"
            />
            <van-grid-item
                icon="fire"
                text="管理确认"
                to="/guanliqueyin"
            />
            <van-grid-item
                icon="fire"
                text="临时碎片领用"
                to="/shuipianlingyong"
            />
            <van-grid-item
                icon="fire"
                text="临时碎片审核"
                to="/suipianshenhe"
            />
            <van-grid-item
                icon="fire"
                text="信息"
                to="/xinxi"
            />
            <van-grid-item
                v-for="value in 6"
                :key="value"
                icon="fire"
                text="菜单"
                to="/guanliqueyin"
            />
        </van-grid>
    </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      value: 5
    };
  },
  // 注意：组件挂载后才能访问到 ref 对象
  mounted() {
    // this.$refs.checkbox.toggle();
  }
}
</script>
