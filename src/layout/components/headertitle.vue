<template>
  <div class="context">
    <div class="context-left">
      <img :src="viteimg" alt="" />
      <div class="topic">公交车出行服务云平台</div>
    </div>
    <div class="context-right">
      <i></i>
      <div class="user">{{ username }}</div>
      <img :src="viteimg" alt="" />
    </div>
  </div>
</template>
<script>
import viteimg from "@/assets/vite.svg";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      username: "超级管理员",
    });
    return {
      ...toRefs(state),
      viteimg,
    };
  },
};
</script>

<style lang="less" scoped>
.context {
  display: flex;
  justify-content: space-between;
  background-color: #464c5b;

  &-left {
    display: flex;
    img {
      margin-left: 10px;
    }
    .topic {
      color: #fff;
      font-size: 20px;
      font-weight: lighter;
      line-height: 50px;
    }
  }
  &-right {
    display: flex;
    i {
      width: 1px;
      height: 35px;
      background-color: #fff;
      margin-top: 6px;
      margin-right: 20px;
    }
    .user {
      font-size: 18px;
      color: #fff;
      line-height: 50px;
      margin-right: 24px;
    }
    img {
      margin-right: 10px;
    }
  }
}
</style>