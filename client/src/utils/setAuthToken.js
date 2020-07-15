import ridewash from "../apis/ridewash";

const setAuthToken = token => {
  if (token) {
    ridewash.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete ridewash.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
