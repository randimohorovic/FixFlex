<template>
  <div class="card text-center">
    <div class="card-header left-align">Posted {{ postedFromNow }}</div>
    <div class="card-body">
      <h5 class="card-title left-align">{{ info.header }}</h5>
      <p class="date-posted left-align"></p>
      <p class="card-text left-align">{{ info.description }}</p>
      <p class="posted-by right-align">Posted by: {{ info.username }}</p>
      <p class="posted-by right-align">Rating: {{ averageRating }}</p>
      <p class="posted-by right-align">User email: {{ info.userEmail }}</p>
      <StarRating
        :initialRating="info.rating"
        @rating-selected="handleRatingSelected"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import StarRating from "./StarRating.vue";
export default {
  props: ["info"], // elementi aaraya su nazivi parametra koje vue.js komponenta prima, parametarar "info" uvijek je naziv props
  name: "ListingJob", // nije mi potreban data jer mi info folazi iz vana
  computed: {
    averageRating() {
      if (this.info.ratingsCount) {
        return (this.info.ratingsSum / this.info.ratingsCount).toFixed(1);
      } else {
        return "No ratings yet";
      }
    },
    postedFromNow() {
      return moment(this.info.time).format("DD.MM.YYYY [at] HH:mm");
    },
  },
  components: {
    StarRating,
    // other components
  },
  methods: {
    handleRatingSelected(rating) {
      // Example implementation - adapt based on your app's needs
      this.$emit("update-rating", { postId: this.info.id, rating });
    },
  },
};
</script>
<style scoped lang="scss">
/*

.card-header {
  background-color: #1a1a1a;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
}

.card-body {
  padding: 20px;
}

.card-footer {
  background-color: #1a1a1a;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 10px;
} */

.card {
  background-color: #272727;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  max-width: 600px;
  margin: 0 auto 20px;
  border: 2px solid #0a66a8 !important;
}

.card-header,
.card-footer {
  background-color: #1a1a1a;
  padding: 10px;
}

.card-header {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-footer {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: right;
}

.card-body {
  padding: 20px;
  text-align: left;
}

.card-title {
  font-size: 3rem;
}

.date-posted,
.card-text,
.posted-by {
  font-size: 1rem;
}

.left-align {
  text-align: left;
}

.right-align {
  text-align: right;
}
</style>
