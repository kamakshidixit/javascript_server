
import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';
import * as bcrypt from 'bcrypt';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
  static count() {
    throw new Error('Method not implemented.');
  }
  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }
  constructor() {
    super(userModel);
  }
  public static findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
    return userModel.findOne(query).lean();
  }
  public create(data: any): Promise<IUserModel> {
    return super.create(data);
  }
  public delete(id: string): Promise<IUserModel> {
    return super.delete(id);
  }
  public update(data: any): Promise<IUserModel> {
    return super.update(data);
  }
  public async get(query: any, projection: any, options: any): Promise<IUserModel[]> {
    return super.get(query, projection, options);
  }
  public count() {
    return userModel.countDocuments();
  }
}
