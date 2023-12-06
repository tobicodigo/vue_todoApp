import { CapacitorHttp } from "@capacitor/core";

const apiController = {
  url: "https://duetogether.online/api/",

  getTasks: async function () {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
    };

    const response = await CapacitorHttp.get(options);
    const object = JSON.parse(response.data);
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
    const array = object.result;
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

  createTask: async function () {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "post" },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  editTask: async function () {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "edit" },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },

  deleteTask: async function () {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: "delete" },
    };

    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    const array = object.result;
    return object;
  },
};

export default apiController;
