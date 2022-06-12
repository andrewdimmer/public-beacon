// TODO: Figure out how to read from the actual schema.graphql file
// Then remove this file!

export const schemaString = `
  type Country {
    id: ID!
    name: String!
  }
  
  input CreateCountryInput {
    name: String!
  }
`;
