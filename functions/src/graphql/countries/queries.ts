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

const countries = (): Country[] => {
  return countryIds.reduce((countriesList, countryId) => {
    const countryData = countriesData[countryId];
    if (countryData) {
      countriesList.push(countryData);
    }
    return countriesList;
  }, [] as Country[]);
};

const country = ({ id }: GraphqlQueryId): Country => {
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
