'use strict'
const Sprint = require('../sprint.model');
const { Types } = require('mongoose')




const getSprintByProjectId = async (id) => {
    return await Sprint.find({
        projectId: new Types.ObjectId(id)
    }).lean()
}


module.exports = {
    getSprintByProjectId
}