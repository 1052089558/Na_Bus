<template>
  <div class="listtable">
    <el-row align="middle" class="subtoolbar" v-if="!readonly">
      <slot></slot>
      <el-button
        :size="btnsize"
        :style="{ marginLeft: '10px' }"
        icon="el-icon-download"
        type="success"
        v-if="candownload"
        @click="export2Excel()"
        >导出</el-button
      >
    </el-row>
    <vxe-table
      :checkbox-config="{ checkField: 'checked' }"
      :border="border"
      :resizable="resizable"
      :auto-resize="true"
      highlight-current-row
      highlight-hover-row
      :show-overflow="showoverflow"
      :show-header-overflow="showheaderoverflow"
      @checkbox-all="onCheckchange"
      @cell-click="onCellClick"
      @checkbox-change="onCheckchange"
      @cell-dblclick="dbClick"
      v-loading="loading"
      align="center"
      ref="mytable"
      :data="table_data"
      style="width: 100%"
      :height="height"
      :span-method="spanmethod"
      :row-style="rowStyle"
    >
      <vxe-column
        fixed="left"
        type="checkbox"
        width="40"
        v-if="hasSelection"
      ></vxe-column>
      <vxe-column
        type="seq"
        title="序号"
        width="60"
        fixed="left"
        v-if="showSeq"
      ></vxe-column>

      <vxe-column
        :sort-config="{ multiple: true, trigger: 'cell' }"
        :sortable="item.sortable"
        :fixed="item.fixed"
        v-for="(item, index, key) in tablecolumns"
        :item="item"
        :key="key"
        :index="index"
        :title="item.label"
        :width="item.width"
        :field="item.prop"
      >
        <template #default="scope">
          <el-row>
            <span
              :style="getItemStyle(item, scope.row)"
              v-if="item.type != 'tag'"
              >{{ formatColumn(scope.row, item) }}</span
            >

            <div v-if="item.type == 'tag'">
              <el-tag
                effect="dark"
                type="warning"
                v-if="scope.row[item.prop] == 0"
                >否</el-tag
              >
              <el-tag effect="dark" type="success" v-else>是</el-tag>
            </div>
          </el-row>
        </template>
      </vxe-column>
      <vxe-column title="操作" fixed="right" :width="opWidth" v-if="hasViewOp">
        <template #default="scope">
          <el-row v-for="(item, index) in buttonlist" :key="index">
            <el-button @click="handleView(scope.row)">
              {{ item.name }}
            </el-button>
          </el-row>
        </template>
      </vxe-column>
    </vxe-table>

    <el-pagination
      v-if="my_pagenation != null"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100, 500, 1000]"
      :page-size="my_pagenation.size"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="my_pagenation.current"
      :total="my_pagenation.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { toRefs, reactive, watch, onMounted, ref } from "vue";
import moment from "moment";

export default {
  components: {
    // Statebar,
    // WorkorderState,
    // DateStatebar,
  },
  props: {
    btnsize: {
      type: String,
      default: "small",
    },
    showSeq: {
      type: Boolean,
      default: true,
    },
    candownload: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
    showoverflow: {
      type: Boolean,
      default: false,
    },
    showheaderoverflow: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: "750",
    },
    tablecolumns: {
      type: Array,
      default: [],
    },
    buttonlist: {
      type: Array,
      default: [],
    },
    tabledata: {
      type: Array,
      default: [],
    },
    pagenation: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasViewOp: {
      type: Boolean,
      default: true,
    },
    opWidth: {
      type: Number,
      default: "200",
    },
    hasSelection: {
      type: Boolean,
      default: false,
    },
    hideheader: {
      type: Boolean,
      default: false,
    },
    hideColumnIndex: {
      type: Number,
      default: 1,
    },
    fidfield: {
      type: String,
      default: "finterid",
    },
    tablename: {
      type: String,
      default: "查询列表",
    },
  },
  setup(props, context) {
    const state = reactive({
      table_data: [],
      my_pagenation: null,
      hasSpanRows: [],
      multipleSelection: [],
    });

    const mytable = ref(null);

    watch(
      () => props.tabledata,
      () => {
        state.table_data = props.tabledata;
        filterData(state.table_data, props.fidfield);
      }
    );

    watch(
      () => props.pagenation,
      () => {
        if (props.pagenation) {
          state.my_pagenation = props.pagenation;
        }
      }
    );

    onMounted(() => {
      state.table_data = props.tabledata;
      if (props.pagenation) {
        state.my_pagenation = props.pagenation;
      }
    });

    const formatColumn = (row, item) => {
      if (item.type == "date" || item.type == "datetime") {
        if (row[item.prop] && moment(row[item.prop]).isValid()) {
          let formater =
            item.type == "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";
          return moment(row[item.prop]).format(formater);
        } else {
          return null;
        }
      }
      if (item.type == "number") {
        let point = item.point ? item.point : 2;
        return parseFloat(row[item.prop]).toFixed(point);
      }
      if (item.type == "selector") {
        var target = item.options.find(
          (t) => t[item.fidfield] == row[item.prop]
        );
        if (target != null) {
          return target[item.fnamefield];
        }
      } else {
        return row[item.prop];
      }
    };

    const handleCurrentChange = (val) => {
      state.my_pagenation.current = val;
      context.emit("changepage", state.my_pagenation);
    };

    const handleSizeChange = (val) => {
      state.my_pagenation.size = val;
      context.emit("changepage", state.my_pagenation);
    };

    const handleView = (row) => {
      context.emit("view", row);
    };
    const dbClick = ({ row }) => {
      context.emit("rowdbclick", row);
    };

    const filterData = (datas, idfield) => {
      if (!props.hideheader || datas.length == 0) return;
      datas.sort((a, b) => {
        return a[idfield] - b[idfield];
      });
      // 数据处理
      var ids = [];
      datas.forEach((t) => {
        let id = t[idfield];
        if (ids.length > 0) {
          var target = ids.find((i) => {
            return i.id == id;
          });
          if (!target) {
            ids.push({
              id: id,
              count: 1,
            });
          } else {
            target.count++;
          }
        } else {
          ids.push({
            id: id,
            count: 1,
          });
        }
      });

      datas.forEach((t) => {
        let target = ids.find((i) => {
          return i.id == t[idfield];
        });
        if (target) {
          t.rowspan = target.count;
          ids.splice(ids.indexOf(target), 1);
        } else {
          t.rowspan = 0;
        }
      });
    };

    const spanmethod = ({ row, column, rowIndex, columnIndex }) => {
      if (!props.hideheader) {
        return;
      }
      if (columnIndex < props.hideColumnIndex) {
        if (row.rowspan > 0) {
          return [row.rowspan, 1];
        } else {
          return [0, 0];
        }
      }
    };

    const onCheckchange = ({ records }) => {
      // console.log(records);
      state.multipleSelection = records;
      context.emit("selectchange", state.multipleSelection);
    };

    const getItemStyle = (item, row) => {
      if (item.bgcolors) {
        var target = item.bgcolors.find((t) => {
          return t.id == row[item.bgcolors[0].prop];
        });
        if (target) {
          return target.style;
        }
      }
      if (item.cellstyle) {
        return item.cellstyle;
      }
    };

    const rowStyle = ({ row }) => {
      if (row.rowstyle) {
        return row.rowstyle;
      }
    };

    const export2Excel = () => {
      var wb = XLSX.utils.book_new();

      // console.log('columns', props.tablecolumns);
      // console.log('datas', state.table_data);

      let datas = [];
      let headers = [];
      props.tablecolumns.forEach((t) => {
        if (t.type == "checkbox") return;
        headers.push(t.label);
      });

      state.table_data.forEach((d) => {
        let data = {};
        props.tablecolumns.forEach((t) => {
          if (t.type == "checkbox") return;
          // console.log(t);

          let key = t.label;
          let val = formatColumn(d, t);
          data = Object.assign(data, { [key]: val });
        });

        datas.push(data);
      });

      // console.log(datas, headers);

      var ws = XLSX.utils.json_to_sheet(datas, { header: headers });

      // console.log('ws', ws);

      // 在工作簿中增加工作表
      XLSX.utils.book_append_sheet(wb, ws, props.tablename);

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          props.tablename + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          // console.log(e, wbout);
        }
      }
      return wbout;
    };

    const onCellClick = ({ row }) => {
      context.emit("cellclick", row);
    };

    return {
      ...toRefs(state),
      formatColumn,
      handleSizeChange,
      handleCurrentChange,
      handleView,
      dbClick,
      spanmethod,
      onCheckchange,
      getItemStyle,
      mytable,
      rowStyle,
      export2Excel,
      onCellClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.module.scss";

.listtable {
  margin-top: 10px;
  .subtoolbar {
    margin-top: -10px;
    margin-bottom: 10px;
  }
}
.el-pagination {
  margin-top: 20px;
}
</style>
