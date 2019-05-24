import axios from "axios";

export const getGuestData = admin => {
  return axios
    .post(
      "api/GetGuest",
      {
        email: admin.email
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log("Hello WEH");
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = user => {
  return axios.post(
    "api/login",
    {
      email: user.email,
      password: user.password,
      rememberMe: user.remember_token
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};
