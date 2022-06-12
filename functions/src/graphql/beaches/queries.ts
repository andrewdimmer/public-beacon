import { beachesData, beachesIds } from "../../data/localBeaches";
import { statusQueries } from "../statuses";

const beaches = (countryId: string, postalCodeId: string) => (): Beach[] => {
  console.log("Running beaches in Sandbox Mode.");
  return beachesIds.reduce((beachList, beachId) => {
    const beachData = beachesData[beachId];
    if (
      beachData &&
      beachData.countryId === countryId &&
      beachData.postalCodeId === postalCodeId
    ) {
      beachList.push({
        ...beachData,
        mostRecentStatus: beachData.mostRecentStatusId
          ? () =>
              statusQueries.status(
                beachData.countryId,
                beachData.postalCodeId,
                beachId
              )({ id: beachData.mostRecentStatusId as string })
          : undefined,
        statuses: statusQueries.statuses(
          beachData.countryId,
          beachData.postalCodeId,
          beachId
        ),
        status: statusQueries.status(
          beachData.countryId,
          beachData.postalCodeId,
          beachId
        ),
      });
    }
    return beachList;
  }, [] as Beach[]);
};

const beach =
  (countryId: string, postalCodeId: string) =>
  ({ id }: GraphqlQueryId): Beach => {
    console.log("Running beach in Sandbox Mode.");
    const beachData = beachesData[id];
    if (
      beachData &&
      beachData.countryId === countryId &&
      beachData.postalCodeId === postalCodeId
    ) {
      return {
        ...beachData,
        mostRecentStatus: beachData.mostRecentStatusId
          ? () =>
              statusQueries.status(
                beachData.countryId,
                beachData.postalCodeId,
                id
              )({ id: beachData.mostRecentStatusId as string })
          : undefined,
        statuses: statusQueries.statuses(
          beachData.countryId,
          beachData.postalCodeId,
          id
        ),
        status: statusQueries.status(
          beachData.countryId,
          beachData.postalCodeId,
          id
        ),
      };
    } else {
      throw new ReferenceError(`No beach exists with id=${id}`);
    }
  };

export const queries = {
  beaches,
  beach,
};
