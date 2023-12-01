const { Types, Schema, model } = require('mongoose');


const DOCUMENT_NAME = "Column";
const COLLECTION_NAME = "Columns";

const columnSchema = new Schema({
    title: String,
    projectId :{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    }, 
    {
    timestamps: true ,
    collection: COLLECTION_NAME,
});

module.exports = model(DOCUMENT_NAME, columnSchema)