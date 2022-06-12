import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import {
  countrySchemaString,
  countryQueries,
  countryMutations,
} from "./countries";
import { postalCodeSchemaString, postalCodeMutations } from "./postalCodes";
import { beachSchemaString } from "./beaches";
import { schemaString as rootSchemaString } from "./schema";

const schema = buildSchema(`
  ${rootSchemaString}
  ${countrySchemaString}
  ${postalCodeSchemaString}
  ${beachSchemaString}
`);

const root = {
  ...countryQueries,
  ...countryMutations,
  ...postalCodeMutations,
};

export const graphqlEndpoint = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.FUNCTIONS_EMULATOR == "true",
});
