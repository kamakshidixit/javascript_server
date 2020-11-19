import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    private model: M;

    constructor(model) {
        this.model = model;
    }

    public static generateObjectId(): string {
        return String(mongoose.Types.ObjectId());
    }

    public async count() {
        return await this.model.countDocuments();
    }

    public async findOne(query: object) {
        return await this.model.findOne(query).lean();
    }

    public async create(data: any, creator): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        const modelData = {
            ...data,
            originalId: id,
            createdBy: creator,
            _id: id,
        };

        return await this.model.create(modelData);
    }

    public async getUser(data: any) {
        return await this.model.findOne(data);
    }

    public async update(id: string, dataToUpdate: any, updator) {

        let originalData;
        // console.log()
        // tslint:disable-next-line: no-null-keyword
        await this.findOne({ _id: id, updatedAt: null, deletedAt: null })
            .then((data) => {
                if (data === null) {
                    throw new Error('');
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
                            throw new Error('');
                        }
                        else
                            return res;
                    });

                this.model.create(newData);


            });
    }

    public async delete(id: string, remover: string) {

        let originalData;

        // tslint:disable-next-line: no-null-keyword
        await this.findOne({ _id: id, deletedAt: null })
            .then((data) => {
                if (data === null) {
                    throw new Error('');
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
                            throw new Error('');
                        }
                      });
                   });
    }
}
