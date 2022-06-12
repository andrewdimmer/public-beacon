import { statusMutations, statusQueries } from "../statuses";

const createBeach = ({
  input,
}: GraphqlMutationInput<CreateBeachInput>): Beach => {
  console.log("Running createBeach in Sandbox Mode.");
  const id = input.name.replace(/[^a-zA-Z0-9]/g, "");
  const initialStatusOption = input.status;
  const initialStatus = initialStatusOption
    ? statusMutations.createStatus({
        input: {
          ...input,
          beachId: id,
          status: initialStatusOption,
          notes: input.statusNotes,
        },
      })
    : undefined;

  return {
    id,
    ...input,
    mostRecentStatusId: initialStatus ? initialStatus.id : undefined,
    mostRecentStatus: initialStatus ? () => initialStatus : undefined,
    statuses: statusQueries.statuses(input.countryId, input.postalCodeId, id),
    status: statusQueries.status(input.countryId, input.postalCodeId, id),
  };
};

export const mutations = {
  createBeach,
};
