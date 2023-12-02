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


  createTask: async function () {
    const options = {
      url: this.url,
      headers: {
        Accept: "*",
      },
      data: { method: 'post' },
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
      data: { method: 'edit' },
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
      data: { method: 'delete' },
    };
  
    const response = await CapacitorHttp.post(options);
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
      data: { method: 'createUser',user:newUser },
    };
  
    const response = await CapacitorHttp.post(options);
    const object = JSON.parse(response.data);
    return object;
  },


};

export default apiController;
