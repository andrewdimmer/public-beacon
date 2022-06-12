const countryIds = ["Canada", "UnitedKingdom", "UnitedStates"];

const countriesData = {
  Canada: {
    id: "Canada",
    name: "Canada",
  },
  UnitedKingdom: {
    id: "UnitedKingdom",
    name: "United Kingdom",
  },
  UnitedStates: {
    id: "UnitedStates",
    name: "United States",
  },
} as { [key: string]: Country | null };

const countries = () => {
  return countryIds.map((id) => countriesData[id]);
};

const country = ({ id }: GraphqlQueryId) => {
  const countryData = countriesData[id];
  if (countryData) {
    return countryData;
  } else {
    throw new ReferenceError(`No country exists with id=${id}`);
  }
};

export const queries = {
  countries,
  country,
};
