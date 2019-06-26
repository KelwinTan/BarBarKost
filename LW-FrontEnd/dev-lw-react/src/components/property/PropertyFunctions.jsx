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

export const GetImages = kost_id => {
  return axios
    .post(
      "/api/get-image",
      {
        kost_id: kost_id
      }
    )
    .then(res => {
      //   console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}