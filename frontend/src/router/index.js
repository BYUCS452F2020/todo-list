import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Signup from "../views/Signup";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // If data isn't yet defined because of vue life cycle's, then request the user's data and wait until response.
  if(router.app.$data === undefined){
    try {
      let res = await router.app.$axios.get('/api/user');
      router.app.$emit('logged-in', res.data);
    } catch (e) {
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }

  if(to.name === 'Login'){
    // If we are trying to log in and we aren't logged in then send them to the login page. Else just send them to home,
    // because they are already logged in.
    if(!router.app.isAuthenticated){
      return next();
    }

    return next('/');
  }

  // Else direct to route. This gets executed if the user is logged in and isn't trying to hit the /login page.
  return next();
});

export default router
