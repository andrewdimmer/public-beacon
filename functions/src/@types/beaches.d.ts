declare interface BeachData {
  id: string;
  countryId: string;
  postalCodeId: string;
  name: string;
  address1: string;
  address2?: string;
  city?: string;
  region?: string;
  mostRecentStatusId?: string;
}

declare interface Beach extends BeachData {
  mostRecentStatus?: () => Status;
  historialStatuses: () => Status[];
  historialStatus: (id: GraphqlQueryId) => Status;
}

declare interface CreateBeachInput {
  countryId: string;
  postalCodeId: string;
  name: string;
  address1: string;
  address2?: string;
  city?: string;
  region?: string;
  status?: StatusOptions;
  statusNotes: string;
}
