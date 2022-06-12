import countriesDAO from "./countriesDAO";
import { beachesData, beachesIds } from "../data/localBeaches";
import {
  resourceAlreadyExistsError,
  resourceDoesNotExistsError,
  resourceNotInRequiredParition,
} from "../utils/errorHandlingUtils";
import { insertObjectAndIndex } from "./internalFunctions";
import postalCodeDAO from "./postalCodeDAO";
import statusesDAO from "./statusesDAO";

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

const updateMostRecentStatus = (
  countryId: string,
  postalCodeId: string,
  beachId: string,
  statusId: string
): BeachData => {
  countriesDAO.confirmExists(countryId);
  postalCodeDAO.confirmExists(postalCodeId);
  confirmExists(beachId);
  statusesDAO.confirmExists(statusId);

  // Note: Need to force the type becuase the type system does not exist throw and error on null.
  const beachData = beachesData[beachId] as BeachData;
  const statusData = statusesDAO.get(
    countryId,
    postalCodeId,
    beachId,
    statusId
  );

  if (statusData.beachId !== beachId) {
    resourceNotInRequiredParition("status", statusData.beachId, beachId);
  }

  beachData.mostRecentStatusId = statusId;

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

  const inputStatus = input.status;
  if (inputStatus) {
    statusesDAO.create({
      ...input,
      beachId: id,
      status: inputStatus,
      notes: input.statusNotes,
    });
  }

  return beachData;
};

export default {
  confirmExists,
  confirmDoesNotExist,
  list,
  get,
  create,
  updateMostRecentStatus,
};
