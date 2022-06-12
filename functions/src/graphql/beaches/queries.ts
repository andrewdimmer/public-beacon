const beachesIds = ["Beach1", "Beach2", "Beach3", "Beach4", "Beach5"];

const beachesData: { [key: string]: Beach | null } = {
  Beach1: {
    id: "Beach1",
    countryId: "Canada",
    postalCodeId: "123",
    name: "Beach 1",
    address1: "Beach 1 Address",
    city: "City 1",
    region: "Region 1",
  },
  Beach2: {
    id: "Beach2",
    countryId: "UnitedStates",
    postalCodeId: "789",
    name: "Beach 2",
    address1: "Beach 2 Address",
    address2: "Beach 2 Address 2",
    city: "City 2",
    region: "Region 2",
  },
  Beach3: {
    id: "Beach3",
    countryId: "UnitedStates",
    postalCodeId: "789",
    name: "Beach 3",
    address1: "Beach 3 Address",
    city: "City 3",
    region: "Region 3",
  },
  Beach4: {
    id: "Beach4",
    countryId: "UnitedStates",
    postalCodeId: "789",
    name: "Beach 4",
    address1: "Beach 4 Address",
    city: "City 4",
  },
  Beach5: {
    id: "Beach5",
    countryId: "UnitedStates",
    postalCodeId: "789",
    name: "Beach 5",
    address1: "Beach 5 Address",
    region: "Region 5",
  },
};

const beaches = (countryId: string, postalCodeId: string) => (): Beach[] => {
  console.log("Running beaches in Sandbox Mode.");
  return beachesIds.reduce((beachList, beachId) => {
    const beachData = beachesData[beachId];
    if (
      beachData &&
      beachData.countryId === countryId &&
      beachData.postalCodeId === postalCodeId
    ) {
      beachList.push(beachData);
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
      return beachData;
    } else {
      throw new ReferenceError(`No beach exists with id=${id}`);
    }
  };

export const queries = {
  beaches,
  beach,
};
