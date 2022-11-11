<template>
  <description
    :title="descriptitle"
    :data="data"
    @btnMap="clickBtnMap"
  ></description>
  <myform
    ref="myform"
    @btnClick="btnClick"
    :fields="fields"
    v-model:data="detail"
    :title="myformtitle"
  ></myform>
  <div class="buttomClass">
    <el-button type="primary">派车</el-button>
    <el-button type="danger">取消</el-button>
  </div>
  <el-dialog
    :append-to-body="true"
    v-if="detailvisible"
    title="选择司机车辆"
    v-model="detailvisible"
    width="80%"
    top="5vh"
    :destroy-on-close="true"
  >
    <detail @datachanged="detaildatachanged" @datadeleted="detaildatadeleted" />
  </el-dialog>
  <el-dialog
    :append-to-body="true"
    v-if="detailvisible2"
    title="地图定位"
    v-model="detailvisible2"
    width="80%"
    top="5vh"
    :destroy-on-close="true"
  >
    <showmap
      :addname="addname"
      @datachanged="detaildatachanged"
      @datadeleted="detaildatadeleted"
    />
  </el-dialog>
</template>

<script>
import description from "@/components/description/index.vue";
import myform from "@/components/myform/index.vue";
import detail from "./choosedrive.vue";
import showmap from "@/components/showmap/index.vue";
import { reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import discrition from "@/mock/descrition.json";
export default {
  components: {
    description,
    myform,
    detail,
    showmap,
  },
  setup() {
    const state = reactive({
      descriptitle: "订单信息",
      myformtitle: "司机车辆",
      data: [],
      detail: {},
      addname: "",
      discrition: discrition,
      detailvisible: false,
      detailvisible2: false,
      fields: [
        [
          {
            label: "司机",
            prop: "",
            type: "textappend",
            span: 4,
            readonly: true,
          },
          {
            span: 1,
          },
          {
            label: "请假类型",
            required: true,
            prop: "fclassid",
            span: 6,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
            readonly: true,
          },
          {
            span: 4,
            type: "buttonbox",
          },
        ],
      ],
    });
    onMounted(() => {
      state.data = state.discrition;
    });
    const btnClick = () => {
      state.detailvisible = true;
    };
    const clickBtnMap = (e, value) => {
      state.addname = value;
      state.detailvisible2 = true;
    };
    return {
      ...toRefs(state),
      btnClick,
      clickBtnMap,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.titltClass) {
  margin-top: 30px;
}
</style>