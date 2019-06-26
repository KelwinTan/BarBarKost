import axios from "axios";
export const GetKost = () => {
  return axios
    .get("/api/KostData")
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

