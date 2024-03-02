<template>
  <!-- cards -->
  <div class="row">
    <div class="col-3">filtri/linkovi</div>
    <div class="col-7">
      <div class="container mt-5">
        <h2>Nova objava</h2>
        <button @click="showNewPostDialog" class="btn btn-primary">
          Nova objava
        </button>
      </div>

      <!-- Modal for new post -->
      <div
        v-if="showModal"
        class="modal"
        tabindex="-1"
        role="dialog"
        style="display: block"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Nova objava</h5>
              <button type="button" class="close" @click="hideNewPostDialog">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="postNewPost">
                <div class="form-group">
                  <label for="postName">Naslov:</label>
                  <input
                    v-model="postHeader"
                    type="text"
                    class="form-control"
                    id="postName"
                    placeholder="Upišite naslov"
                  />
                </div>
                <div class="form-group">
                  <label for="postDescription">Opis:</label>
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
import ListingJob from "@/components/Listing.vue";
import store from "@/store";
import { db } from "@/firebase.js";

export default {
  name: "HomeView",
  data() {
    return {
      listing: [],
      ispis: ["ispis podatka varijable"],
      store: store,
      postHeader: "",
      postDescription: "",
      showModal: false,
    };
  },
  mounted() {
    this.getposts();
  },
  methods: {
    getposts() {
      db.collection("posts")
        .orderBy("posted_at", "desc")
        .get()
        .then((query) => {
          this.listing = [];
          query.forEach((doc) => {
            const data = doc.data();
            this.listing.push({
              id: doc.id,
              header: data.header,
              description: data.desc,
              time: data.posted_at,
            });
          });
        });
    },
    postNewPost() {
      const postHeader = this.postHeader;
      const postDescription = this.postDescription;
      db.collection("posts")
        .add({
          header: postHeader,
          desc: postDescription,
          user: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
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
  border-color: #6c757d;
  border-bottom: 2px solid #6c757d;
}
.modal-background {
  background-color: rgba(0, 0, 0, 0.5); /* Dark semi-transparent background */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.modal {
  background-color: #191b1c; /* Background color similar to the login form */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 40px 25px rgba(0, 0, 0, 0.8); /* Shadow effect */
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
}

.modal h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff; /* Text color */
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
  border-bottom: 2px dashed #35aafd; /* Bottom border color */
  color: #fff; /* Text color */
}

.modal input:focus ~ label,
.modal input:valid ~ label {
  top: -20px;
  color: #35aafd;
  font-size: 15px;
}

.modal label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 0;
  font-size: 18px;
  color: #fff; /* Text color */
}

.modal button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff; /* Text color */
  font-size: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 3px;
  border: 1px solid #35aafd; /* Border color */
  border-radius: 10px;
  float: right;
  background-color: transparent;
}

.modal button:hover {
  background: #35aafd; /* Button background color on hoverr i think */
  color: #000; /* Text color on hover */
  border-radius: 5px;
}

.modal a {
  color: #35aafd; /* Link color */
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
</style>
