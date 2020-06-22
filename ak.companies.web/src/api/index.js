import axios from "axios";
import { baseUrl } from "./config.json";

const options = (token) => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const getCompanies = async (token) => {
  const { data } = await axios.get(`${baseUrl}/api/companies`, options(token));

  return data;
};
