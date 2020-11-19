import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import { Options } from 'body-parser';

import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

    constructor() {
        super(userModel);
    }

    public createUser(data, creator) {
        return super.create(data, creator);
    }

    public updateUser(id, data, updator) {
        return super.update(id, data, updator);
    }

    public getUser(data) {
        return super.getUser(data);
    }

    public deleteData(id, remover) {
        return super.delete(id, remover);
    }

    public findone(data) {
        return super.findOne(data);
    }

    public countData() {
        return super.count();
    }
}
