<style scoped>
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.conntext {
  margin-left: 20px;
}
.locaClass {
  font-size: large;
  cursor: pointer;
}
</style>
<template>
  <div class="context">
    <el-descriptions :title="title" :column="rowcolumn" :border="border">
      <div v-for="(item, index) in data" :key="index">
        <el-descriptions-item
          v-if="item.lable != '出发地'"
          :label="item.lable"
          :label-align="labelalign"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          :width="item.labelwidth"
          >{{ item.name }}
        </el-descriptions-item>
        <el-descriptions-item
          v-if="item.lable == '出发地'"
          :label="item.lable"
          :label-align="labelalign"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          :width="item.labelwidth"
          >{{ item.name }}
          <span @click="btnMap($event, item.name)">
            <el-icon class="locaClass"><Location /></el-icon
          ></span>
        </el-descriptions-item>
      </div>
    </el-descriptions>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "主题",
    },
    rowcolumn: {
      type: Number,
      default: 3,
    },
    border: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: [],
    },
    labelwidth: {
      type: String,
      default: "50px",
    },
    labelalign: {
      type: String,
      default: "center",
    },
  },
  setup(props, context) {
    const btnMap = (e, prop) => {
      context.emit("btnMap", e, prop);
    };
    return {
      btnMap,
    };
  },
};
</script>

