import { onIdTokenChanged } from "firebase/auth";
import { GraphQLClient } from "graphql-request";
import {
  firebaseApp,
  firebaseAuth,
  firebaseFunctions,
} from "./firebaseInitialization";

/**
 * The basics of this logic were borrowed from the internal `_url(name)` method in the following file:
 * `/website/node_modules/@firebase/functions/dist/index.esm2017.js
 */
const getFirebaseFunctionsEndpointUrl = (endpointName: string) => {
  const projectId = firebaseApp.options.projectId;
  if (process.env.NODE_ENV !== "production") {
    return `http://localhost:5001/${projectId}/${firebaseFunctions.region}/${endpointName}`;
  }
  if (firebaseFunctions.customDomain !== null) {
    return `${firebaseFunctions.customDomain}/${endpointName}`;
  }
  return `https://${firebaseFunctions.region}-${projectId}.cloudfunctions.net/${endpointName}`;
};

const relativeGraphqlEndpoint = "public_beacon/graphql";
const absoluteGraphqlEndpoint = getFirebaseFunctionsEndpointUrl(
  relativeGraphqlEndpoint
);

export const graphqlClient = new GraphQLClient(absoluteGraphqlEndpoint);

onIdTokenChanged(firebaseAuth, (user) => {
  if (user) {
    // Attach the authorization header when the user logs in or refreshes their token
    user
      .getIdToken()
      .then((token) => {
        console.debug("User authorization header set in the GraphQL Client");
        graphqlClient.setHeader("authorization", token);
      })
      .catch((error) => {
        // TODO: Standardize error logging
        console.error(error);
      });
  } else {
    // Remove the authorization headers when the user logs out
    console.debug("User authorization header removed from the GraphQL Client");
    graphqlClient.setHeaders({});
  }
});
