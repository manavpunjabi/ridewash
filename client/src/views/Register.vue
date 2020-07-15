<template>
  <div class="text-center">
    <form @submit="register" class="form-signin">
      <h1 class="h3 mb-5 font-weight-normal">Register</h1>
      <label for="inputName" class="sr-only">Name</label>
      <input
        type="text"
        required
        class="form-control"
        id="inputName"
        v-model="name"
        placeholder="Name"
      />
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        type="email"
        required
        class="form-control mt-3"
        id="inputEmail"
        v-model="email"
        placeholder="Email"
      />
      <label for="inputMobile" class="sr-only">Mobile Number</label>
      <input
        type="number"
        minlength="10"
        maxlength="10"
        id="inputMobile"
        class="form-control mt-3"
        v-model="mobile"
        placeholder="Mobile number"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mt-3"
        v-model="password"
        placeholder="Password"
        required
      />
      <button class="btn mt-3 btn-lg btn-primary btn-block" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import ridewash from "../apis/ridewash";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      mobile: "",
      password: ""
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify({
        name: this.name,
        email: this.email,
        mobile: this.mobile,
        password: this.password
      });

      try {
        const res = await ridewash.post("/auth/register", body, config);
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
