const createBeach = ({
  input,
}: GraphqlMutationInput<CreateBeachInput>): Beach => {
  console.log("Running createBeach in Sandbox Mode.");
  const id = input.name.replace(/[^a-zA-Z0-9]/g, "");
  return {
    id,
    ...input,
  };
};

export const mutations = {
  createBeach,
};
