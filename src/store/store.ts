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
    searchString : '',
    sortDirection: '',
    filter: {},
    savedFilter: {},
    lastViewType:'list',
    profileRecentlyUpdated:false,
    tasks:[],
    /*
    tasks: [
      {
        id: 0,
        title: "Urgent",
        description: "Salad, Ketchup, Meat",
        type: 1,
        color: 0,
        createdDate: '2023-11-19',
        dueDate: '2023-11-25',
        assignee: "Cesc",
        createdBy:"",
        isDone: false,
      },
      {
        id: 1,
        title: "Test 1",
        description: "This a test description",
        type: 1,
        color: 1,
        createdDate: '2023-11-19',
        dueDate: '2023-11-25',
        assignee: "Cesc",
        isDone: false,
      },
      {
        id: 2,
        title: "Test 2",
        description: "This a test description",
        type: 2,
        color: 2,
        createdDate: '2023-11-19',
        dueDate: '2023-12-01',
        assignee: "Tobi",
        isDone: false,
      },
      {
        id: 3,
        title: "Test 3",
        description: "This a test description",
        type: 3,
        color: 3,
        createdDate: '2023-11-19',
        dueDate: '2023-12-25',
        assignee: "Javier",
        isDone: false,
      },
      {
        id: 4,
        title: "Test 4",
        description: "This a test description",
        type: 4,
        color: 4,
        createdDate: '2023-11-19',
        dueDate: '2023-11-25',
        assignee: "Lluis",
        isDone: false,
      },
      {
        id: 5,
        title: "Test 5",
        description: "This a test description",
        type: 1,
        color: 5,
        createdDate: '2023-11-19',
        dueDate: '2023-12-03',
        assignee: "Cesc",
        isDone: false,
      },
      {
        id: 6,
        title: "Test 6",
        description: "This a test description",
        type: 2,
        color: 6,
        createdDate: '2023-11-19',
        dueDate: '2023-11-30',
        assignee: "Tobi",
        isDone: true,
      },
      {
        id: 7,
        title: "Test 7",
        description: "This a test description",
        type: 3,
        color: 0,
        createdDate: '2023-11-19',
        dueDate: '2023-12-25',
        assignee: "Javier",
        isDone: false,
      },
      {
        id: 8,
        title: "Test 8",
        description: "This a test description",
        type: 4,
        color: 1,
        createdDate: '2023-11-19',
        dueDate: '2023-11-26',
        assignee: "Lluis",
        isDone: false,
      },
    ],
    */

    types: [
      i18n.global.t("homework"),
      i18n.global.t("school"),
      i18n.global.t("work"),
      i18n.global.t("family"),
      i18n.global.t("private"),
    ],
    colors: ["--yellow", "--blue", "--green", "--brightgreen", "--orange", "--purple", "--pink"],
  },
  mutations: {},
  actions: {
  
  }
});

export default store;
