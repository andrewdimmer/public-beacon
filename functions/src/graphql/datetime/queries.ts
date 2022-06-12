const datetime = (milliseconds: number): DateTime => {
  console.log("Running datetime in Sandbox Mode.");
  return {
    milliseconds: milliseconds.toString(),
    utcString: new Date(milliseconds).toUTCString(),
  };
};

const datetimeOptional = (milliseconds?: number): DateTime | undefined => {
  console.log("Running datetimeOptional in Sandbox Mode.");
  return milliseconds ? datetime(milliseconds) : undefined;
};

export const queries = {
  datetime,
  datetimeOptional,
};
