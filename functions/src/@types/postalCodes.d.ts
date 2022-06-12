declare interface PostalCodeData {
  id: string;
  countryId: string;
  postalCode: string;
}

declare interface PostalCode extends PostalCodeData {
  beaches: () => Beach[];
  beach: (id: GraphqlQueryId) => Beach;
}

declare interface CreatePostalCodeInput {
  countryId: string;
  postalCode: string;
}
