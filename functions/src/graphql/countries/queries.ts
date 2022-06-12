import countriesDAO from "../../database/countriesDAO";
import { postalCodeQueries } from "../postalCodes";

const countries = (): Country[] => {
  console.log("Running countries in Sandbox Mode.");
  const localCountriesData = countriesDAO.list();
  return localCountriesData.map((countryData) => {
    return {
      ...countryData,
      postalCodes: postalCodeQueries.postalCodes(countryData.id),
      postalCode: postalCodeQueries.postalCode(countryData.id),
    };
  });
};

const country = ({ id }: GraphqlQueryId): Country => {
  console.log("Running country in Sandbox Mode.");
  return {
    ...countriesDAO.get(id),
    postalCodes: postalCodeQueries.postalCodes(id),
    postalCode: postalCodeQueries.postalCode(id),
  };
};

export const queries = {
  countries,
  country,
};
