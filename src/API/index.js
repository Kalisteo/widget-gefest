import axios from 'axios'

const BASE_URL = "http://5.53.126.12/api/widget"


const postData = async (url, body) => {
  const token =  localStorage.getItem("token")
  return await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": token
    }
  })
}

const endpoints = {
  getCode: "/auth/getCode",
  checkCode: "/auth/checkCode",
  user: "/user",
  scan: "/receipts/scan",
  create: "/receipts/create",
}

export {postData, endpoints}




