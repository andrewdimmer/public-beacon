import { datetimeQueries } from "../datetime";

const statusesIds = ["Status1", "Status2", "Status3", "Status4", "Status5"];

const statusesData: { [key: string]: StatusData | null } = {
  Status1: {
    id: "Status1",
    createTimestamp: 1655025075831,
    countryId: "Canada",
    postalCodeId: "123",
    beachId: "Beach1",
    status: "NOTICE",
    notes: "No lifeguard on duty.",
  },
  Status2: {
    id: "Status2",
    createTimestamp: 1655025089270,
    countryId: "UnitedStates",
    postalCodeId: "789",
    beachId: "Beach2",
    status: "OPEN",
  },
  Status3: {
    id: "Status3",
    createTimestamp: 1655025239382,
    confirmTimestamp: 1655025322006,
    countryId: "UnitedStates",
    postalCodeId: "789",
    beachId: "Beach3",
    status: "CLOSED",
    notes: "Blahaj sighted!",
  },
  Status4: {
    id: "Status4",
    createTimestamp: 1655025338798,
    countryId: "UnitedStates",
    postalCodeId: "789",
    beachId: "Beach3",
    status: "ADVISORY",
    notes: "Blahaj sighted recently. Swim at your own risk.",
  },
  Status5: {
    id: "Status5",
    createTimestamp: 1655025351678,
    confirmTimestamp: 1655025361375,
    countryId: "UnitedStates",
    postalCodeId: "789",
    beachId: "Beach3",
    status: "OPEN",
  },
};

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
