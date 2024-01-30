<template>
  <!-- cards -->
  <div class="row">
    <div class="col-3">filtri/linkovi</div>
    <div class="col-7">
      <!--  pozivas komponentu listin job  -->
      <Listing-Job v-for="x in listing" :key="x" :info="x" />
      <!-- x element u data- jobs:, key: "x"pozivas vrijednost x el. :x to prima javascript taj jednako ako bi bio nesto unique onda.id ili...  -->
    </div>
    <div class="col-2">empty - blok {{ ispis }} {{ lista }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
//
import ListingJob from "@/components/Listing.vue";

let listing = [];
let blok = ["ispis podatka varijable"];
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
      ispis: blok,
    };
  },
  components: {
    ListingJob,
  },
};
</script>
