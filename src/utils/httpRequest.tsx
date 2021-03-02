import axios from "axios";
import { clearLocalStorage, getLocalStorageItem } from "../services/StorageService";
import { ROOT_VERSION_DEVCORE } from "../utils/appConfig";

axios.interceptors.response.use(
  async function(response) {
    return response;
  },
  function(error) {
    if (error && error.response) {
      if (error.response.status === 401) {
        
        clearLocalStorage();
        window.location.assign("/");
      }
    }
    return Promise.reject(error);
  }
);
export function doLoginPost(config) {
  if (config) {
    return axios({
      url: `${ROOT_VERSION_DEVCORE}` + config.url,
      method: "POST",
      data: config.data,
      headers: {'Content-Type': 'application/json' , Accept:'application/json'}
    });
  }
}
export function doActionGetDevCore(config) {
  const getToken = JSON.parse(localStorage.getItem("useridmgmt") as any);
  if (config) {
    return axios({
      url: `${ROOT_VERSION_DEVCORE}/` + config.url,
      method: "GET",
      headers: {
        "X-API-KEY": "Bearer " + (getToken ? getToken.token : "")
      }
    });
  }
}
export function doActionDevCore(config, method) {
  const getToken = JSON.parse(getLocalStorageItem("user") as any);
  if (config) {
    return axios({
      url: `${ROOT_VERSION_DEVCORE}` + config.url,
      method: method,
      data: config.data,
      headers: {
        //'Content-type': 'application/json',
        "X-API-KEY": getToken ? getToken.data.token : ""
      }
    });
  }
}

export function doActiongetDevCore(config) {
  return doActionDevCore(config, "GET");
}

export function doActionPostDevCore(config) {
  return doActionDevCore(config, "POST");
}

export function doActionPatchDevCore(config) {
  return doActionDevCore(config, "PATCH");
}

export function doActionPutDevCore(config) {
  return doActionDevCore(config, "PUT");
}

export function doActionDelDevCore(config){
  return doActionDevCore(config, "DELETE");
}


export function doLoginGet(config) {
  if (config) {
    return axios({
      url: `${ROOT_VERSION_DEVCORE}/` + config.url,
      method: "GET",
      data: config.data,
      headers: {'ApiKey': 'gAYOBrUgY5BzJazGtL'}
    });
  }
}