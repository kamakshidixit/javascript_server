import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {

    constructor(options, collections) {
        const versionableOptions = Object.assign({
            ...options,
            createdAt: {
                default: Date.now,
                type: Date,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            updatedAt: {
                required: false,
                type: Date,
            },
            updatedBy: {
                required: false,
                type: String,
            },
            deletedBy: {
                required: false,
                type: String,
            },
            createdBy: {
                required: false,
                type: String,
            },
            originalId: {
                required: true,
                type: String,
            }
        });
        super(versionableOptions, collections);

    }
}

export default VersionableSchema;
