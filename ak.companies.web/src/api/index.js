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

export const createCompany = async (token, company) => {
  const { data } = await axios.post(
    `${baseUrl}/api/companies`,
    company,
    options(token)
  );

  return data;
};

export const updateCompany = async (
  token,
  { id, name, isin, ticker, website }
) => {
  const { data } = await axios.put(
    `${baseUrl}/api/companies/${id}`,
    { name, isin, ticker, website },
    options(token)
  );

  return data;
};
