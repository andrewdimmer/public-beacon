import statusesDAO from "../../database/statusesDAO";
import { datetimeQueries } from "../datetime";

const createStatus = ({
  input,
}: GraphqlMutationInput<CreateStatusInput>): Status => {
  console.log("Running createStatus in Sandbox Mode.");
  const statusData = statusesDAO.create(input);
  return {
    ...statusData,
    createDateTime: datetimeQueries.datetime(statusData.createTimestamp),
    confirmDateTime: datetimeQueries.datetimeOptional(
      statusData.confirmTimestamp
    ),
  };
};

const confirmStatus = ({
  input,
}: GraphqlMutationInput<ConfirmStatusInput>): Status => {
  console.log("Running createStatus in Sandbox Mode.");
  const statusData = statusesDAO.confirm(input);
  return {
    ...statusData,
    createDateTime: datetimeQueries.datetime(statusData.createTimestamp),
    confirmDateTime: datetimeQueries.datetimeOptional(
      statusData.confirmTimestamp
    ),
  };
};

export const mutations = {
  createStatus,
  confirmStatus,
};
