<template>
  <div class="nav_box">
    <el-menu
      router
      :default-active="this.$route.path"
      unique-opened
      :background-color="backgroundColor"
      :text-color="TextColor"
      :active-text-color="activeTextColor"
      :mode="mode"
    >
      <template v-for="one in treeData">
        <el-sub-menu
          :index="one.data.url"
          v-if="one.children && one.children.length"
          v-bind:key="one.data.menuId"
        >
          <template v-slot:title>
            <i :class="one.icone" v-if="one.icone"></i>
            <span>{{ one.data.name }}</span>
          </template>
          <template v-for="item in one.children">
            <el-sub-menu
              :index="item.data.url"
              v-if="item.children && item.children.length"
              v-bind:key="item.data.menuid"
            >
              <template v-slot:title>
                <i :class="item.icone" v-if="item.icone"></i>
                <span>{{ item.data.name }}</span>
              </template>
              <div v-for="(k, index) in item.children" :key="index">
                <el-menu-item :index="k.data.url" v-bind:key="k.data.menuId">
                  <i :class="k.icone" v-if="k.icone"></i>
                  <template v-slot:title>{{ item.data.name }}</template>
                </el-menu-item>
              </div>
            </el-sub-menu>
            <el-menu-item
              :index="item.data.url"
              v-bind:key="item.data.menuId"
              v-else-if="!item.blank"
            >
              <i :class="item.icone" v-if="item.icone"></i>
              <template v-slot:title>{{ item.data.name }}</template>
            </el-menu-item>
            <a
              :href="item.data.url"
              v-bind:key="item.data.menuId + 1"
              target="_blank"
              class="nav_a"
              v-else
            >
              <el-menu-item v-bind:key="item.data.menuId">
                <i :class="item.icone" v-if="item.icone"></i>
                <span>{{ item.data.name }}</span>
              </el-menu-item>
            </a>
          </template>
        </el-sub-menu>
        <el-menu-item
          :index="one.data.url"
          v-bind:key="one.data.menuId + 2"
          v-else-if="!one.blank"
        >
          <i :class="one.icone" v-if="one.icone"></i>
          <template v-slot:title>{{ one.data.name }}</template>
        </el-menu-item>
        <a
          :href="one.data.url"
          v-bind:key="one.data.menuId + 3"
          target="_blank"
          class="nav_a"
          v-else
        >
          <el-menu-item v-bind:key="one.id">
            <i :class="one.icone" v-if="one.icone"></i>
            <span>{{ one.data.name }}</span>
          </el-menu-item>
        </a>
      </template>
    </el-menu>
  </div>
</template>
<script >
import { ref, onMounted } from "vue";

export default {
  name: "TreeMenu",
  props: {
    treeData: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    onMounted(() => {
      console.log("hhh", props.treeData);
    });

    return {};
  },
};
</script>

<style scoped lang="less">
</style>

