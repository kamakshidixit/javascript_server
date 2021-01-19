import * as mongoose from 'mongoose';

export default interface IVersionableDocument extends mongoose.Document {
    deletedAt: Date;
    createdBy: Date;
    originalId: string;
}
