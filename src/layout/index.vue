<template>
  <div class="layout">
    <el-container>
      <el-header>
        <headertitle></headertitle>
      </el-header>
      <el-container>
        <el-aside>
          <el-aside>
            <tree-menu :treeData="treeData" />
          </el-aside>
        </el-aside>
        <el-main>
          <Breadcrumb />
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headertitle from "./components/headertitle.vue";
import Breadcrumb from "./components/breadcrumb.vue";
import { reactive, toRefs } from "@vue/reactivity";
import TreeMenu from "../components/menu/TreeMenu.vue";
import treeData from "@/mock/menv.json";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    headertitle,
    TreeMenu,
    Breadcrumb,
  },
  setup() {
    const state = reactive({
      isCollapse: false,
      treeData: treeData,
    });
    onMounted(() => {
      console.log("TreeMenu", state.treeData);
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
  height: 50px;
  width: 100%;
  padding: 0;
}
.el-aside {
  width: 250px;
  height: 100%;
}
.el-main {
  text-align: center;
}
</style>