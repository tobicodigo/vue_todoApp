import { CapacitorHttp } from "@capacitor/core";
import store  from "../store/store";

const apiController = {
  url: "https://duetogether.online/api/",
  store:store,
  getTasks: async function (forUser) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "getTasks", user: forUser },
    };


    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    this.store.state.tasks = object;
    const array = object.result;
    return object;
  },

  createUser: async function (newUser) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "createUser", user: newUser },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    return object;
  },

  getSecurityQuestion: async function (forEmail) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "getSecurityQuestion", email: forEmail },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  checkSecurityAnswer: async function (forEmail, forQuestion, forAnswer) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: {
        method: "checkSecurityAnswer",
        email: forEmail,
        question: forQuestion,
        answer: forAnswer,
      },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  updatePassword: async function (forUser) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "updatePassword", user: forUser },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  login: async function (forUser) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "login", user: forUser },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    this.store.state.user = object.user;
    this.getTasks(this.store.state.user)
    return object;
  },

  updateProfile: async function (forUser) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "updateProfile", user: forUser },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  deleteProfile: async function (forUser) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "deleteProfile", user: forUser },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  createTask: async function (forTask) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "createTask", task:forTask },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  updateTask: async function (forTask) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "updateTask", task:forTask },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  deleteTask: async function (forTask) {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "deleteTask",task:forTask },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },
};

export default apiController;
