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
      console.log('Query => pet')
      return models.Pet.findOne({ id: id })
    },
    user(_, __, { models }) {
      return models.User.findOne()
    }
  },
  Mutation: {
    newPet(_, { input }, { models }) {
      return models.Pet.create(input)
    }
  },
  Pet: {
    owner(pet, _, { models }) {
      console.log('Pet => owner')
      return models.User.findOne()
    }
    //img(pet) {
    //  return pet.type === 'DOG'
    //    ? 'https://placedog.net/300/300'
    //    : 'http://placekitten.com/300/300'
    //}
  },
  User: {
    pets(user, _, { models }) {
      console.log('user => pets')
      return models.Pet.findMany({ user: user.id })
    }
  }
}
