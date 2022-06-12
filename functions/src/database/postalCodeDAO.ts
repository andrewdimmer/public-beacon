import countriesDAO from "./countriesDAO";
import { postalCodesData, postalCodesIds } from "../data/localPostalCodes";
import {
  resourceAlreadyExistsError,
  resourceDoesNotExistsError,
  resourceNotInRequiredParition,
} from "../utils/errorHandlingUtils";
import { insertObjectAndIndex } from "./internalFunctions";

const objectType = "postal code";

export const exists = (postalCodeId: string): boolean => {
  return !!postalCodesData[postalCodeId];
};

const confirmExists = (postalCodeId: string): void => {
  if (!exists(postalCodeId)) {
    resourceDoesNotExistsError(objectType, postalCodeId);
  }
};

const confirmDoesNotExist = (postalCodeId: string): void => {
  if (exists(postalCodeId)) {
    resourceAlreadyExistsError(objectType, postalCodeId);
  }
};

const generateId = (postalCode: string): string => {
  return postalCode;
};

const list = (countryId: string): PostalCodeData[] => {
  return postalCodesIds.reduce((localPostalCodesData, postalCodeId) => {
    const postalCodeData = postalCodesData[postalCodeId];
    if (postalCodeData && postalCodeData.countryId === countryId) {
      localPostalCodesData.push(postalCodeData);
    }
    return localPostalCodesData;
  }, [] as PostalCodeData[]);
};

const get = (countryId: string, postalCodeId: string): PostalCodeData => {
  countriesDAO.confirmExists(countryId);
  confirmExists(postalCodeId);

  // Note: Need to force the type becuase the type system does not exist throw and error on null.
  const postalCodeData = postalCodesData[postalCodeId] as PostalCodeData;

  if (postalCodeData.countryId !== countryId) {
    resourceNotInRequiredParition(objectType, postalCodeId, countryId);
  }

  return postalCodeData;
};

const create = (input: CreatePostalCodeInput): PostalCodeData => {
  const id = generateId(input.postalCode);

  countriesDAO.confirmExists(input.countryId);
  confirmDoesNotExist(id);

  const postalCodeData: PostalCodeData = {
    id,
    ...input,
  };

  insertObjectAndIndex(postalCodeData, postalCodesIds, postalCodesData);

  return postalCodeData;
};

export default {
  confirmExists,
  confirmDoesNotExist,
  list,
  get,
  create,
};
