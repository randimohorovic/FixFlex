<template>
  <!-- cards -->
  <div class="row">
    <div class="col-3">filtri/linkovi</div>
    <div class="col-7">
      <!--  pozivas komponentu listin job  -->
      <Listing-Job v-for="x in  filterListing" :key="x.header" :info="x" />
      <!-- x element u data- jobs:, key: "x"pozivas vrijednost x el. :x to prima javascript taj jednako ako bi bio nesto unique onda.id ili...  -->
    </div>
    <div class="col-2">empty - blok {{ ispis }} {{ lista }} {{ store.searchTerm }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
//
import ListingJob from "@/components/Listing.vue";
import store from "@/store";

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
      store: store,
    };
  },
  //navodim kao kljuc: objekt (objekt je ) unutra navodim funkcije koje mi sluze za obradu podataka
              // ili nekakav filter ovih pdatak ue xportu
  computed: {
    filterListing(){
      //logika koja ce filtrirati listings
      // vracam lisitng koja mi zadovoljava store.searchterm, this. (koristim da pristupim data djelu)
      let term = this.store.searchTerm;
      let newListing = [];

      for (let x of this.listing) {
        if (x.description.indexOf(term) >= 0) {
          newListing.push(x);
        }
      }
      return newListing;
    },
  },

  components: {
    ListingJob,
  },
};
</script>
