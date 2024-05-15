/* eslint-disable no-use-before-define */
import { Realm } from '@realm/react'

// same name for collection
export interface CoordsSchemaProps {
  latitude: number
  longitude: number
  timestamp: number
}

export class Coords extends Realm.Object<Coords> {
  latitude!: number
  longitude!: number
  timestamp!: number

  // defines structure to store in the database
  static schema = {
    name: 'Coords',
    embedded: true, // this schema will be used by another schema
    properties: {
      latitude: 'float',
      longitude: 'float',
      timestamp: 'float',
    },
  }

  // uses when using the schema. Returns data object to store in the database
  static generate({ latitude, longitude, timestamp }: CoordsSchemaProps) {
    return {
      latitude,
      longitude,
      timestamp,
    }
  }
}
