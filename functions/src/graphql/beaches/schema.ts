// TODO: Figure out how to read from the actual schema.graphql file
// Then remove this file!

export const schemaString = `
  type Beach {
    id: ID!
    countryId: ID!
    postalCodeId: ID!
    name: String!
    address1: String!
    address2: String
    city: String
    region: String
  }

  input CreateBeachInput {
    countryId: ID!
    postalCodeId: ID!
    name: String!
    address1: String!
    address2: String
    city: String
    region: String
  }
`;
