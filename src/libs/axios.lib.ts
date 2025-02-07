import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BHUT_TEST_API,
  withCredentials: true,
});

export const api = instance;
