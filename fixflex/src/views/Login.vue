<template>
  <div class="background-container">
    <img src="@/assets/back.png" alt="" class="bg-img" />
    <div class="flex-container">
      <div id="login" class="login-box">
        <h1>Prijavi se</h1>
        <form>
          <div id="user" class="user-box">
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
            <label>Email address</label>
          </div>
          <div id="user" class="user-box">
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <label>Password</label>
          </div>
          <div class="row1">
            <div class="col-sm-8">
              Nemate račun?
              <a href="/signup" style="text-decoration: underline"
                >Registrirajte se</a
              >
            </div>
            <div class="col-sm-4">
              <button
                id="btn"
                type="button"
                class="btn btn-primary"
                @click="login()"
              >
                Prijava
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { firebase } from "@/firebase.js";
import store from "@/store";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  }, // zarez pazi izmedu atributa uvjek zarez
  methods: {
    login() {
      console.log("login.." + this.username);
      console.log(this.$router);
      // let x = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((result) => {
          console.log("uspiješna prijave", result);
          alert("Uspiješna prijava!  " + this.username);

          //nakon sto je uspjesna prijava moramo se prebacit na home
          this.$router.replace({ name: "home" });

          // this.$router.replace({ name: "home" }); //.push pusha nas na novu stranicu pa kad idemo back vracam se na login sto nema smisla, zato koristimo replace
        })
        .catch(function (error) {
          console.log("greska ", error);
          alert("Krivi podaci!");
        });
    },
  },
};
</script>

<style scoped>
.background-container {
  background-image: url("@/assets/back.png") !important;
}

.h1 {
  text-align: top;
}

* {
  margin: 0;
  padding: 0;
}

div.col-sm-8 {
  margin: auto;
}
div.col-sm-4 {
  margin: auto;
}
div.flex-container {
  margin-top: 100px;
}
div {
  color: white;
}

input {
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 3px;
  background-color: #383838;
  padding: 5px;
}
div.row1 {
  flex-wrap: nowrap;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
}
img.bg-img {
  top: 0;
  left: 0;
  width: 1920px;
  position: fixed;
  z-index: -1;
  filter: blur(8px);
}
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
div.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 0;
  font-size: 18px;
  color: #fff;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #191b1c;
  box-sizing: border-box;
  box-shadow: 0px 40px 25px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
}

div.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
div.user-box {
  position: relative;
}

div.user-box input {
  padding: 15px 0;
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  margin-bottom: 45px;
  border-radius: none;
  border: none;
  background: transparent;
  text-decoration: none;
  border-bottom: 2px dashed #35aafd;
  color: #fff;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  color: #35aafd;
  font-size: 15px;
}

#btn {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 3px;
  border: 1px solid #35aafd;
  border-radius: 10px;
  float: right;
  background-color: transparent;
  &:hover {
    background: #35aafd;
    color: black;
    border-radius: 5px;
  }
}

div.login-box a span {
  position: absolute;
  display: block;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #35aafd !important;
}

@media only screen and (max-width: 600px) {
  .login-box {
    width: 100%;
    border-radius: 0px;
  }

  div.flex-container {
    margin-top: 0px;
  }
}
</style>
