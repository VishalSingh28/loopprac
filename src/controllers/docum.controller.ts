import {inject} from '@loopback/core';
import {FILE_UPLOAD_SERVICE} from '../keys';
import {FileUploadHandler} from '../types';

import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response, RestBindings,Request, Response
} from '@loopback/rest';
import {Docu} from '../models';
import {DocuRepository} from '../repositories';

export class DocumController {
  constructor(
    @repository(DocuRepository)
    public docuRepository : DocuRepository,  @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) {}


  @post('/docus')
  @response(200, {
    description: 'Docu model instance',
    content: {'application/json': {schema: getModelSchemaRef(Docu)}},
  })

  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          resolve(DocumController.getFilesAndFields(request));
        }
      });
    });
  }

  // /**
  //  * Get files and fields for the request
  //  * @param request - Http request
  //  */
  // private static getFilesAndFields(request: Request) {
  //   const uploadedFiles = request.files;
  //   const mapper = (f: globalThis.Express.Multer.File) => ({
  //     fieldname: f.fieldname,
  //     originalname: f.originalname,
  //     encoding: f.encoding,
  //     mimetype: f.mimetype,
  //     size: f.size,
  //   });
  //   let files: object[] = [];
  //   if (Array.isArray(uploadedFiles)) {
  //     files = uploadedFiles.map(mapper);
  //   } else {
  //     for (const filename in uploadedFiles) {
  //       files.push(...uploadedFiles[filename].map(mapper));
  //     }
  //   }
  //   return {files, fields: request.body};
  // }




  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docu, {
            title: 'NewDocu',
            exclude: ['id'],
          }),
        },
      },
    })
    docu: Omit<Docu, 'id'>,
  ): Promise<Docu> {
    return this.docuRepository.create(docu);
  }

  @get('/docus/count')
  @response(200, {
    description: 'Docu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Docu) where?: Where<Docu>,
  ): Promise<Count> {
    return this.docuRepository.count(where);
  }

  @get('/docus')
  @response(200, {
    description: 'Array of Docu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Docu, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Docu) filter?: Filter<Docu>,
  ): Promise<Docu[]> {
    return this.docuRepository.find(filter);
  }

  @patch('/docus')
  @response(200, {
    description: 'Docu PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docu, {partial: true}),
        },
      },
    })
    docu: Docu,
    @param.where(Docu) where?: Where<Docu>,
  ): Promise<Count> {
    return this.docuRepository.updateAll(docu, where);
  }

  @get('/docus/{id}')
  @response(200, {
    description: 'Docu model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Docu, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Docu, {exclude: 'where'}) filter?: FilterExcludingWhere<Docu>
  ): Promise<Docu> {
    return this.docuRepository.findById(id, filter);
  }

  @patch('/docus/{id}')
  @response(204, {
    description: 'Docu PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docu, {partial: true}),
        },
      },
    })
    docu: Docu,
  ): Promise<void> {
    await this.docuRepository.updateById(id, docu);
  }

  @put('/docus/{id}')
  @response(204, {
    description: 'Docu PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() docu: Docu,
  ): Promise<void> {
    await this.docuRepository.replaceById(id, docu);
  }

  @del('/docus/{id}')
  @response(204, {
    description: 'Docu DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.docuRepository.deleteById(id);
  }
}


