import React, { useState } from "react";
import Loading from "../../components/loading";
import { updateCompany } from "../../api";
import { useRecoilValue } from "recoil";
import { selectedCompanySelector } from "../../state/selectors";
import { useParams, Redirect } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import Company from "./company";


export default () => {
  const selectedCompany = useRecoilValue(selectedCompanySelector);

  if (!selectedCompany) {
    return <Redirect to="/companies" />;
  }

  const { id } = useParams();
  const [company, setCompany] = useState(selectedCompany);

  const { loading, action: update } = useApi({
    invoke: (token) => updateCompany(token, { id, ...company }),
    notifyMessage: `${company.name} updated successfully.`,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Company
      company={company}
      setCompany={setCompany}
      submit={{ action: update, label: "Update" }}
    />
  );
};
