const { model, Schema, Types } = require('mongoose')
const DOCUMENT_NAME = "Task";
const COLLECTION_NAME = "Tasks";

const taskSchema = new Schema({
    name: String,
    numberTask: String,
    issue: {
        type: String,
        required: true,
        enum: ["Bug", "Task", "Story"],
    },
    description: String,
    status: {
        type: String,
        default: 'TO DO',
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    ColumnId: {
        type: Types.ObjectId,
        ref: 'Column'
    },
    SprintId: {
        type: Types.ObjectId,
        ref: 'Sprint'
    },
    asignee: {
        type: Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    })

module.exports = model(DOCUMENT_NAME, taskSchema)