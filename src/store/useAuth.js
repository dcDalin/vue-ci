import { defineStore } from "pinia";
import axios from "axios";

const ENDPOINT = "http://f1ff-41-80-97-35.ngrok.io";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accountExists: false,
    loggedIn: localStorage.getItem("token") ? true : false,
    user: null,
  }),

  getters: {},

  actions: {
    async login(credentials) {
      await axios.get("sanctum/csrf-cookie");

      const response = (await axios.post("api/login", credentials)).data;

      if (response) {
        const token = `Bearer ${response.token}`;

        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;

        await this.ftechUser();
      }
    },

    accountLogin(credentials) {
      axios
        .post(`${ENDPOINT}/api/account/ValidateAccountNumber`, credentials)
        .then(() => console.log("Success account login"))
        .catch((err) => console.log("Err account login: ", err));
    },

    async logout() {
      const response = (await axios.post("api/logout")).data;

      if (response) {
        localStorage.removeItem("token");

        this.$reset();
      }
    },

    async ftechUser() {
      this.user = (await axios.get("api/me")).data;

      this.loggedIn = true;
    },
  },
});
