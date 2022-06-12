import { datetimeQueries } from "../datetime";

const createStatus = ({
  input,
}: GraphqlMutationInput<CreateStatusInput>): Status => {
  console.log("Running createStatus in Sandbox Mode.");
  const id = "DummyId";
  const createTimestamp = Date.now();
  return {
    id,
    createTimestamp,
    ...input,
    createDateTime: datetimeQueries.datetime(createTimestamp),
    confirmDateTime: datetimeQueries.datetimeOptional(),
  };
};

const confirmStatus = ({
  input,
}: GraphqlMutationInput<ConfirmStatusInput>): Status => {
  console.log("Running createStatus in Sandbox Mode.");
  const createTimestamp = Date.now() - 60 * 60 * 1000;
  const confirmTimestamp = Date.now();
  return {
    id: input.statusId,
    createTimestamp,
    confirmTimestamp,
    ...input,
    status: "NOTICE",
    notes: "NOTICE: This is just to test the endpoint is connected.",
    createDateTime: datetimeQueries.datetime(createTimestamp),
    confirmDateTime: datetimeQueries.datetimeOptional(confirmTimestamp),
  };
};

export const mutations = {
  createStatus,
  confirmStatus,
};
