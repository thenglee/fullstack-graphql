/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, __, { models }) {
      //return models.Pet.findMany({})
      return [
        { id: 1, name: 'moose' },
        { id: 2, name: 'garfield' }
      ]
    }
  },
  //Mutation: {},
  Pet: {
    id(pet) {
      console.log(pet)
      return 3
    }
    //img(pet) {
    //  return pet.type === 'DOG'
    //    ? 'https://placedog.net/300/300'
    //    : 'http://placekitten.com/300/300'
    //}
  },
  User: {}
}
