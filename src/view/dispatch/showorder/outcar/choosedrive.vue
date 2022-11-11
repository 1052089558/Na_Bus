<template>
  <myform
    :fields="fields"
    v-model:data="detail"
    :labelwidth="120"
    :buttomlist="buttomlist"
  ></myform>
  <listtable v-model:tabledata="data" v-model:tablecolumns="tablecolumns" />
</template>
<script>
import myform from "@/components/myform/index.vue";
import listtable from "@/components/listtable/index.vue";
import { reactive, toRefs } from "vue";
export default {
  components: {
    myform,
    listtable,
  },
  setup(props, conntext) {
    const state = reactive({
      detail: {},
      data: [],
      buttomlist: [
        {
          index: 0,
          name: "查询",
        },
        {
          index: 1,
          name: "重置",
        },
      ],
      tablecolumns: [
        { prop: "fbillno", label: "司机", width: "180" },
        { prop: "fdate", label: "单位", width: "120" },
        { prop: "fsuppliername", label: "司机手机号", width: "250" },
        { prop: "fmodel", label: "车型/车牌号", width: "140" },
        { prop: "fnumber", label: "执法执勤", width: "140" },
        { prop: "pname", label: "租凭车辆", width: "120" },
        { prop: "itemtype", label: "司机状态", width: "120" },
        { prop: "funitname", label: "车辆状态", width: "80" },
      ],
      fields: [
        [
          {
            label: "单位名称",
            prop: "",
            type: "text",
            span: 6,
          },

          {
            label: "类别",
            required: true,
            prop: "fclassid",
            span: 6,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
          },
          {
            label: "车辆类型",
            required: true,
            prop: "fclassid",
            span: 6,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
          },
          {
            label: "业务类型",
            required: true,
            prop: "fclassid",
            span: 6,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
          },
        ],
        [
          {
            label: "司机",
            prop: "",
            type: "text",
            span: 6,
          },

          {
            label: "司机手机号",
            required: true,
            prop: "fclassid",
            span: 6,
            type: "text",
          },
          {
            label: "司机状态",
            required: true,
            prop: "fclassid",
            span: 6,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
          },
          {
            type: "buttombox",
            span: 6,
          },
        ],
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style>
</style>