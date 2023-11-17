import { createStore } from "vuex";

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
        startDate: 1700226395,
        endDate: 1700312795,
        assignee: "Cesc",
      },
      {
        id: 2,
        title: "Test2",
        description: "This a test description",
        category: 2,
        startDate: 1700312795,
        endDate: 1700399195,
        assignee: "Tobi",
      },
      {
        id: 3,
        title: "Test3",
        description: "This a test description",
        category: 3,
        startDate: 1700312795,
        endDate: 1700399195,
        assignee: "Javier",
      },
      {
        id: 4,
        title: "Test4",
        description: "This a test description",
        category: 4,
        startDate: 1700312795,
        endDate: 1700485595,
        assignee: "Lluis",
      },
    ],
    categories: ["homework", "school", "work", "family", "private"],
  },
  mutations: {},
});

export default store;
