const { Types, Schema, model } = require('mongoose');


const DOCUMENT_NAME = "Project";
const COLLECTION_NAME = "Projects";

const projectSchema = new Schema({
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type:Schema.Types.ObjectId, ref: 'User' 

    }],
    SprintIds: [{
         type:Schema.Types.ObjectId, ref: 'Sprint' 
    
    }],
    ColumnIds: [{
        
        type:Schema.Types.ObjectId, 
        ref: 'Column' 
     
     }]
    }, {
    timestamps: true ,
    collection: COLLECTION_NAME,
});

module.exports = model(DOCUMENT_NAME, projectSchema)