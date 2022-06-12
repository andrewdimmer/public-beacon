import statusesDAO from "../../database/statusesDAO";
import { datetimeQueries } from "../datetime";

const statuses =
  (countryId: string, postalCodeId: string, beachId: string) =>
  (): Status[] => {
    console.log("Running statuses in Sandbox Mode.");
    const localStatusesData = statusesDAO.list(
      countryId,
      postalCodeId,
      beachId
    );
    return localStatusesData.map((statusData) => {
      return {
        ...statusData,
        createDateTime: datetimeQueries.datetime(statusData.createTimestamp),
        confirmDateTime: datetimeQueries.datetimeOptional(
          statusData.confirmTimestamp
        ),
      };
    });
  };

const status =
  (countryId: string, postalCodeId: string, beachId: string) =>
  ({ id }: GraphqlQueryId): Status => {
    console.log("Running status in Sandbox Mode.");
    const statusData = statusesDAO.get(countryId, postalCodeId, beachId, id);
    return {
      ...statusData,
      createDateTime: datetimeQueries.datetime(statusData.createTimestamp),
      confirmDateTime: datetimeQueries.datetimeOptional(
        statusData.confirmTimestamp
      ),
    };
  };

export const queries = {
  statuses,
  status,
};
