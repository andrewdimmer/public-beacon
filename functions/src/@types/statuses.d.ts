declare interface StatusData {
  id: string;
  createTimestamp: number;
  confirmTimestamp?: number;
  countryId: string;
  postalCodeId: string;
  beachId: string;
  status: StatusOptions;
  notes?: string;
}

declare interface Status extends StatusData {
  createDateTime: DateTime;
  confirmDateTime?: DateTime;
}

declare interface CreateStatusInput {
  countryId: string;
  postalCodeId: string;
  beachId: string;
  status: StatusOptions;
  notes?: string;
}

declare interface ConfirmStatusInput {
  countryId: string;
  postalCodeId: string;
  beachId: string;
  statusId: string;
}

declare type StatusOptions = "CLOSED" | "ADVISORY" | "NOTICE" | "OPEN";
