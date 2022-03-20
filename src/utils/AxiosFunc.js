import axios from "axios";

function errorAxiosProcess(error) {
  console.error(`${error.response.status} ${error.response.statusText}`, error);
}

async function commonAxios({ method, url, payload, headers, isFile }) {
  const nonBodyMethod = ["get", "delete"];
  const parameterKey = nonBodyMethod.includes(method) ? "params" : "data";
  try {
    const response = await axios({
      method,
      url,
      [parameterKey]: isFile ? payload : { ...payload },
      headers: { ...headers },
    });

    if (response.status !== 200) return Promise.reject(response);
    return response;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

export const defaultAxios = {
  get: (config) => commonAxios({ method: "get", ...config }),
  post: (config) => commonAxios({ method: "post", ...config }),
  put: (config) => commonAxios({ method: "put", ...config }),
  delete: (config) => commonAxios({ method: "delete", ...config }),
};
