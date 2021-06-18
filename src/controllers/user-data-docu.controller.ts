import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  UserData,
  Docu,
} from '../models';
import {UserDataRepository} from '../repositories';

export class UserDataDocuController {
  constructor(
    @repository(UserDataRepository) protected userDataRepository: UserDataRepository,
  ) { }

  @get('/user-data/{id}/docus', {
    responses: {
      '200': {
        description: 'Array of UserData has many Docu',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Docu)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Docu>,
  ): Promise<Docu[]> {
    return this.userDataRepository.docus(id).find(filter);
  }

  @post('/user-data/{id}/docus', {
    responses: {
      '200': {
        description: 'UserData model instance',
        content: {'application/json': {schema: getModelSchemaRef(Docu)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserData.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docu, {
            title: 'NewDocuInUserData',
            exclude: ['id'],
            optional: ['userDataId']
          }),
        },
      },
    }) docu: Omit<Docu, 'id'>,
  ): Promise<Docu> {
    return this.userDataRepository.docus(id).create(docu);
  }

  @patch('/user-data/{id}/docus', {
    responses: {
      '200': {
        description: 'UserData.Docu PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docu, {partial: true}),
        },
      },
    })
    docu: Partial<Docu>,
    @param.query.object('where', getWhereSchemaFor(Docu)) where?: Where<Docu>,
  ): Promise<Count> {
    return this.userDataRepository.docus(id).patch(docu, where);
  }

  @del('/user-data/{id}/docus', {
    responses: {
      '200': {
        description: 'UserData.Docu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Docu)) where?: Where<Docu>,
  ): Promise<Count> {
    return this.userDataRepository.docus(id).delete(where);
  }
}
