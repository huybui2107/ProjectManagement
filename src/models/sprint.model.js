const { Types, Schema, model } = require('mongoose');


const DOCUMENT_NAME = "Sprint";
const COLLECTION_NAME = "Sprints";

const sprintSchema = new Schema({
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Start", "Process", "End"],
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },

}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = model(DOCUMENT_NAME, sprintSchema)