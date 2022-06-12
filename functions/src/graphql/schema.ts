// TODO: Figure out how to read from the actual schema.graphql file
// Then remove this file!

export const schemaString = `
  schema {
    query: Query
    mutation: Mutation
  }
  
  type Query {
    countries: [Country!]!
    country(id: ID!): Country!
  }
  
  type Mutation {
    createCountry(input: CreateCountryInput!): Country!
    createPostalCode(input: CreatePostalCodeInput): PostalCode!
    createBeach(input: CreateBeachInput): Beach!
  }
`;
