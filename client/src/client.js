import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

const typeDefs = gql`
  extend type User {
    age: Int
  }
`

const resolvers = {
  User: {
    age() {
      return 35
    }
  }
}

const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success()
      }, 1800)
    })
)

const http = new HttpLink({ uri: 'http://localhost:4000/' })

const link = ApolloLink.from([delay, http])

const cache = new InMemoryCache()

const client = new ApolloClient({ link, cache, resolvers, typeDefs })

export default client
