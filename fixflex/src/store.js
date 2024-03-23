/* export default {
  searchTerm: "",
  currentUser: "",
  currentUsername: "dsadad",
};
 */

// In your store.js or equivalent file
import { reactive } from "vue";

const store = reactive({
  searchTerm: "",
  currentUser: null, // Consider using null for uninitialized values
  currentUsername: "",
});

export default store;
