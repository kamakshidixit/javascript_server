import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import IUserModel from '../user/IUserModel';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public model: M;

    constructor(model) {
        this.model = model;
    }
    public async create(data: IUserModel): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = new this.model({
            ...data,
            _id: id,
            originalId: id,
        });
        return await model.save();
    }
    public count(query: any): Query<number> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.count(finalQuery);
    }
    public async findOne(query: any): Promise<D> {
        console.log(this.model);
        const finalQuery = { deletedAt: undefined, ...query };
        return await this.model.findOne(finalQuery);
    }
    public async get(query: any, projection: any, options: any): Promise<D[]> {
        const finalQuery = { deletedAt: undefined, ...query };
        return await this.model.find(finalQuery, projection, options);
    }
    public async invalidateUpdate(id: string): Promise<D> {
        const query: any = { originalId: id, deletedAt: { $exists: false }, updatedAt: { $exists: false } };
        const data: any = { deletedAt: Date.now(), updatedAt: Date.now() };
        return await this.model.updateOne(query, data);
    }
    public async invalidate(id: string): Promise<D> {
        const query: any = { originalId: id, deletedAt: { $exists: false } };
        const data: any = { deletedAt: Date.now()};
        return await this.model.updateOne(query, data);
    }
    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined });
        if (previous) {
            return await this.invalidate(id);
        }
    }
    public async update(data: any): Promise<D> {
        const previous = await this.findOne({ originalId: data.originalId, deletedAt: undefined });
        console.log('previous: ', previous);
        if (previous) {
            await this.invalidateUpdate(data.originalId);
        } else {
            return undefined;
        }
        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data);
        newData._id = VersionableRepository.generateObjectId();
        delete newData.deletedAt;
        newData.updatedAt = Date.now();
        const model = new this.model(newData);
        return await model.save();
    }
}
