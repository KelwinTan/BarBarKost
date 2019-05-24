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
      password: user.password,
      rememberMe: user.remember_token
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const loginOwner = user => {
  return axios.post(
    "api/loginOwner",
    {
      phone: user.phone,
      password: user.password,
      rememberMe: user.rememberMe
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
  return axios
    .post(
      "api/users/update",
      {
        email: user.email,
        updatePassword: user.updatePassword
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updatePhone = user => {
  return axios
    .post(
      "api/users/updatePhone",
      {
        email: user.email,
        updatePhone: user.phone
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
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

export const logoutUser = () => {
  return axios
    .get(`api/logout/${localStorage.getItem("usertoken")}`)
    .then(res => {
      console.log(res);
      localStorage.removeItem("usertoken");
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateUser = user => {
  return axios
    .post("api/users/update", user, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const verifyUser = user => {
  return axios.post(
    "api/verifyUser",
    {
      email: user.email
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const verifyPhone = user => {
  return axios.post(
    "api/verifyPhone",
    {
      phone: user.phone
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const verifyPhoneToken = user => {
  return axios.post(
    "api/verifyPhoneToken",
    {
      token: user.token
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const InsertKost = kost => {
  return axios.post(
    "api/insert-kost",
    {
      name: kost.name,
      description: kost.description,
      prices: kost.prices,
      city: kost.city,
      address: kost.address,
      total_rooms: kost.total_rooms,
      room_left: kost.room_left,
      longitude: kost.longitude,
      latitude: kost.latitude
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const InsertApart = apart => {
  return axios.post(
    "api/insert-apartment",
    {
      name: apart.name,
      description: apart.description,
      prices: apart.prices,
      city: apart.city,
      address: apart.address,
      unit_type: apart.unit_type,
      unit_area: apart.unit_area,
      unit_condition: apart.unit_condition,
      unit_floor: apart.unit_floor,
      unit_facilities: apart.unit_facilities,
      longitude: apart.longitude,
      latitude: apart.latitude
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};
