import { postalCodeQueries } from "../postalCodes";

const createCountry = ({
  input,
}: GraphqlMutationInput<CreateCountryInput>): Country => {
  console.log("Running createCountry in Sandbox Mode.");
  const id = input.name.replace(/[^a-zA-Z]/g, "");
  return {
    // Remove all non-alphabetical character
    id,
    name: input.name,
    postalCodes: postalCodeQueries.postalCodes(id),
    postalCode: postalCodeQueries.postalCode(id),
  };
};

export const mutations = {
  createCountry,
};
