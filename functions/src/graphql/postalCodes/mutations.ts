import { beachQueries } from "../beaches";

const createPostalCode = ({
  input,
}: GraphqlMutationInput<CreatePostalCodeInput>): PostalCode => {
  console.log("Running createPostalCode in Sandbox Mode.");
  return {
    id: input.postalCode,
    countryId: input.countryId,
    postalCode: input.postalCode,
    beaches: beachQueries.beaches(input.countryId, input.postalCode),
    beach: beachQueries.beach(input.countryId, input.postalCode),
  };
};

export const mutations = {
  createPostalCode,
};
