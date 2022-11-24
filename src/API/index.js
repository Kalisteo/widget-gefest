import axios from 'axios'

const BASE_URL = "http://5.53.126.12/api/widget"

const formData = new FormData()
formData.append('phone', "+79015557320")

export const postData = async () => {
  return await axios.post(`${BASE_URL}/auth/getCode`, formData, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "multipart/form-data",
    }
  })
    .then((responce) => {
      console.log(responce)
    })

    .catch((e) => {
      console.log(e)
    })
}




