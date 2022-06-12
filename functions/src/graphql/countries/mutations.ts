import countriesDAO from "../../database/countriesDAO";
import { postalCodeQueries } from "../postalCodes";

const createCountry = ({
  input,
}: GraphqlMutationInput<CreateCountryInput>): Country => {
  console.log("Running createCountry in Sandbox Mode.");
  const countryData = countriesDAO.create(input);
  return {
    ...countryData,
    postalCodes: postalCodeQueries.postalCodes(countryData.id),
    postalCode: postalCodeQueries.postalCode(countryData.id),
  };
};

export const mutations = {
  createCountry,
};
