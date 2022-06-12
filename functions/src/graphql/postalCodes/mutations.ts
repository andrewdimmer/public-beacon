const createPostalCode = ({
  input,
}: GraphqlMutationInput<CreatePostalCodeInput>): PostalCode => {
  console.log("Running createPostalCode in Sandbox Mode.");
  return {
    id: input.postalCode,
    countryId: input.countryId,
    postalCode: input.postalCode,
  };
};

export const mutations = {
  createPostalCode,
};
