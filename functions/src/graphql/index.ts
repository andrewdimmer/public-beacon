import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import {
  countrySchemaString,
} from "./countries";
import { schemaString as rootSchemaString } from "./schema";

const schema = buildSchema(`
  ${rootSchemaString}
  ${countrySchemaString}
`);

const root = {
  hello: () => "Hello World!",
};

export const graphqlEndpoint = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.FUNCTIONS_EMULATOR == "true",
});
