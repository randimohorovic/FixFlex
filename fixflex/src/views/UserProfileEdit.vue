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
