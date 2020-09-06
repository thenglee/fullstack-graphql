/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input)
    },
    pet(_, { id }, { models }) {
      console.log('id', id)
      return models.Pet.findOne({ id: id })
    }
  },
  Mutation: {
    newPet(_, { input }, { models }) {
      return models.Pet.create(input)
    }
  },
  Pet: {
    //img(pet) {
    //  return pet.type === 'DOG'
    //    ? 'https://placedog.net/300/300'
    //    : 'http://placekitten.com/300/300'
    //}
  },
  User: {}
}
