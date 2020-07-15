<template>
  <div class="text-center">
    <form @submit="addNewProduct" class="form-signin">
      <h1 class="h3 mb-5 font-weight-normal">Add New Product</h1>
      <label for="inputName" class="sr-only">Name</label>
      <input
        type="text"
        required
        class="form-control"
        id="inputName"
        v-model="name"
        placeholder="Name"
      />
      <label for="inputEmail" class="sr-only">Price</label>
      <input
        type="number"
        required
        class="form-control mt-3"
        id="inputPrice"
        v-model="price"
        placeholder="Price"
      />
      <label for="inputMobile" class="sr-only">Image</label>
      <input
        type="url"
        id="inputImage"
        class="form-control mt-3"
        v-model="image"
        placeholder="Image URL"
        required
      />
      <label for="inputPassword" class="sr-only">Code</label>
      <input
        type="number"
        id="inputCode"
        class="form-control mt-3"
        v-model="code"
        placeholder="Product Code"
        required
      />
      <button class="btn mt-3 btn-lg btn-primary btn-block" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddNewProduct",
  data() {
    return {
      name: "",
      image: "",
      price: "",
      code: ""
    };
  },
  methods: {
    async addNewProduct(e) {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify({
        name: this.name,
        price: this.price,
        image: this.image,
        code: this.code
      });
      try {
        const res = await axios.post(
          "http://localhost:3333/product",
          body,
          config
        );

        this.$emit("addProduct", res.data.data.product);
        this.$router.push("/products");
      } catch (err) {
        console.error(err);
      }
    }
  },
  created() {
    this.$emit("authenticate");
  }
};
</script>
