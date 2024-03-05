<template>
  <div class="card text-center">
    <div class="card-header">{{ postedFromNow }}</div>
    <div class="card-body p-0"></div>
    <img class="card-img-top" />{{ info.header }}

    <div class="card-footer text-body-secondary">{{ info.description }}</div>
    <br />
    <br />
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["info"], // elementi aaraya su nazivi parametra koje vue.js komponenta prima, parametarar "info" uvijek je naziv props
  name: "ListingJob", // nije mi potreban data jer mi info folazi iz vana
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
};
</script>
<style scoped lang="scss">
.card {
  background-color: #272727;
  color: #fff;
  border-radius: 15px; /* round border as login might square it up  */
  box-shadow: 0px 5px 10px rgb(0, 0, 0, 0.3); /* Shadow effect */
  margin-bottom: 20px; /* margin between each post */
  max-width: 600px; /* Maxxx width for the posts */
  margin: 0 auto 20px; /* Center the posts horizontally and add margin at the bottom */
  border: 2px solid #0a66a8 /* 797063 */ !important; /* Change border color to blue */
}

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
}
</style>
