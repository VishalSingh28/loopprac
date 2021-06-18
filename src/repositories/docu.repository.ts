import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Docu, DocuRelations, UserData} from '../models';
import {UserDataRepository} from './user-data.repository';

export class DocuRepository extends DefaultCrudRepository<
  Docu,
  typeof Docu.prototype.id,
  DocuRelations
> {

  public readonly userData: BelongsToAccessor<UserData, typeof Docu.prototype.id>;
  // public readonly userData: HasManyRepositoryFactory<UserData, typeof Docu.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserDataRepository') protected userDataRepositoryGetter: Getter<UserDataRepository>,
  ) {
    super(Docu, dataSource);
    this.userData = this.createBelongsToAccessorFor('userData', userDataRepositoryGetter,);
    this.registerInclusionResolver('userData', this.userData.inclusionResolver);
    // this.userData = this.createHasManyRepositoryFactoryFor('userData', userDataRepositoryGetter,);
    // this.registerInclusionResolver('userData', this.userData.inclusionResolver);
  }
}
