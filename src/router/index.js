import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login' // 引入登录组件
import Home from '../components/Home' // 引入首页组件
import Welcome from '../components/Welcome' // 引入欢迎页
import User from '../components/User' // 引入用户页面

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
});

// 路由守卫异常时，添加此代码
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
}

/**
 *  路由守卫
 * 
 * @param to 
 *          要访问的路径
 * @param from
 *          原来的路径
 * @param next 
 *          next() 默认去to的路径
 *          next('/path') 去path路径
 */
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    return next();
  }
  const user = window.sessionStorage.getItem('user');
  if (!user) {
    return next('/login');
  }
  next();
});

export default router
