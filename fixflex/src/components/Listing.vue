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
