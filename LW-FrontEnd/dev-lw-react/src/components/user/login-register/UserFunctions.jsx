import axios from "axios";

export const register = newUser => {
  return axios
    .post("api/register", newUser, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
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
      password: user.password
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const loginOwner = user => {
  return axios.post(
    "api/login",
    {
      phone: user.phone,
      password: user.password
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const getProfile = () => {
  return axios
    .get("api/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("usertoken")}` }
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateProfile = user => {
  return axios.post(
    "api/users/update",
    {
      email: user.email,
      updatePassword: user.updatePassword
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const verifyEmail = () => {
  return axios.get("api/send").catch(err => {
    console.log(err);
  });
};

export const registerOwner = newUser => {
  return axios
    .post("api/registerOwner", newUser, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
