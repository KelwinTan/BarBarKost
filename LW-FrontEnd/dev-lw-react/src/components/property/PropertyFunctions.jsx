import axios from "axios";

export const SearchApart = apart => {
  return axios
    .post(
      "api/SearchApartments",
      {
        lat: apart.lat,
        lng: apart.lng
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      //   console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
