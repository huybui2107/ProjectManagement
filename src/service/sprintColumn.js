'use strict'

const SprintColumn = require('../models/sprintColumn')
const ColumnService = require('../service/column.service')
const { BadRequestError } = require('../core/error.response');
const { Types } = require('mongoose')


class SprintColumnService {
    createSprintColumn = async (data) => {
        
        const newCollection = await SprintColumn.create({
            sprintId : data.sprintId,
            columnId : data.columnId
        })
        if (!newCollection) throw new BadRequestError("create fail")
        
        return newCollection;
    }
    getColumnByProject = async (id, sprintId ) =>{
            const column = await ColumnService.getColumnToDoByProjectId(id);
            return await SprintColumn.findOne({
                sprintId : new Types.ObjectId(sprintId),
                columnId : column._id
            })
    }
    getSprintColumn = async (columnId , sprintId) =>{
        
        return await SprintColumn.findOne({
            sprintId : new Types.ObjectId(sprintId),
            columnId : new Types.ObjectId(columnId)
        })
}
   

}

module.exports = new SprintColumnService();