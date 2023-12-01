const { Types, Schema, model } = require('mongoose');


const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";


const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,

        },
        password: {
            type: String,
            required: true,
        },
        // project : [
        //    {
        //     type:Schema.Types.ObjectId, 
        //     ref: 'Project' 
        //    }
        // ]
    }, 
    {
    timestamps: true,
    collection: COLLECTION_NAME,
})


module.exports = model(DOCUMENT_NAME, userSchema)