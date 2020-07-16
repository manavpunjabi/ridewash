<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
    <router-link class="navbar-brand" to="/">RideWash</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto" v-if="isLoggedIn">
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link">Welcome {{user.name}}</span>
        </li>
        <li class="nav-item">
          <a v-on:click="logout" class="nav-link">Logout</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto" v-else>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ["user", "isLoggedIn"],
  methods: {
    logout() {
      this.$emit("logout");
    }
  }
};
</script>
