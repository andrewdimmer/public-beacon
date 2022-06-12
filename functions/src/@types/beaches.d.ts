declare interface Beach {
  id: string;
  countryId: string;
  postalCodeId: string;
  name: string;
  address1: string;
  address2?: string;
  city?: string;
  region?: string;
}

declare interface CreateBeachInput {
  countryId: string;
  postalCodeId: string;
  name: string;
  address1: string;
  address2?: string;
  city?: string;
  region?: string;
}
