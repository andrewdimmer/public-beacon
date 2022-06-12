const postalCodesIds = ["123", "456", "789"];

const postalCodesData: { [key: string]: PostalCode | null } = {
  "123": {
    id: "123",
    countryId: "Canada",
    postalCode: "123",
  },
  "456": {
    id: "456",
    countryId: "UnitedStates",
    postalCode: "456",
  },
  "789": {
    id: "789",
    countryId: "UnitedStates",
    postalCode: "789",
  },
};

const postalCodes = (countryId: string) => (): PostalCode[] => {
  console.log("Running postalCodes in Sandbox Mode.");
  return postalCodesIds.reduce((postalCodeList, postalCodeId) => {
    const postalCodeData = postalCodesData[postalCodeId];
    if (postalCodeData && postalCodeData.countryId === countryId) {
      postalCodeList.push(postalCodeData);
    }
    return postalCodeList;
  }, [] as PostalCode[]);
};

const postalCode =
  (countryId: string) =>
  ({ id }: GraphqlQueryId): PostalCode => {
    console.log("Running postalCode in Sandbox Mode.");
    const postalCodeData = postalCodesData[id];
    if (postalCodeData && postalCodeData.countryId === countryId) {
      return postalCodeData;
    } else {
      throw new ReferenceError(`No postal code exists with id=${id}`);
    }
  };

export const queries = {
  postalCodes,
  postalCode,
};
