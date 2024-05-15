import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic'
import { SyncConfiguration } from 'realm'
import { Coords } from './schemas/Coords'

const realmFileBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately, // open the database immediately
}

export const syncConfig: Partial<SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmFileBehavior,
  existingRealmFileBehavior: realmFileBehavior,
}

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Historic, Coords],
    schemaVersion: 1, // update version after schema changes
  })
