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
//prosljeduje info o url ali zelim prosljedit info gdje cu slat jedan objekt po objavi posla
listing = [
  {header : "Majstor pločica",
   description : "trazi se radnik (isto iz baze podaci)",
   time : "iz baze vrijeme "},
   {header : "Majstor žbuke",
   description : "trazi se radnik (isto iz baze podaci)#2",
   time : "iz baze vrijeme "},
   {header : "Majstor centralnog grijanja",
   description : "trazi se radnik (isto iz baze podaci)#3",
   time : "iz baze vrijeme "},
 
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
