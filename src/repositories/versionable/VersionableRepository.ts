import * as mongoose from 'mongoose';
import { DocumentQuery , Query } from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    private model: M;
    constructor(model) {
        this.model = model;
    }

    public static generateObjectId(): string {
        return String(mongoose.Types.ObjectId());
    }

    public count() {
        return this.model.countDocuments();
    }
    public findOne(query) {
        return this.model.findOne(query).lean();
    }

    public getUser(data: any) {
        return this.model.findOne(data);
    }

    public create(data: any): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = new this.model({
            ...data,
            _id: id,
            originalId: id
        });
        return  model.save();
    }

   public delete(id: any) {
       return new Promise((resolve, reject) => {
           let originalData;

           this.findOne({ _id: id, deletedAt: undefined}).lean()
           .then((data) => {
                console.log('data: ', data);
                if (data === null) {
                    throw Error;
                }

                originalData = data;
                const oldId = originalData._id;

                const modelDelete = {
                    ...originalData,
                    deletedAt: Date.now()
                };

                this.model.updateOne({ _id: oldId}, modelDelete);
                resolve(undefined);
           })
           .catch((err) => {
                reject(err);
           });
       });
   }
  }
