import React from "react"
import { navigate } from "gatsby"

import { AuthProvider } from "react-use-auth"
import { ApolloProvider } from "react-apollo-hooks"

import { client } from "./src/apollo"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider
      navigate={navigate}
      auth0_domain="imshaiksaif.us.auth0.com"
      auth0_client_id="X9z1NzH6ZyJCt8L51i2t3P6u3I2Y2Dy9"
    >
      {element}
    </AuthProvider>
  </ApolloProvider>
)
