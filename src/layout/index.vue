<template>
  <div class="layout">
    <el-container>
      <el-header>
        <headertitle></headertitle>
      </el-header>
      <el-container>
        <el-aside width="250px" height="100%"
          ><menu :isCollapse="isCollapse"></menu
        ></el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headertitle from "./components/headertitle.vue";
import Menu from "../components/menu/index.vue";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  components: {
    headertitle,
    Menu,
  },
  setup() {
    const state = reactive({
      isCollapse: false,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #d3dce6;
  height: 50px;
  width: 100%;
  padding: 0;
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
}
</style>