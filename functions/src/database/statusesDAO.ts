import countriesDAO from "./countriesDAO";
import { statusesData, statusesIds } from "../data/localStatuses";
import {
  logAndThrowError,
  resourceAlreadyExistsError,
  resourceDoesNotExistsError,
  resourceNotInRequiredParition,
} from "../utils/errorHandlingUtils";
import { insertObjectAndIndex } from "./internalFunctions";
import postalCodeDAO from "./postalCodeDAO";
import beachesDAO from "./beachesDAO";

const objectType = "status";

export const exists = (statusId: string): boolean => {
  return !!statusesData[statusId];
};

const confirmExists = (statusId: string): void => {
  if (!exists(statusId)) {
    resourceDoesNotExistsError(objectType, statusId);
  }
};

const confirmDoesNotExist = (statusId: string): void => {
  if (exists(statusId)) {
    resourceAlreadyExistsError(objectType, statusId);
  }
};

const generateId = (): string => {
  return `Status${statusesIds.length + 1}`;
};

const list = (
  countryId: string,
  postalCodeId: string,
  beachId: string
): StatusData[] => {
  return statusesIds.reduce((localStatusesData, statusId) => {
    const statusData = statusesData[statusId];
    if (
      statusData &&
      statusData.countryId === countryId &&
      statusData.postalCodeId === postalCodeId &&
      statusData.beachId === beachId
    ) {
      localStatusesData.push(statusData);
    }
    return localStatusesData;
  }, [] as StatusData[]);
};

const get = (
  countryId: string,
  postalCodeId: string,
  beachId: string,
  statusId: string
): StatusData => {
  countriesDAO.confirmExists(countryId);
  postalCodeDAO.confirmExists(postalCodeId);
  beachesDAO.confirmExists(beachId);
  confirmExists(statusId);

  // Note: Need to force the type becuase the type system does not exist throw and error on null.
  const statusData = statusesData[statusId] as StatusData;

  if (statusData.countryId !== countryId) {
    resourceNotInRequiredParition(objectType, statusId, countryId);
  }
  if (statusData.postalCodeId !== postalCodeId) {
    resourceNotInRequiredParition(objectType, statusId, postalCodeId);
  }
  if (statusData.beachId !== beachId) {
    resourceNotInRequiredParition(objectType, statusId, beachId);
  }

  return statusData;
};

const confirm = (input: ConfirmStatusInput): StatusData => {
  countriesDAO.confirmExists(input.countryId);
  postalCodeDAO.confirmExists(input.postalCodeId);
  beachesDAO.confirmExists(input.beachId);
  confirmExists(input.statusId);

  // Note: Need to force the type becuase the type system does not exist throw and error on null.
  const beachData = beachesDAO.get(
    input.countryId,
    input.postalCodeId,
    input.beachId
  );
  const statusData = statusesData[input.statusId] as StatusData;

  if (beachData.mostRecentStatusId !== input.statusId) {
    logAndThrowError(
      `Status ${input.statusId} is not the most recent status in ${beachData}.`
    );
  }

  statusData.confirmTimestamp = Date.now();

  return statusData;
};

const create = (input: CreateStatusInput): StatusData => {
  const id = generateId();

  countriesDAO.confirmExists(input.countryId);
  postalCodeDAO.confirmExists(input.postalCodeId);
  beachesDAO.confirmExists(input.beachId);
  confirmDoesNotExist(id);

  const statusData: StatusData = {
    id,
    createTimestamp: Date.now(),
    ...input,
  };

  insertObjectAndIndex(statusData, statusesIds, statusesData);

  beachesDAO.updateMostRecentStatus(
    input.countryId,
    input.postalCodeId,
    input.beachId,
    id
  );

  return statusData;
};

export default {
  confirmExists,
  confirmDoesNotExist,
  list,
  get,
  create,
  confirm,
};
