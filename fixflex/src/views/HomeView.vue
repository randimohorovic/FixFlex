<template>
  <div class="row">
    <div class="col-3">filtri/linkovi</div>
    <div class="col-7">
      objave
      <!--  pozivas komponentu listin job  -->
      <!-- <Listing-Job v-for="x in listing" :key="x" :info="x" />   x element u data- jobs:, key: "x"pozivas vrijednost x el.    -->
    </div>
    <div class="col-2">empty - blok</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
