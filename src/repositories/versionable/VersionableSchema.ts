import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {
  constructor(options: any, collection: any) {
    const versionable = Object.assign({
      createdAt: {
        default: Date.now,
        required: true,
        type: Date,
      },
      deletedAt: {
        required: false,
        default: undefined,
        type: Date,
      },
      originalId: {
        required: false,
        type: String,
      },
      updatedAt: {
        default: undefined,
        required: false,
        type: Date,
      },
      updatedBy: {
        default: undefined,
        required: false,
        type: String,
      },
      deletedBy: {
        default: undefined,
        required: false,
        type: String,
      },
      createdBy: {
        default: undefined,
        required: false,
        type: String,
      },
    }, options);
    super(versionable, collection);
  }
}
