import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";

export const registerUser = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/signup", data);
    setToken(res.data);
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/auth", data);
    setToken(res.data);
  } catch (error) {
    console.log(error);
  }
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};
