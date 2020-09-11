import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      type
      name
      img
    }
  }
`

const ADD_PET = gql`
  mutation AddPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { loading, error, data } = useQuery(ALL_PETS)
  const [createPet, newPet] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS })
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...pets] }
      })
    }
  })

  const onSubmit = input => {
    setModal(false)
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet',
          id: 'id',
          name: input.name,
          type: input.type,
          img: 'https://via.placeholder.com/300'
        }
      }
    })
  }

  if (loading) {
    return <Loader />
  }

  if (error || newPet.error) {
    return <p>Error!</p>
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
