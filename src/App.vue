<script setup >
// if (sessionStorage.getItem('token')) {
//   // 防止刷新页面后动态路由消失
//   store.AddDynamicRoute();
// }
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
body,
html,
#app {
  width: 100%;
}
</style>