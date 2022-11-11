import router from './index';

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    // 是否有该路径
    if (to.matched.length > 0 || from.path !== '/') {
      next();
    } else {
      // 防止页面刷新
      if (from.path == '/' && to.matched.length <= 0) {
        next(to.path);
      } else {
        next('/404');
      }
    }
  } else {
    // 去登录页
    if (to.path == '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
