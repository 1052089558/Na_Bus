<template>
  <div class="myform">
    <h2 class="titltClass" v-if="title">{{ title }}</h2>
    <el-form ref="form" :model="data" :label-width="labelwidth">
      <el-row v-for="(row, rindex) in fields" :key="rindex">
        <el-col
          v-for="(item, cindex) in row"
          :key="cindex"
          :span="item.span"
          :xs="24"
          :sm="12"
          :md="item.span"
          :lg="item.span"
          :xl="item.span"
        >
          <el-form-item
            :prop="item.prop"
            :rules="
              item.required
                ? [
                    {
                      required: true,
                      message: '请填写' + item.label,
                      trigger: ['blur', 'change'],
                    },
                  ]
                : ''
            "
            :label="item.label"
            :style="item.style"
            v-if="!item.hidden"
          >
            <el-input
              :rows="item.rows"
              @change="changeinput($event, item.prop)"
              :type="item.type"
              v-if="
                item.type == 'text' ||
                item.type == 'number' ||
                item.type == 'textarea'
              "
              v-model="data[item.prop]"
              :readonly="item.readonly"
            ></el-input>
            <el-date-picker
              :clearable="item.clearable"
              @change="changedate($event, item.prop)"
              :style="{ width: '100%' }"
              :type="item.type"
              v-if="item.type == 'datetime' || item.type == 'date'"
              v-model="data[item.prop]"
              :readonly="item.readonly"
            ></el-date-picker>
            <selectors
              :clearable="item.clearable"
              @changeselect="changeselect($event, item.prop)"
              :disabled="item.disabled"
              v-if="item.type == 'selector'"
              :current="data[item.prop]"
              :options="item.options"
              :fidfield="item.fidfield"
              :fnamefield="item.fnamefield"
            ></selectors>
            <el-switch
              @change="changeinput($event, item.prop)"
              v-if="item.type == 'switch'"
              v-model="data[item.prop]"
            ></el-switch>

            <el-input
              :rows="item.rows"
              @change="changeinput($event, item.prop)"
              :type="item.type"
              v-if="item.type == 'textappend'"
              v-model="data[item.prop]"
            >
              <template #append>
                <el-button @click="btnClick($event, item.prop)">{{
                  item.btntext ? item.btntext : "选择"
                }}</el-button>
              </template>
            </el-input>
            <div v-if="item.type == 'buttonbox'" class="buttonbox">
              <el-button
                :buttonlist="buttonlist"
                v-for="(item, index) in buttonlist"
                :key="index"
                @click="buttomClick($event, item.name)"
              >
                {{ item.name }}
              </el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import selectors from "@/components/selector/index.vue";
import { ref } from "@vue/reactivity";
export default {
  components: {
    selectors,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    labelwidth: {
      type: String,
      default: "80px",
    },
    data: {
      type: Object,
      default: {},
    },
    fields: {
      type: Array,
      default: [],
    },
    buttonlist: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const changeselect = (e, prop) => {
      props.data[prop] = e;
      context.emit("changeselect", e, prop);
      context.emit("changefield", e, prop);
    };
    const changedate = (e, prop) => {
      props.data[prop] = e;
      context.emit("changedate", e, prop);
      context.emit("changefield", e, prop);
    };
    const changeinput = (e, prop) => {
      context.emit("changefield", e, prop);
    };
    const btnClick = (e, prop) => {
      context.emit("btnClick", e, prop);
    };
    const clickbuttom = (e, prop) => {
      context.emit("clickbuttom", e, prop);
    };

    const form = ref(null);

    const validate = () => {
      // console.log(22)
      let result = false;
      form.value.validate((valid) => {
        if (valid) {
          result = true;
        }
      });
      return result;
    };

    const clearValidate = () => {
      // console.log('cl')
      form.value.clearValidate();
    };

    return {
      changeselect,
      changedate,
      changeinput,
      btnClick,
      form,
      validate,
      clearValidate,
      clickbuttom,
    };
  },
};
</script>

<style lang="scss" scoped>
.titltClass {
  display: flex;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
}
.buttonbox {
  display: flex;
}
</style>