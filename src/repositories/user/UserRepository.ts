import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import { Options } from 'body-parser';

export default class UserRepository {

  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  public findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
    return userModel.findOne(query).lean();
  }

  // tslint:disable-next-line: no-shadowed-variable
  public find(query, projection ?: any, Options ?: any): any {
    return userModel.find(query, projection, Options);
  }

  public create(data: any): Promise<IUserModel> {
    console.log('UserRepository: : create', data);
    const id = UserRepository.generateObjectId();
    const model = new userModel({
      _id: id,
      ...data,
    });
    return model.save();
  }

  public count() {
    return userModel.countDocuments();
  }
}

