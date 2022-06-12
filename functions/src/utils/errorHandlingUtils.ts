import { logger } from "firebase-functions";

const logAndThrowError = (message: string) => {
  logger.warn(message);
  throw new ReferenceError(message);
};

export const resourceAlreadyExistsError = (
  objectType: string,
  fieldChecked: string,
  fieldValue: string
) => {
  logAndThrowError(
    `There already exists a ${objectType} with ${fieldChecked}=${fieldValue}`
  );
};

export const resourceDoesNotExistsError = (objectType: string, id: string) => {
  logAndThrowError(`No ${objectType} exists with id=${id}`);
};
