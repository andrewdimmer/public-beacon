declare interface PostalCode {
  id: string;
  countryId: string;
  postalCode: string;
}

declare interface CreatePostalCodeInput {
  countryId: string;
  postalCode: string;
}
