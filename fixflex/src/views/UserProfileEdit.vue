<template>
  <div>
    <h2>Edit Profile</h2>
    <form @submit.prevent="updateUsername">
      <input v-model="username" placeholder="Enter your username" />
      <button type="submit">Save Username</button>
    </form>
  </div>
</template>

<script>
import { db } from "@/firebase.js";
import { firebase } from "@/firebase.js";
import "firebase/auth";

export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    updateUsername() {
      const user = firebase.auth().currentUser;
      if (user) {
        const userProfileRef = db.collection("userProfiles").doc(user.uid);

        userProfileRef
          .set(
            {
              username: this.username,
            },
            { merge: true }
          )
          .then(() => {
            console.log("Username updated successfully!");
            alert("Username updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating username: ", error);
          });
      } else {
        console.log("No user signed in.");
      }
    },
  },
};
</script>
<style scoped>
#edit {
}

h2 {
  color: #35aafd;
  text-align: center;
  margin-bottom: 20px;
}

div {
  background-color: #191b1c;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 40px 25px rgba(0, 0, 0, 0.8);
  max-width: 500px;
  margin: 40px auto;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #101213;
  border: 1px solid #323639;
  border-radius: 5px;
  color: #6c757d;
  font-size: 16px;
}

button {
  width: 100%;
  background-color: #35aafd;
  border: none;
  padding: 10px 0;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1e90ff;

background-color: #2e3234;
</style>
