import React, { useState } from "react";
import Loading from "../../components/loading";
import { createCompany } from "../../api";
import { useApi } from "../../hooks/useApi";
import Company from "./company";

export default () => {
  const [company, setCompany] = useState({
    name: "",
    ticker: "",
    isin: "",
    website: "",
  });

  const { loading, action: create } = useApi({
    invoke: (token) => createCompany(token, company),
    notifyMessage: `${company.name} created successfully.`,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Company
      {...{
        company,
        setCompany,
        submit: { label: "Create", action: create },
      }}
    />
  );
};
