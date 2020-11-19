import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import { Options } from 'body-parser';
import * as bcrypt from 'bcrypt';


import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

    constructor() {
        super(userModel);
    }

    public createUser(data, creator) {
      const rawPassword = data.password;
       console.log('rawPassword' , rawPassword);
       const saltRounds = 10;
       const salt = bcrypt.genSaltSync(saltRounds);
       const hashedPassword = bcrypt.hashSync(rawPassword, salt);
       data.password = hashedPassword;
       console.log('data pass: ', data.password);
        return super.create(data, creator);
    }

    public updateUser(id, data, updator) {
      if ('password' in data) {
        const rawPassword = data.password;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(rawPassword, salt);
        data.password = hashedPassword;
    }
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
