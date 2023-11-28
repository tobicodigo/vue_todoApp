import { CapacitorHttp } from "@capacitor/core";

const apiController = {
  url: "https://lasalle.tob-apps.com/todoApp/api",

  getTasks: async function () {
    const options = {
      url: this.url,
      method: "GET",
      headers: {
        Accept: "*",
      },
    };

    const response = await CapacitorHttp.request({ ...options });
    const object = JSON.parse(response.data);
    console.log(response);
    const array = object.result;
    return object;
  },
};

export default apiController;
