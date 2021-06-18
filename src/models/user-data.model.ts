import {Entity, model, property, hasMany} from '@loopback/repository';
import {Docu} from './docu.model';

@model()
export class UserData extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  F_Name: string;

  @property({
    type: 'string',
    required: true,
  })
  l_Name: string;

  @property({
    type: 'string',
    required: true,
  })
  father_Name: string;

  @property({
    type: 'string',
    required: true,
  })
  mother_name: string;

  @property({
    type: 'string',
    required: true,
  })
  cast: string;

  @property({
    type: 'string',
    required: true,
  })
  course: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'number',
    required: true,
  })
  mobile: number;

  // @belongsTo(() => Docu)
  // docuId: number;

  @hasMany(() => Docu)
  docus: Docu[];

  constructor(data?: Partial<UserData>) {
    super(data);
  }
}

export interface UserDataRelations {
  // describe navigational properties here
}

export type UserDataWithRelations = UserData & UserDataRelations;
