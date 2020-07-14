<template>
  <div class="card m-2">
    <img
      v-bind:src="product.image"
      v-bind:alt="product.name"
      class="card-img-top"
    />
    <h4 class="card-title">
      <strong>{{ product.name }} </strong>
    </h4>
    <div>
      <h5 class="float-right">₹ {{ product.price }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"]
};
</script>
