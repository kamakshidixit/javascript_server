import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {
  constructor(options: any, collection: any) {
    const versionedOptions = Object.assign({
      ...options,
      createdAt: {
        default: Date.now,
        required: true,
        type: Date,
      },
      deletedAt: {
        type: Date,
      },
      originalId: {
        required: true,
        type: String,
      },
    }, );
    super(versionedOptions, collection);
  }
}