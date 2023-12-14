import { createStore } from "vuex";
import { createI18n } from "vue-i18n";
import messages from "../language/translations.js";

const i18n = createI18n({
  locale: window.navigator.language,
  fallbackLocale: "en",
  messages,
});

const store = createStore({
  state: {
    // Initial state for the user object
    user: {
      id: Number,
      name: String,
      email: String,
      question: String,
      answer: String,
      password: String,
      photo: String,
      loggedIn: false,
    },
    startPageVisited: false, // Tracking start page visit status
    devicePlatform: '', // Device platform information
    searchString: '', // Search string used for filtering
    sortDirection: '', // Sorting direction
    filter: {}, // Filtering criteria
    savedFilter: {}, // Saved filter settings
    lastViewType: 'list', // Tracking the last view type (list or card)
    profileRecentlyUpdated: false, // Tracking profile update status
    tasks: [], // Array of tasks (initially empty)

    // Sample tasks data commented out for reference
    /* tasks: [ ... ], */

    // Arrays for types and colors used in the application
    types: [
      i18n.global.t("homework"),
      i18n.global.t("school"),
      i18n.global.t("work"),
      i18n.global.t("family"),
      i18n.global.t("private"),
    ],
    colors: [
      "--yellow",
      "--blue",
      "--green",
      "--brightgreen",
      "--orange",
      "--purple",
      "--pink",
    ],
  },
  mutations: {}, // Mutations can be added here if needed
  actions: {}, // Actions can be added here if needed
});

export default store;
