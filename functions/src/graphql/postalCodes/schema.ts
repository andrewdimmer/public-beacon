// TODO: Figure out how to read from the actual schema.graphql file
// Then remove this file!

export const schemaString = `
  type PostalCode {
    id: ID!
    countryId: ID!
    postalCode: String!
    beaches: [Beach!]!
    beach(id: ID!): Beach!
  }

  input CreatePostalCodeInput {
    countryId: ID!
    postalCode: String!
  }
`;
