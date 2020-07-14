<template>
  <div id="app">
    <div>
      <Navbar v-on:logout="logout" />
    </div>
    <div class="container">
      <router-view v-on:load-user="loaduser" v-on:authenticate="authenticate" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";
export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    async loaduser() {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get("http://localhost:3333/auth");
        this.user = res.data.data.user[0];
        this.$router.push("/products");
      } catch (err) {
        console.error(err);
      }
    },
    async authenticate() {
      if (!this.user) {
        this.$router.push("/login");
      }
    },
    async logout() {
      await localStorage.removeItem("token");
      this.user = null;
      this.$router.push("/");
    }
  }
};
</script>
