import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import * as bcrypt from 'bcrypt';
export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    createUser(data: any, creator: any) {
      throw new Error('Method not implemented.');
    }
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

    public findOne(query: any): DocumentQuery<D, D> {
      console.log('-----------', query);
      const finalQuery = { ...query };
      const a = this.model.findOne(finalQuery);
      return this.model.findOne(finalQuery);
    }

    public searchUser(query = {}): DocumentQuery<D[], D> {
        return this.model.find(query);
    }

    public getUser(data: any) {
      return this.model.findOne(data);
    }

    public getAll(query: any, projection: any = {}, options: any = {}): DocumentQuery<D[], D> {
      const finalQuery = { deletedAt: undefined, ...query };
      return this.model.find(finalQuery, projection, options);
    }

    public async create(data: any, creator): Promise<D> {
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

    
    public invalidate(id: string): DocumentQuery<D, D> {
      const query: any = {originalId: id, deletedAt: { $exists: false } };
      const data: any = { deletedAt: Date.now() };
      return this.model.updateOne(query, data);
      }

    public async userUpdate(data: any): Promise<D> {
      console.log('001', data);
      const previous = await this.findOne({ originalId: data.id, deletedAt: undefined});

      console.log('previous: ', previous);

      if (previous) {
          await this.invalidate(data.id);
      }
      else {
          return undefined;
      }

      const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data);
      newData._id = VersionableRepository.generateObjectId();

      delete newData.deletedAt;

      const model = new this.model(newData);
      return await model.save();

  }

  public async deleteOne(id: string): Promise<D> {
    const previous = await this.findOne({ originalId: id, deletedAt: { $exists: false }});
    if (previous) {
    await this.invalidate(id);
    return previous;
    }
    }

    public async delete(id: string) {
        let originalData;
        await this.findOne({ originalId: id, deletedAt: null })
            .then((data) => {
                if (data === null) {
                    throw undefined;
                }
                originalData = data;
                const oldId = originalData._id;
                const modelDelete = {
                    ...originalData,
                    deletedAt: Date.now(),
                    // deletedBy: remover,
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
