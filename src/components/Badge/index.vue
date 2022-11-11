<template>
  <div class="badgeClass">
    <el-badge
      :value="item.value"
      class="item"
      :type="item.type"
      v-for="(item, index) in badgelist"
      :key="index"
    >
      <el-button @click="badgeClick(item.name)">{{ item.name }}</el-button>
    </el-badge>
  </div>
</template>
<script>
export default {
  props: {
    badgelist: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const badgeClick = (name) => {
      context.emit("badgeClick", name);
    };
    return {
      badgeClick,
    };
  },
};
</script>
<style scoped>
.badgeClass {
  display: flex;
  margin-left: 2px;
  margin-top: 10px;
}
.item {
  margin-top: 10px;
  margin-right: 30px;
}
</style>