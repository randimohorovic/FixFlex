<template>
  <div class="about">
    <h1>Nemaš račun? Napravi jedan..</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter
   email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Confirm Password</label>
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="button" @click="signup()" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
// treba mi data da spremim podatke registracije i onda kadsubmitam da se pozove
//firebase i spremi na cloud, putem v modela
//import { auth, createUserWithEmailAndPassword } from "@/firebase";
import { firebase } from "@/firebase.js";
export default {
  name: "signup",
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  },
  //objekt gdje radim metode koje pozivam iz html-a
  //treba mi funkcija koja ce slat podatke u firebase na klik i registrirat korisnika
  methods: {
    signup() {
      // alert(this.username); ////////// this.username iz ove komponente da ucita tu
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(function () {
          console.log("uspjesna registracija");
        })
        .catch(function (error) {
          console.error("doslo je do greske", error);
        });
      console.log("nastavak");
    },
  },
};
</script>
