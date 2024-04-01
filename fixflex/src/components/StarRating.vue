<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      @click="rate(star)"
      :class="{ rated: star <= rating }"
    >
      &#9733;
    </span>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: ["initialRating"],
  data() {
    return {
      rating: this.initialRating,
    };
  },
  methods: {
    rate(star) {
      this.rating = star;
      this.$emit("rating-selected", this.rating);
    },
  },
};
</script>

<style scoped>
.star {
  cursor: pointer;
  color: #cccccc;
}

.rated {
  color: #f5c518;
}
</style>
