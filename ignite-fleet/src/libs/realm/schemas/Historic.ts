/* eslint-disable no-use-before-define */
import { Realm } from '@realm/react'
import { CoordsSchemaProps } from './Coords'

interface GenerateProps {
  user_id: string
  license_plate: string
  description: string
  coords: CoordsSchemaProps[]
}

// same name for collection
export class Historic extends Realm.Object<Historic> {
  _id!: object
  user_id!: string
  license_plate!: string
  description!: string
  coords!: CoordsSchemaProps[]
  status!: string
  created_at!: Date
  updated_at!: Date

  // defines structure to store in the database
  static shema = {
    name: 'Historic',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      coords: {
        type: 'list',
        objectType: 'Coords',
      },
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }

  // uses when using the schema. Returns data object to store in the database
  static generate({
    user_id,
    license_plate,
    description,
    coords,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
      coords,
      status: 'departure',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}
