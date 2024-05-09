import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic'
import { SyncConfiguration } from 'realm'

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
    schema: [Historic],
  })
