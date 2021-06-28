import Axios from "axios";

export const userLogin = (userName: string, password: string) => {
  Axios.post("/user/login", {
    userName: userName,
    password: password,
  }).then((result) => {
    console.log(result);
    
  });
};
