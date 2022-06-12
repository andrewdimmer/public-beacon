import beachesDAO from "../../database/beachesDAO";
import { statusQueries } from "../statuses";

const createBeach = ({
  input,
}: GraphqlMutationInput<CreateBeachInput>): Beach => {
  console.log("Running createBeach in Sandbox Mode.");
  const beachData = beachesDAO.create(input);
  return {
    ...beachData,
    mostRecentStatus: beachData.mostRecentStatusId
      ? () =>
          statusQueries.status(
            beachData.countryId,
            beachData.postalCodeId,
            beachData.id
          )({ id: beachData.mostRecentStatusId as string })
      : undefined,
    statuses: statusQueries.statuses(
      input.countryId,
      input.postalCodeId,
      beachData.id
    ),
    status: statusQueries.status(
      input.countryId,
      input.postalCodeId,
      beachData.id
    ),
  };
};

export const mutations = {
  createBeach,
};
