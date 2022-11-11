<template>
  <div v-if="routers.currentRoute.value.meta.showfater">
    <myform
      ref="myform"
      :fields="fields"
      v-model:data="detail"
      :buttonlist="buttonlist"
    />
    <badge :badgelist="badgelist" @badgeClick="badgeClick" />
    <listtable
      v-model:tabledata="data"
      v-model:tablecolumns="tablecolumns"
      :height="700"
    />
  </div>
  <router-view></router-view>
</template>

<script>
import myform from "@/components/myform/index.vue";
import badge from "@/components/Badge/index.vue";
import listtable from "@/components/listtable/index.vue";
import description from "@/components/description/index.vue"; //派车模块
import { reactive } from "@vue/reactivity";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  components: {
    myform,
    badge,
    description,
    listtable,
  },
  setup() {
    const state = reactive({
      tablestate: "全部",
      tablecolumns: [],
      badgelist: [
        {
          name: "全部",
          value: "711",
          type: "primary",
        },
        {
          name: "待审批",
          value: "21",
          type: "primary",
        },
        {
          name: "已批准",
          value: "711",
          type: "primary",
        },
        {
          name: "已派车",
          value: "711",
          type: "primary",
        },
        {
          name: "接驾中",
          value: "315",
          type: "primary",
        },
        {
          name: "已到达出发地",
          value: "711",
          type: "primary",
        },
        {
          name: "执行中",
          value: "711",
          type: "primary",
        },
        {
          name: "已到达目的地",
          value: "711",
          type: "primary",
        },
        {
          name: "已完成",
          value: "711",
          type: "primary",
        },
        {
          name: "已拒绝",
          value: "711",
          type: "primary",
        },
        {
          name: "已取消",
          value: "711",
          type: "primary",
        },
      ],
      buttonlist: [
        { name: "查询", index: 0 },
        { name: "重置", index: 1 },
      ],

      fields: [
        [
          {
            label: "订单号",
            prop: "",
            type: "text",
            span: 4,
          },
          {
            span: 1,
          },
          {
            label: "下单车型",
            prop: "",
            type: "textappend",
            span: 4,
            readonly: true,
          },
          {
            span: 1,
          },

          {
            label: "车辆来源",
            required: true,
            prop: "fclassid",
            span: 4,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
            readonly: true,
          },
          {
            span: 1,
          },
          {
            label: "单位",
            required: true,
            prop: "fclassid",
            span: 5,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
            readonly: true,
          },
          {
            label: "业务类型",
            required: true,
            prop: "fclassid",
            span: 4,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
            readonly: true,
          },
        ],
        [
          {
            label: "支付类型",
            required: true,
            prop: "fclassid",
            span: 4,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
          },
          {
            span: 1,
          },
          {
            label: "用车时间",
            required: true,
            prop: "fstartdate",
            type: "date",
            span: 4,
          },
          {
            span: 1,
          },
          {
            label: "年份",
            required: true,
            prop: "fclassid",
            span: 4,
            type: "selector",
            options: [],
            disabled: false,
            fidfield: "finterid",
            fnamefield: "fname",
          },
          {
            span: 1,
          },
          {
            span: 4,
            type: "buttonbox",
          },
        ],
      ],
    });
    onMounted(() => {
      initcolumns();
    });
    const initcolumns = () => {
      if (state.tablestate == "全部") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "到达出发地时间", width: "250" },
          { prop: "fmodel", label: "实际出发地点", width: "140" },
          { prop: "fnumber", label: "到达目的地时间", width: "140" },
          { prop: "pname", label: "用车单位", width: "120" },
          { prop: "itemtype", label: "订单类型", width: "120" },
          { prop: "funitname", label: "支付类型", width: "80" },
          { prop: "funitname", label: "下单车型", width: "80" },
          { prop: "funitname", label: "已派车车型", width: "120" },
          { prop: "funitname", label: "乘客", width: "80" },
          { prop: "funitname", label: "司机", width: "80" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "订单状态", width: "80" },
        ];
      } else if (state.tablestate == "待审批") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "申请时间", width: "250" },
          { prop: "fmodel", label: "用车单位", width: "140" },
          { prop: "fnumber", label: "订单类型", width: "140" },
          { prop: "pname", label: "下单车型", width: "120" },
          { prop: "itemtype", label: "申请人", width: "120" },
          { prop: "funitname", label: "审批人", width: "80" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "用车说明", width: "120" },
          { prop: "funitname", label: "订单状态", width: "80" },
        ];
      } else if (state.tablestate == "已批准" || state.tablestate == "已拒绝") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "申请时间", width: "250" },
          { prop: "fmodel", label: "审批时间", width: "140" },
          { prop: "fnumber", label: "用车单位", width: "140" },
          { prop: "pname", label: "订单类型", width: "120" },
          { prop: "itemtype", label: "下单车型", width: "120" },
          { prop: "funitname", label: "申请人", width: "80" },
          { prop: "funitname", label: "审批人", width: "80" },
          { prop: "funitname", label: "出发地", width: "120" },
          { prop: "funitname", label: "用车说明", width: "80" },
        ];
      } else if (state.tablestate == "已派车") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "订单类型", width: "250" },
          { prop: "fmodel", label: "下单车型", width: "140" },
          { prop: "fnumber", label: "已派车型", width: "140" },
          { prop: "pname", label: "乘客", width: "120" },
          { prop: "itemtype", label: "司机", width: "120" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "订单状态", width: "80" },
        ];
      } else if (state.tablestate == "接驾中") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "车辆出场时间", width: "250" },
          { prop: "fmodel", label: "订单类型", width: "140" },
          { prop: "fnumber", label: "下单车型", width: "140" },
          { prop: "pname", label: "已派车型", width: "120" },
          { prop: "itemtype", label: "乘客", width: "120" },
          { prop: "funitname", label: "司机", width: "80" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "订单状态", width: "80" },
        ];
      } else if (state.tablestate == "已到达出发地") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "车辆出场时间", width: "250" },
          { prop: "fsuppliername", label: "到达出发地时间", width: "250" },
          { prop: "fmodel", label: "订单类型", width: "140" },
          { prop: "fnumber", label: "下单车型", width: "140" },
          { prop: "pname", label: "已派车型", width: "120" },
          { prop: "itemtype", label: "乘客", width: "120" },
          { prop: "funitname", label: "司机", width: "80" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "订单状态", width: "80" },
        ];
      } else if (state.tablestate == "执行中") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "到达出发地时间", width: "250" },
          { prop: "fsuppliername", label: "实际出发时间", width: "250" },
          { prop: "fmodel", label: "订单类型", width: "140" },
          { prop: "fnumber", label: "下单车型", width: "140" },
          { prop: "pname", label: "已派车型", width: "120" },
          { prop: "itemtype", label: "乘客", width: "120" },
          { prop: "funitname", label: "司机", width: "80" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "订单状态", width: "80" },
        ];
      } else if (state.tablestate == "已到达目的地") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fsuppliername", label: "到达出发地时间", width: "250" },
          { prop: "fsuppliername", label: "到达目的地时间", width: "250" },
          { prop: "fmodel", label: "订单类型", width: "140" },
          { prop: "fnumber", label: "下单车型", width: "140" },
          { prop: "pname", label: "已派车型", width: "120" },
          { prop: "itemtype", label: "乘客", width: "120" },
          { prop: "funitname", label: "司机", width: "80" },
          { prop: "funitname", label: "出发地", width: "80" },
          { prop: "funitname", label: "订单状态", width: "80" },
          { prop: "funitname", label: "里程(公里)", width: "80" },
          { prop: "funitname", label: "耗时(时)", width: "120" },
          { prop: "funitname", label: "费用(元)", width: "80" },
        ];
      } else if (state.tablestate == "已完成") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fbillno", label: "支付时间", width: "180" },
          { prop: "fdate", label: "订单类型", width: "120" },
          { prop: "fsuppliername", label: "下单车型", width: "250" },
          { prop: "fsuppliername", label: "已派车型", width: "250" },
          { prop: "fmodel", label: "乘客", width: "140" },
          { prop: "fnumber", label: "司机", width: "140" },
          { prop: "pname", label: "出发地", width: "120" },
          { prop: "itemtype", label: "订单状态", width: "120" },
          { prop: "funitname", label: "里程(公里)", width: "120" },
          { prop: "funitname", label: "耗时(时)", width: "80" },
          { prop: "funitname", label: "费用(元)", width: "80" },
        ];
      } else if (state.tablestate == "已取消") {
        state.tablecolumns = [
          { prop: "fbillno", label: "订单号", width: "180" },
          { prop: "fdate", label: "计划出发时间", width: "120" },
          { prop: "fdate", label: "订单类型", width: "120" },
          { prop: "fsuppliername", label: "下单车型", width: "250" },
          { prop: "fmodel", label: "乘客", width: "140" },
          { prop: "fnumber", label: "司机", width: "140" },
          { prop: "pname", label: "出发地", width: "120" },
          { prop: "itemtype", label: "订单状态", width: "120" },
        ];
      }
    };
    const routers = useRouter();
    const badgeClick = (e) => {
      state.tablestate = e;
      initcolumns();
      console.log("e", state.tablestate);
      if (e == "待审批") {
        console.log("router", routers);
        routers.push({ path: "/dispatch/showorder/outcar" });
      }
    };
    return {
      routers,
      ...toRefs(state),
      initcolumns,
      badgeClick,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>