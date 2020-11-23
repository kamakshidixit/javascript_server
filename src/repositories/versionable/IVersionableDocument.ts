import * as mongoose from 'mongoose';

export default interface IVersionableDocument extends mongoose.Document {
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    originalId: string;
}
