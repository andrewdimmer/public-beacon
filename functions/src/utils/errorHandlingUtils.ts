import { logger } from "firebase-functions";

export const logAndThrowError = (message: string) => {
  logger.warn(message);
  throw new ReferenceError(message);
};

export const resourceAlreadyExistsError = (objectType: string, id: string) => {
  logAndThrowError(`There already exists a ${objectType} with id=${id}`);
};

export const resourceDoesNotExistsError = (objectType: string, id: string) => {
  logAndThrowError(`No ${objectType} exists with id=${id}`);
};

export const resourceNotInRequiredParition = (
  objectType: string,
  id: string,
  partitionName: string
) => {
  logAndThrowError(
    `The ${objectType} with id=${id} is not in the ${partitionName} partition.`
  );
};
