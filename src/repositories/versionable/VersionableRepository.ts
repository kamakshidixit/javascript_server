import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import IUserModel from '../user/IUserModel';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
  private model: M;
  constructor(model) {
    this.model = model;
  }

  public static generateObjectId(): string {
    return String(mongoose.Types.ObjectId());
  }

  public count(query: any): Query<number> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.model.countDocuments(finalQuery);
  }
  public findOne(query) {
    return this.model.findOne(query).lean();
  }
  protected find(query = {}): DocumentQuery<D[], D> {
    return this.model.find(query);
  }


  public async createUser(data: any, creator): Promise<D> {
    const id = VersionableRepository.generateObjectId();

    const model = {
      ...data,
      _id: id,
      originalId: id,
      createdBy: creator,
      createdAt: Date.now(),

    };
    return await this.model.create(model);
  }



  public getUser(data: any) {
    return this.model.findOne(data);
  }

  public getAll(query: any, projection: any = {}, options: any = {}): DocumentQuery<D[], D> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.model.find(finalQuery, projection, options);
  }

  public async update(id: string, dataToUpdate: any, updator) {

    let originalData;

    await this.findOne({ id, updatedAt: undefined, deletedAt: undefined })
      .then((data) => {
        if (data === null) {
          throw undefined;
        }
        originalData = data;
        const newId = VersionableRepository.generateObjectId();
        const oldId = originalData._id;
        const oldModel = {
          ...originalData,
          updatedAt: Date.now(),
          updatedBy: updator,
          deletedAt: Date.now(),
          deletedBy: updator,
        };

        const newData = Object.assign(JSON.parse(JSON.stringify(originalData)), dataToUpdate);

        newData._id = newId;
        newData.createdAt = Date.now();

        this.model.updateOne({ _id: oldId }, oldModel)
          .then((res) => {
            if (res === null) {
              throw undefined;
            }
          })
          .catch((err) => {
            console.log('Error: ', err);
          });

        this.model.create(newData);

      });
  }

  public async delete(id: string, remover: string) {

    let originalData;

    await this.findOne({ id, deletedAt: undefined })
      .then((data) => {
        if (data === null) {
          throw undefined;
        }

        originalData = data;
        const oldId = originalData._id;

        const modelDelete = {
          ...originalData,
          deletedAt: Date.now(),
          deletedBy: remover,
        };

        this.model.updateOne({ _id: oldId }, modelDelete)
          .then((res) => {
            if (res === null) {
              throw undefined;
            }
          })
          .catch((err) => {
            console.log('Error: ', err);
          });
      });
  }

}
