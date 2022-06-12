import postalCodeDAO from "../../database/postalCodeDAO";
import { beachQueries } from "../beaches";

const createPostalCode = ({
  input,
}: GraphqlMutationInput<CreatePostalCodeInput>): PostalCode => {
  console.log("Running createPostalCode in Sandbox Mode.");
  const postalCodeData = postalCodeDAO.create(input);
  return {
    ...postalCodeData,
    beaches: beachQueries.beaches(input.countryId, postalCodeData.id),
    beach: beachQueries.beach(input.countryId, postalCodeData.id),
  };
};

export const mutations = {
  createPostalCode,
};
