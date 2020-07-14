<template>
  <div>
    <router-link
      v-on:add-product="addProduct"
      to="/products/add"
      class="btn btn-primary float-right"
      >Add New Product</router-link
    >
    <div class="row">
      <div v-for="product in products" v-bind:key="product.id">
        <div class="card-group">
          <ProductItem v-bind:product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductItem from "./ProductItem";
export default {
  name: "Products",
  components: {
    ProductItem
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    addProduct(product) {
      this.products = [product, ...this.products];
    }
  },
  async created() {
    await this.$emit("authenticate");
    const res = await axios.get("http://localhost:3333/product");
    this.products = res.data.data.products;
  }
};
</script>
