<template>
  <div class="price-filter">
    <label for="priceRange">Price Range:</label>
    <select v-model="priceRange" @change="applyFilter">
      <option value="">All Prices</option>
      <option value="lt200">Less than $200</option>
      <option value="gt200">More than $200</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "PriceFilter",
  data() {
    return {
      priceRange: "",
    };
  },
  methods: {
    applyFilter() {
      this.$emit("on-filter-change", this.priceRange);
    },
  },
};
</script>
