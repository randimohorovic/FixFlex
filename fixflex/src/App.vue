<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <a id="logo" class="navbar-brand" href="/"> FixFlex </a> -->
    <img
      id="logo"
      src="@/assets/logii.png"
      alt="Fixflex"
      class="navbar-logo"
      href="/"
    />

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-if="store.currentUser" class="nav-item">
          <a class="nav-link">
            <router-link to="/">Početna stranica</router-link>
          </a>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <a class="nav-link">
            <router-link to="/login">Prijava</router-link>
          </a>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <a class="nav-link">
            <router-link to="/signup">Registracija</router-link>
          </a>
        </li>
        <li v-if="store.currentUser" class="nav-item">
          <a href="#" @click.prevent="logout()" class="nav-link">Odjava</a>
        </li>
        <!--  <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li> -->
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            v-if="store.currentUser"
          >
            <router-link to="/edit-profile"
              >Dobrodošli {{ store.currentUser }}</router-link
            >
          </a>
        </li>
      </ul>
      <form v-if="store.currentUser" class="form-inline my-2 my-lg-0">
        <input
          v-model="store.searchTerm"
          id="search"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Pretraživanje"
          aria-label="Search"
        />
        <button
          id="button"
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >
          Pretraživanje
        </button>
      </form>
    </div>

    <!-- <router-link to="/">Home</router-link> 
  <router-link to="/signup">Signup</router-link> 
store.searchterm jer u storu imam taj objekt -->
  </nav>

  <router-view />
</template>

<script>
import store from "@/store";
import { firebase } from "@/firebase.js";
import router from "@/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// vmodel radi dai treba kada korisnik trazi da mi se prenese ovdje kao objekt
// tu cu ubacit import  searchterma ali isto tako moram exportat ovu vue komponentu da je mogu koristi u drugim komponentama
console.log(router);

const auth = getAuth();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in with", user.email);
    store.currentUser = user.email;

    store.searchTerm = "";
  } else {
    console.log("user logged out");
    store.currentUser = null;
    store.searchTerm = "";
    if (router.name !== "login") {
      router.push({ name: "login" });
    }
  }
});
/* const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("provjera stanja", user.email);
    store.currentUser = user.email;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    console.log("", "no user");
    store.currentUser = null;
    if (router.name !== "login") {
      router.push({ name: "login" });
      // User is signed out
      // ...
    }
  }
}); */

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          store.currentUser = null;
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: #2e3234;

  min-height: 100vh;
}

#nav {
  padding: 10px;
  background-color: #191b1c !important;

  a {
    font-weight: bold;
    color: #ccc;
    &:hover {
      color: #35aafd;
      text-decoration: none;
    }
    &.router-link-exact-active {
      border-bottom: 2px solid #35aafd;
      color: #35aafd;
    }
  }

  .navbar-toggler {
    &:active {
      border-color: blue;
    }
    background-color: #35aafd;
    border-color: #35aafd;
  }
}
.navbar-logo {
  height: 30px; /* Or any other size */
  width: auto;
  /* Add other styling as needed */
}
#logo {
  &:hover {
    color: #35aafd !important;
  }
}

#search {
  border-color: #35aafd; // search input outline
}

#button {
  color: #35aafd; // "search"
  border-color: #35aafd; // outline buttona
  &:hover {
    background-color: #35aafd !important; //hover button color, obrub mi smeta..
    color: #000000;
  }
  // &:active {
  //     border-color: #cd0000 !important;
  //   }
  // &:focus{
  //   border-color: ;
  // }
}
</style>
