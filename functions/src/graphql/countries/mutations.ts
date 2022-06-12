const createCountry = ({
  input,
}: GraphqlMutationInput<CreateCountryInput>): Country => {
  return {
    // Remove all non-alphabetical character
    id: input.name.replace(/[^a-zA-Z]/g, ""),
    name: input.name,
  };
};

export const mutations = {
  createCountry,
};