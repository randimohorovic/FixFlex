<template>
  <!-- cards -->
  <div class="row">
    <div class="col-3">filtri/linkovi</div>
    <div class="col-7">
      <!--  pozivas komponentu listin job  -->
      <Listing-Job v-for="x in listing" :key="x" :info="x" />
      <!-- x element u data- jobs:, key: "x"pozivas vrijednost x el.   -->
    </div>
    <div class="col-2">empty - blok {{ lista }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
//
import ListingJob from "@/components/Listing.vue";

let listing = [];

listing = [
  "https://picsum.photos/id/1/400/400",
  "https://picsum.photos/id/2/400/400",
  "https://picsum.photos/id/3/400/400",
];

export default {
  name: "HomeView",
  data: function () {
    return {
      // kljuc : vrijednost
      // lista : [1,2,3,"four"], // zelim imat podatke koji ce rec koji su dostupni poslovi
      listing: listing,
    };
  },
  components: {
    ListingJob,
  },
};
</script>
