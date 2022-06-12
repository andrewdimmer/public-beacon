import countriesDAO from "./countriesDAO";
import { beachesData, beachesIds } from "../data/localBeaches";
import {
  resourceAlreadyExistsError,
  resourceDoesNotExistsError,
  resourceNotInRequiredParition,
} from "../utils/errorHandlingUtils";
import { insertObjectAndIndex } from "./internalFunctions";
import postalCodeDAO from "./postalCodeDAO";

const objectType = "beach";

export const exists = (beachId: string): boolean => {
  return !!beachesData[beachId];
};

const confirmExists = (beachId: string): void => {
  if (!exists(beachId)) {
    resourceDoesNotExistsError(objectType, beachId);
  }
};

const confirmDoesNotExist = (beachId: string): void => {
  if (exists(beachId)) {
    resourceAlreadyExistsError(objectType, beachId);
  }
};

const generateId = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9]/g, "");
};

const list = (countryId: string, postalCodeId: string): BeachData[] => {
  return beachesIds.reduce((localBeachesData, beachId) => {
    const beachData = beachesData[beachId];
    if (
      beachData &&
      beachData.countryId === countryId &&
      beachData.postalCodeId === postalCodeId
    ) {
      localBeachesData.push(beachData);
    }
    return localBeachesData;
  }, [] as BeachData[]);
};

const get = (
  countryId: string,
  postalCodeId: string,
  beachId: string
): BeachData => {
  countriesDAO.confirmExists(countryId);
  postalCodeDAO.confirmExists(postalCodeId);
  confirmExists(beachId);

  // Note: Need to force the type becuase the type system does not exist throw and error on null.
  const beachData = beachesData[beachId] as BeachData;

  if (beachData.countryId !== countryId) {
    resourceNotInRequiredParition(objectType, beachId, countryId);
  }
  if (beachData.postalCodeId !== postalCodeId) {
    resourceNotInRequiredParition(objectType, beachId, postalCodeId);
  }

  return beachData;
};

const create = (input: CreateBeachInput): BeachData => {
  const id = generateId(input.name);

  countriesDAO.confirmExists(input.countryId);
  postalCodeDAO.confirmExists(input.postalCodeId);
  confirmDoesNotExist(id);

  const beachData: BeachData = {
    id,
    ...input,
  };

  insertObjectAndIndex(beachData, beachesIds, beachesData);

  // TODO Handle Create Initial Status if Provided

  return beachData;
};

export default {
  confirmExists,
  confirmDoesNotExist,
  list,
  get,
  create,
};
