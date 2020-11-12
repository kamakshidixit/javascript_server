import * as mongoose from 'mongoose';

export default interface IVersionableDocument extends mongoose.Document {
    createdAt: Date;
    originalId: string;
    deletedAt: Date;
}