const { Types, Schema, model } = require('mongoose');


const DOCUMENT_NAME = "SprintColumn";
const COLLECTION_NAME = "SprintColumns";

const SprintColumnSchema = new Schema({
    sprintId : {
       type : Schema.Types.ObjectId,
       ref :'Sprint'
    },
    columnId : {
        type : Schema.Types.ObjectId,
        ref :'Column'
    },
    taskIds : Array
    }, 
    {
    timestamps: true ,
    collection: COLLECTION_NAME,
});

module.exports = model(DOCUMENT_NAME, SprintColumnSchema)