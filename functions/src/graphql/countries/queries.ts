import { countriesData, countryIds } from "../../data/localCountries";
import { postalCodeQueries } from "../postalCodes";

const countries = (): Country[] => {
  console.log("Running countries in Sandbox Mode.");
  return countryIds.reduce((countriesList, countryId) => {
    const countryData = countriesData[countryId];
    if (countryData) {
      countriesList.push({
        ...countryData,
        postalCodes: postalCodeQueries.postalCodes(countryId),
        postalCode: postalCodeQueries.postalCode(countryId),
      });
    }
    return countriesList;
  }, [] as Country[]);
};

const country = ({ id }: GraphqlQueryId): Country => {
  console.log("Running country in Sandbox Mode.");
  const countryData = countriesData[id];
  if (countryData) {
    return {
      ...countryData,
      postalCodes: postalCodeQueries.postalCodes(id),
      postalCode: postalCodeQueries.postalCode(id),
    };
  } else {
    throw new ReferenceError(`No country exists with id=${id}`);
  }
};

export const queries = {
  countries,
  country,
};
