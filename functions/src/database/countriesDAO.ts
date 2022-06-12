import { countriesData, countriesIds } from "../data/localCountries";
import {
  resourceAlreadyExistsError,
  resourceDoesNotExistsError,
} from "../utils/errorHandlingUtils";
import { insertObjectAndIndex } from "./internalFunctions";

const objectType = "country";

const exists = (countryId: string): boolean => {
  return !!countriesData[countryId];
};

const confirmExists = (countryId: string): void => {
  if (!exists(countryId)) {
    resourceDoesNotExistsError(objectType, countryId);
  }
};

const confirmDoesNotExist = (countryId: string): void => {
  if (exists(countryId)) {
    resourceAlreadyExistsError(objectType, countryId);
  }
};

const generateId = (name: string): string => {
  return name.replace(/[^a-zA-Z]/g, "");
};

const list = (): CountryData[] => {
  return countriesIds.reduce((localCountriesData, countryId) => {
    const countryData = countriesData[countryId];
    if (countryData) {
      localCountriesData.push(countryData);
    }
    return localCountriesData;
  }, [] as CountryData[]);
};

const get = (countryId: string): CountryData => {
  confirmExists(countryId);

  // Note: Need to force the type becuase the type system does not exist throw and error on null.
  return countriesData[countryId] as CountryData;
};

const create = (input: CreateCountryInput): CountryData => {
  const id = generateId(input.name);

  confirmDoesNotExist(id);

  const countryData: CountryData = {
    id,
    ...input,
  };

  insertObjectAndIndex(countryData, countriesIds, countriesData);

  return countryData;
};

export default {
  confirmDoesNotExist,
  confirmExists,
  list,
  get,
  create,
};
