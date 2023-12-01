'use strict'
const Column = require('../models/column.model');
const ProjectService = require('../service/project.service')
const { BadRequestError } = require('../core/error.response');
const { Types } = require('mongoose')
const { getProjectById } = require('../models/repositories/project.repo')

class ColumnService {
    createColumn = async (data) => {

        const newColumn = await Column.create({
            title: data.title,
            projectId: data.projectId
        })
        if (!newColumn) throw new BadRequestError("create sprint fail")
        const project = await getProjectById(new Types.ObjectId(data.projectId))
        if (!project) throw new BadRequestError("Find project fail")
        await project.updateOne({
            $push: {
                ColumnIds: newColumn._id
            }
        })
        return newColumn;
    }

    getColumnById = async (id) => {
        return await Column.findById(new Types.ObjectId(id));
    }

    getColumnToDoByProjectId = async (id) => {
        return await Column.findOne({
            projectId: new Types.ObjectId(id),
            title: "TO DO"
        });
    }
    getTitleOfColumn = async (projectId) => {
        return await Column.find({
            projectId: new Types.ObjectId(projectId)
        }).select({
            title: 1
        })
    }

}

module.exports = new ColumnService();