import { statusesData, statusesIds } from "../../data/localStatuses";
import { datetimeQueries } from "../datetime";

const statuses =
  (countryId: string, postalCodeId: string, beachId: string) =>
  (): Status[] => {
    console.log("Running statuses in Sandbox Mode.");
    return statusesIds.reduce((statusList, statusId) => {
      const statusData = statusesData[statusId];
      if (
        statusData &&
        statusData.countryId === countryId &&
        statusData.postalCodeId === postalCodeId &&
        statusData.beachId === beachId
      ) {
        statusList.push({
          ...statusData,
          createDateTime: datetimeQueries.datetime(statusData.createTimestamp),
          confirmDateTime: datetimeQueries.datetimeOptional(
            statusData.confirmTimestamp
          ),
        });
      }
      return statusList;
    }, [] as Status[]);
  };

const status =
  (countryId: string, postalCodeId: string, beachId: string) =>
  ({ id }: GraphqlQueryId): Status => {
    console.log("Running status in Sandbox Mode.");
    const statusData = statusesData[id];
    if (
      statusData &&
      statusData.countryId === countryId &&
      statusData.postalCodeId === postalCodeId &&
      statusData.beachId === beachId
    ) {
      return {
        ...statusData,
        createDateTime: datetimeQueries.datetime(statusData.createTimestamp),
        confirmDateTime: datetimeQueries.datetimeOptional(
          statusData.confirmTimestamp
        ),
      };
    } else {
      throw new ReferenceError(`No status exists with id=${id}`);
    }
  };

export const queries = {
  statuses,
  status,
};
