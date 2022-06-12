export const insertObjectAndIndex = (
  objectToInsert: any,
  indexList: String[],
  objectList: { [key: string]: any }
): void => {
  const id = objectToInsert.id;

  indexList.push(id);
  indexList.sort();

  objectList[id] = objectToInsert;
};
