'use strict'
const Task = require('../task.model');
const {Types, get } = require('mongoose')
const  { getUnSelectData } = require('../../utils/index')
const ColumnService = require('../../service/column.service')


const getTaskById = async (id) =>{
    return await Task.findOne({ _id :new Types.ObjectId(id)}).select(getUnSelectData(['createdAt','updatedAt','__v']))
}



module.exports ={
    getTaskById,


}