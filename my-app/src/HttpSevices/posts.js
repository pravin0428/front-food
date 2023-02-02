import axios from "axios";

export const getAllPosts = () => {
  return axios.get("http://localhost:3001/posts");
};

export const getPostsDetailsById = (id) => {
  // console.log(id , "******");
  return axios.get(`http://localhost:3001/posts/${id}`);
};

export const postData = (creds) => {
  // console.log(creds)
  return axios.post(`http://localhost:3001/posts`, creds);
};

export const putDataEdit  = async(id , formData) =>{
  let newData = await axios.put(`http://localhost:3001/posts/${id}`, formData)
    return newData
}

export const deletePost = (id) => {
  console.log(id);
  return axios.delete(`http://localhost:3001/posts/${id}`);
};