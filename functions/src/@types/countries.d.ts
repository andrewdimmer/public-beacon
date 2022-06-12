declare interface CountryData {
  id: string;
  name: string;
}

declare interface Country extends CountryData {
  postalCodes: () => PostalCode[];
  postalCode: (id: GraphqlQueryId) => PostalCode;
}

declare interface CreateCountryInput {
  name: string;
}
