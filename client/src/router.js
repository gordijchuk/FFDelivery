import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Products from "./views/Products.vue";
import Delivery from "./views/Delivery.vue";
import Shares from "./views/Shares.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/products/:category",
      name: "Products",
      component: Products,
      props: true
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/delivery",
      name: "Delivery",
      component: Delivery
    },
    {
      path: "/shares",
      name: "Shares",
      component: Shares
    }
  ]
});
