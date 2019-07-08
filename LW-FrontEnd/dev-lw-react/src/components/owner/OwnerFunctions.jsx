import axios from "axios";
const axiosKelwin = axios.create({validateStatus:false});

export const GetOwnerKosts = Owner => {
    return axios
      .post(
        "/api/owner-kost",
        {
          owner_id: Owner.owner_id,
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

  export const GetSpecificKost =  (kost_slug, user_id) => {
    return axios
      .post(
        "/api/specific-kost",
        {
          kost_slug: kost_slug,
          user_id: user_id
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

  export const DeleteKost = (kost) => {
    return axios.post("/api/delete-kost",
      {
        kost_slug: kost.slug
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
  }