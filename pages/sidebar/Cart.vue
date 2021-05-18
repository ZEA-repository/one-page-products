<template>
  <section>
    <div
      v-for="product in CART"
      :key="product.id"
    >
      {{ product.name }}
    </div> 
  </section>
</template>

<script>
export default {
  computed: {
    CART() {
      return this.$store.getters['cart/CART']
    }
  }
}
</script>
