const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Query {
    me: User!
    shoes(input: ShoeInput): [Shoe]
  }

  type Shoe {
    brand: String!
    size: Int!
  }

  input ShoeInput {
    brand: String
    size: Int
  }
`

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: 'nike', size: 12 },
        { brand: 'adidas', size: 14 }
      ].filter(shoe => shoe.brand === input.brand)
    },
    me() {
      return {
        email: 'yoda@masters.com',
        avatar: 'http://yoda.png',
        friends: []
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(() => console.log('on port 4000'))
