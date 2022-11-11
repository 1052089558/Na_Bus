<template>
  <div></div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped lang='scss'>
</style>