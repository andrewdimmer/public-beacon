import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { beachMutations, beachSchemaString } from "./beaches";
import {
  countryMutations,
  countryQueries,
  countrySchemaString,
} from "./countries";
import { datetimeSchemaString } from "./datetime";
import { postalCodeMutations, postalCodeSchemaString } from "./postalCodes";
import { schemaString as rootSchemaString } from "./schema";
import { statusSchemaString } from "./statuses";

const schema = buildSchema(`
  ${rootSchemaString}
  ${countrySchemaString}
  ${postalCodeSchemaString}
  ${beachSchemaString}
  ${statusSchemaString}
  ${datetimeSchemaString}
`);

const root = {
  ...countryQueries,
  ...countryMutations,
  ...postalCodeMutations,
  ...beachMutations,
};

export const graphqlEndpoint = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.FUNCTIONS_EMULATOR == "true",
});
