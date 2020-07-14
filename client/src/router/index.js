import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Products from "../views/Products.vue";
import AddNewProduct from "../views/AddNewProduct";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/products",
    name: "Products",
    component: Products
  },
  {
    path: "/products/add",
    name: "AddNewProduct",
    component: AddNewProduct
  }
];

const router = new VueRouter({
  routes
});

export default router;
