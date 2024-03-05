<template>
  <!-- cards -->
  <div class="row">
    <div class="col-3">filtri/linkovi</div>
    <div class="col-7">
      <div class="container mt-5 new-post-button">
        <!-- <h2>Nova objava</h2> -->
        <button
          @click="showNewPostDialog"
          type="button"
          class="btn btn-primary"
        >
          Nova objava
        </button>
      </div>

      <!-- Modal for new post -->
      <div
        v-if="showModal"
        class="modal show"
        tabindex="-1"
        role="dialog"
        style="display: block"
      >
        <div class="modal-dialog" role="document">
          <div id="mod" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Nova objava</h5>
              <button type="button" class="close" @click="hideNewPostDialog">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="postNewPost">
                <div class="form-group">
                  <label for="postName"></label>
                  <input
                    v-model="postHeader"
                    type="text"
                    class="form-control"
                    id="postName"
                    placeholder="Upišite naslov"
                  />
                </div>
                <div class="form-group">
                  <label for="postDescription"></label>
                  <input
                    v-model="postDescription"
                    class="form-control"
                    id="postDescription"
                    rows="3"
                    placeholder="Upišite opis"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Objavi</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--  pozivas komponentu listin job  -->
      <Listing-Job
        id="ispis"
        v-for="x in filterListing"
        :key="x.id"
        :info="x"
      />
      <!-- x element u data- jobs:, key: "x"pozivas vrijednost x el. :x to prima javascript taj jednako ako bi bio nesto unique onda.id ili...  -->
    </div>
    <div class="col-2">empty - blok {{ ispis }} {{ store.searchTerm }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
//
import ListingJob from "@/components/Listing.vue";
import store from "@/store";
import { db } from "@/firebase.js";

let blok = ["ispis podatka varijable"];
//prosljeduje info o url ali zelim prosljedit info gdje cu slat jedan objekt po objavi posla

/* listing = [
  {
    header: "Majstor pločica",
    description: "trazi se radnik (isto iz baze podaci)",
    time: "iz baze vrijeme ",
  },
  {
    header: "Majstor žbuke",
    description: "trazi se radnik (isto iz baze podaci)#2",
    time: "iz baze vrijeme ",
  },
  {
    header: "Majstor centralnog grijanja",
    description: "trazi se radnik (isto iz baze podaci)#3",
    time: "iz baze vrijeme ",
  },
  {
    header: "Majstor centralnog grijanja",
    description: "trazi se radnik (isto iz baze podaci)#3",
    time: "iz baze vrijeme ",
  },
  {
    header: "Majstor žbuke",
    description: "trazi se radnik (isto iz baze podaci)#2",
    time: "iz baze vrijeme ",
  },
]; */

export default {
  name: "HomeView",
  data: function () {
    return {
      // kljuc : vrijednost
      // lista : [1,2,3,"four"], // zelim imat podatke koji ce rec koji su dostupni poslovi
      listing: [],
      ispis: blok,
      store: store,
      postHeader: "",
      postDescription: "",
      showModal: false,
    };
  },

  mounted() {
    console.log("mounted");
    //dohvat firebase dokumenta ali iz metode
    this.getposts();
  },

  //navodim kao kljuc: objekt (objekt je ) unutra navodim funkcije koje mi sluze za obradu podataka
  // ili nekakav filter ovih pdatak ue xportu
  methods: {
    getposts() {
      // da prilikom uploada brisanja... mi se osvjeze objave
      console.log("getposts");

      db.collection("posts")
        .orderBy("posted_at", "desc") //poredak
        .get()
        .then((querry) => {
          this.listing = [];
          querry.forEach((doc) => {
            const data = doc.data();

            this.listing.push({
              id: doc.id,
              header: data.header,
              description: data.desc,
              time: data.posted_at,
            });
            console.log("id", doc.id);
          });
        });
    },

    postNewPost() {
      console.log("ok");

      const postHeader = this.postHeader;
      const postDescription = this.postDescription;

      db.collection("posts")
        .add({
          header: postHeader,
          desc: postDescription,
          user: store.currentUser,
          posted_at: Date.now(), //postoji u js bez imprtanja
        })
        .then((doc) => {
          console.log("spremljeno", doc);
          this.postHeader = "";
          this.postDescription = "";
          alert("Uspješna objava");
          this.getposts();
          this.hideNewPostDialog(); // Close the modal after posting
        })
        .catch((e) => {
          console.error(e);
        });
    },
    showNewPostDialog() {
      this.showModal = true;
    },
    hideNewPostDialog() {
      this.showModal = false;
    },
  },
  computed: {
    filterListing() {
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

<style lang="scss">
#postName {
  background-color: #101213;
}

#postDescription {
  background-color: #101213;
}

#ispis {
  background-color: #101213;
  color: #6c757d;
  border-color: #323639;
  border-bottom: 2px solid #0f1011;
}
.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center; /* centiranje horizontalno */
  align-items: center; /* centiranje vertikalno */
}
.modal {
  top: 150px; /* pozicija more down inline with the posts */
  background-color: #191b1c;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 40px 25px rgba(0, 0, 0, 0.8); /* Shadow effect */
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.3s ease, transform 0.3s ease; /* Add transition for opacity and transform */
  opacity: 0; /* Initially hide the modal */
  transform: translateY(-50px); /* Move the modal up initially */
}
.modal.show {
  opacity: 1; /* Show the modal */
  transform: translateY(0); /* Move the modal down */
}
.modal h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff; /* Text color for my input in modal */
  text-align: center;
}
.modal .form-group {
  position: relative;
  margin-bottom: 45px;
}
.modal input {
  padding: 15px 0;
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  border: none;
  background: transparent;
  text-decoration: none;
  border-bottom: 3px dashed #35aafd; /* Bottom border color for input might change ? */
  color: #35aafd; /* Text color */
}
.modal input:focus ~ label,
.modal input:valid ~ label {
  top: -20px;
  color: #35aafd;
  font-size: 15px;
}

.modal.show {
  opacity: 1;
}
.modal label {
  position: absolute;
  /* top: 0; */
  left: 0;
  padding: -5px 0;
  font-size: 18px;
  color: #35aafd;
  pointer-events: none; /* Disable pointer events for the label */
  transition: top 0.3s, font-size 0.3s; /* Add transition for smooth animation */
}
.modal button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #35aafd;
  background-color: #101213 !important;
  font-size: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 3px;
  border: 1px solid #35aafd;
  border-radius: 10px;
  float: right;
  background-color: transparent;
}
.modal button:hover {
  background: #35aafd !important; /* Button background color on hoverr i think */
  color: #000; /* Text color on hover for the change */
  border-radius: 5px;
}
.modal a {
  color: #35aafd; /* Link color needs better integration */
  text-decoration: underline;
}
.modal a:hover {
  text-decoration: none;
}
.modal .row1 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.modal .row1 .col-sm-8 {
  margin: auto; /* Center horizontally */
}

/* nova objava button  */
.new-post-button {
  margin-bottom: 20px; /* Add margin at the bottom to separate it from the posts */
}

.new-post-button button {
  background-color: #35aafd; /* Button background color */
  color: #fff; /* Text color */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer; /* kursor stil might change it */
}

.new-post-button button:hover {
  background-color: #1e90ff;
}
#mod {
  background-color: #191b1c;
  color: #1e90ff;
}
</style>
#101213
