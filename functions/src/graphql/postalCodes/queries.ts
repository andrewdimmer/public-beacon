import postalCodeDAO from "../../database/postalCodeDAO";
import { beachQueries } from "../beaches";

const postalCodes = (countryId: string) => (): PostalCode[] => {
  console.log("Running postalCodes in Sandbox Mode.");
  const localPostalCodesData = postalCodeDAO.list(countryId);
  return localPostalCodesData.map((postalCodeData) => {
    return {
      ...postalCodeData,
      beaches: beachQueries.beaches(countryId, postalCodeData.id),
      beach: beachQueries.beach(countryId, postalCodeData.id),
    };
  });
};

const postalCode =
  (countryId: string) =>
  ({ id }: GraphqlQueryId): PostalCode => {
    console.log("Running postalCode in Sandbox Mode.");
    return {
      ...postalCodeDAO.get(countryId, id),
      beaches: beachQueries.beaches(countryId, id),
      beach: beachQueries.beach(countryId, id),
    };
  };

export const queries = {
  postalCodes,
  postalCode,
};
