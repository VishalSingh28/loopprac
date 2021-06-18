import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserData, UserDataRelations, Docu} from '../models';
import {DocuRepository} from './docu.repository';

export class UserDataRepository extends DefaultCrudRepository<
  UserData,
  typeof UserData.prototype.id,
  UserDataRelations
> {

  // public readonly docu: BelongsToAccessor<Docu, typeof UserData.prototype.id>;

  public readonly docus: HasManyRepositoryFactory<Docu, typeof UserData.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DocuRepository') protected docuRepositoryGetter: Getter<DocuRepository>,
  ) {
    super(UserData, dataSource);
    this.docus = this.createHasManyRepositoryFactoryFor('docus', docuRepositoryGetter,);
    this.registerInclusionResolver('docus', this.docus.inclusionResolver);
    // this.docu = this.createBelongsToAccessorFor('docu', docuRepositoryGetter,);
    // this.registerInclusionResolver('docu', this.docu.inclusionResolver);
  }
}
