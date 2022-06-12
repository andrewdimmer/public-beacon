import beachesDAO from "../../database/beachesDAO";
import { statusQueries } from "../statuses";

const beaches = (countryId: string, postalCodeId: string) => (): Beach[] => {
  console.log("Running beaches in Sandbox Mode.");
  const localBeachesData = beachesDAO.list(countryId, postalCodeId);
  return localBeachesData.map((beachData) => {
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
        beachData.countryId,
        beachData.postalCodeId,
        beachData.id
      ),
      status: statusQueries.status(
        beachData.countryId,
        beachData.postalCodeId,
        beachData.id
      ),
    };
  });
};

const beach =
  (countryId: string, postalCodeId: string) =>
  ({ id }: GraphqlQueryId): Beach => {
    console.log("Running beach in Sandbox Mode.");
    const beachData = beachesDAO.get(countryId, postalCodeId, id);
    return {
      ...beachData,
      mostRecentStatus: beachData.mostRecentStatusId
        ? () =>
            statusQueries.status(
              countryId,
              postalCodeId,
              id
            )({ id: beachData.mostRecentStatusId as string })
        : undefined,
      statuses: statusQueries.statuses(countryId, postalCodeId, id),
      status: statusQueries.status(countryId, postalCodeId, id),
    };
  };

export const queries = {
  beaches,
  beach,
};
