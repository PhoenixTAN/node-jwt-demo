import { useState } from "react";
import { createModel } from "hox";
import Axios from "axios";
import { User } from "@type/index";

// import * as services from "@services/index";

const useUser = () => {
  const [user, setUser] = useState<User>();

  const getUser = (userName: string, password: string) =>
    Axios.post("/user/login", {
      userName: userName,
      password: password,
    })
      .then((result) => {
        console.log(result);
        setUser(result.data.data.userName);
      })
      .catch((err) => {
        console.log(err);
        setUser(undefined);
      });

  return {
    user,
    getUser,
  };
};

export default createModel(useUser);
