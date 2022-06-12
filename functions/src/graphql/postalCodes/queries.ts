import { postalCodesData, postalCodesIds } from "../../data/localPostalCodes";
import { beachQueries } from "../beaches";

const postalCodes = (countryId: string) => (): PostalCode[] => {
  console.log("Running postalCodes in Sandbox Mode.");
  return postalCodesIds.reduce((postalCodeList, postalCodeId) => {
    const postalCodeData = postalCodesData[postalCodeId];
    if (postalCodeData && postalCodeData.countryId === countryId) {
      postalCodeList.push({
        ...postalCodeData,
        beaches: beachQueries.beaches(
          postalCodeData.countryId,
          postalCodeData.postalCode
        ),
        beach: beachQueries.beach(
          postalCodeData.countryId,
          postalCodeData.postalCode
        ),
      });
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
      return {
        ...postalCodeData,
        beaches: beachQueries.beaches(
          postalCodeData.countryId,
          postalCodeData.postalCode
        ),
        beach: beachQueries.beach(
          postalCodeData.countryId,
          postalCodeData.postalCode
        ),
      };
    } else {
      throw new ReferenceError(`No postal code exists with id=${id}`);
    }
  };

export const queries = {
  postalCodes,
  postalCode,
};
