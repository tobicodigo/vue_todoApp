import { createStore } from "vuex";
import { createI18n } from 'vue-i18n'
import messages from '../language/translations.js'

const i18n = createI18n({
  locale:window.navigator.language,
  fallbackLocale: 'en', 
  messages,
})

const store = createStore({
  state: {
    user: {
      name: String,
      email: String,
    },
    tasks: [
      {
        id: 1,
        title: "Test1",
        description: "This a test description",
        category: 1,
        color: 4,
        startDate: 1700226395,
        endDate: 1700312795,
        assignee: "Cesc",
      },
      {
        id: 2,
        title: "Test2",
        description: "This a test description",
        category: 2,
        color: 0,
        startDate: 1700312795,
        endDate: 1700399195,
        assignee: "Tobi",
      },
      {
        id: 3,
        title: "Test3",
        description: "This a test description",
        category: 3,
        color: 2,
        startDate: 1700312795,
        endDate: 1700399195,
        assignee: "Javier",
      },
      {
        id: 4,
        title: "Test4",
        description: "This a test description",
        category: 4,
        color: 1,
        startDate: 1700312795,
        endDate: 1700485595,
        assignee: "Lluis",
      },
      {
        id: 5,
        title: "Test1",
        description: "This a test description",
        category: 1,
        color: 0,
        startDate: 1700226395,
        endDate: 1700312795,
        assignee: "Cesc",
      },
      {
        id: 6,
        title: "Test2",
        description: "This a test description",
        category: 2,
        color: 1,
        startDate: 1700312795,
        endDate: 1700399195,
        assignee: "Tobi",
      },
      {
        id: 7,
        title: "Test3",
        description: "This a test description",
        category: 3,
        color: 2,
        startDate: 1700312795,
        endDate: 1700399195,
        assignee: "Javier",
      },
      {
        id: 8,
        title: "Test4",
        description: "This a test description",
        category: 4,
        color: 3,
        startDate: 1700312795,
        endDate: 1700485595,
        assignee: "Lluis",
      },
    ],
    categories: [
      i18n.global.t("homework"),
      i18n.global.t("school"),
      i18n.global.t("work"),
      i18n.global.t("family"),
      i18n.global.t("private"),
    ],
    colors: [
     "red",
      "blue",
      "green",
      "orange",
      "purple",
    ],
  },
  mutations: {},
});

export default store;
