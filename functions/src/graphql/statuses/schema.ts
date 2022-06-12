// TODO: Figure out how to read from the actual schema.graphql file
// Then remove this file!

export const schemaString = `
  type Status {
    id: ID!
    createDateTime: DateTime!
    confirmDateTime: DateTime
    countryId: ID!
    postalCodeId: ID!
    beachId: ID!
    status: StatusOptions!
    notes: String
  }

  input CreateStatusInput {
    countryId: ID!
    postalCodeId: ID!
    beachId: ID!
    status: StatusOptions!
    notes: String
  }

  input ConfirmStatusInput {
    countryId: ID!
    postalCodeId: ID!
    beachId: ID!
    statusId: ID!
  }

  enum StatusOptions {
    CLOSED
    ADVISORY
    NOTICE
    OPEN
  }
`;
