import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {UserData} from './user-data.model';

@model()
export class Docu extends Entity {
  @property({
    type: 'number',
    id: true,

    //id: 12345,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  profile: string;

  @property({
    type: 'string',
    required: true,
  })
  degree: string;

  @belongsTo(() => UserData)
  userDataId: number;

  constructor(data?: Partial<Docu>) {
    super(data);
  }
}

export interface DocuRelations {
  // describe navigational properties here
}

export type DocuWithRelations = Docu & DocuRelations;
