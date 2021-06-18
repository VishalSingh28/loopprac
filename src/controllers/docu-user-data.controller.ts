import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Docu,
  UserData,
} from '../models';
import {DocuRepository} from '../repositories';

export class DocuUserDataController {
  constructor(
    @repository(DocuRepository)
    public docuRepository: DocuRepository,
  ) { }

  @get('/docus/{id}/user-data', {
    responses: {
      '200': {
        description: 'UserData belonging to Docu',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserData)},
          },
        },
      },
    },
  })
  async getUserData(
    @param.path.number('id') id: typeof Docu.prototype.id,
  ): Promise<UserData> {
    return this.docuRepository.userData(id);
  }
}
