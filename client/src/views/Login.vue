<template>
  <div class="text-center">
    <form @submit="login" class="form-signin">
      <h1 class="h3 mb-5 font-weight-normal">Login</h1>
      <label for="inputMobile" class="sr-only">Mobile Number</label>
      <input
        type="number"
        id="inputMobile"
        class="form-control"
        v-model="mobile"
        name="mobile"
        placeholder="Mobile number"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        v-model="password"
        name="password"
        class="form-control mt-3"
        placeholder="Password"
        required
      />
      <button class="btn mt-3 btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import ridewash from "../apis/ridewash";
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      password: ""
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify({
        mobile: this.mobile,
        password: this.password
      });

      try {
        const res = await ridewash.post("/auth/login", body, config);
        localStorage.setItem("token", res.data.data.token);
        this.$emit("load-user");
        this.$router.push("products");
      } catch (err) {
        console.error(err);
      }
    }
  },
  created() {
    this.$emit("load-user");
  }
};
</script>
