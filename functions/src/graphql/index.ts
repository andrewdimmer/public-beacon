import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import {
  countrySchemaString,
  countryQueries,
  countryMutations,
} from "./countries";
import { postalCodeSchemaString } from "./postalCodes";
import { schemaString as rootSchemaString } from "./schema";

const schema = buildSchema(`
  ${rootSchemaString}
  ${countrySchemaString}
  ${postalCodeSchemaString}
`);

const root = {
  ...countryQueries,
  ...countryMutations,
};

export const graphqlEndpoint = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.FUNCTIONS_EMULATOR == "true",
});
