import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
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
         return super.createUser(data, creator);
    }

    public getUser(data) {
        return super.getUser(data);
    }

    public deleteData(id) {
        return super.deleteOne(id);
    }

    public findone(data) {
        return super.findOne(data);
    }

    public countData() {
        return userModel.countDocuments();
    }
}
