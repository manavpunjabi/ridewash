<template>
  <div id="app">
    <div>
      <Navbar v-on:logout="logout" v-bind:user="user" v-bind:isLoggedIn="isLoggedIn" />
    </div>
    <div class="container">
      <router-view v-on:load-user="loaduser" v-on:authenticate="authenticate" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";
import ridewash from "./apis/ridewash";
export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return {
      user: null,
      isLoggedIn: false
    };
  },
  methods: {
    async loaduser() {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await ridewash.get("/auth");
        this.user = res.data.data.user[0];
        this.isLoggedIn = true;
        this.$router.push("/products");
      } catch (err) {
        console.error(err);
        this.$router.push("/login");
        this.isLoggedIn = false;
      }
    },
    authenticate() {
      if (this.user === null) {
        this.$router.push("/login");
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.isLoggedIn = false;
      this.$router.push("/");
    }
  }
};
</script>
