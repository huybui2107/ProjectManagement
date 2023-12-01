'use strict'
const Project = require("../models/project.model")
const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");
const { Types } = require('mongoose')
const ColumnService = require('../service/column.service');
const { getProjectById } = require('../models/repositories/project.repo')
const { getUserByEmail } = require('../models/repositories/user.repo')
const titleColumn = ["TO DO", "IN PROGRESS", "DONE"]
const { getSelectData } = require('../utils/index')
class ProjectService {
    createProject = async (data) => {
        const newProject = await Project.create({
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            owner: data.userId,
            members: data.userId

        })
        if (!newProject) throw new BadRequestError("Create project fail")
        for (let i = 0; i < 3; i++) {
            await ColumnService.createColumn({
                title: titleColumn[i],
                projectId: newProject._id
            })

        }

        return await getProjectById(newProject._id)
    }
    getProjectByUserId = async (id) => {

        const projects = await Project.find({
            members: new Types.ObjectId(id)
        }).lean()
        if (!projects) throw new BadRequestError("Find project fail")
        return projects
    }
    getSprintInProject = async (id) => {
        const project = await Project.findById(id).lean();
        if (!project) throw new BadRequestError("Find project fail")
        return project.SprintIds
    }
    getColumnByProjectId = async (id) => {
        const project = await Project.findOne({
            _id: id
        })
            .populate('ColumnIds')
            .lean();
        return project.ColumnIds.map((column) => {
            return {
                id: column._id,
                title: column.title,
                projectId: column.projectId,
            }
        })
    }
    insertMemberToProject = async (projectId, email) => {

        const user = await getUserByEmail(email);
        if (!user) throw new BadRequestError("User not found")

        try {
            const res = await Project.updateOne({ _id: new Types.ObjectId(projectId) }, {
                $push: {
                    members: user._id
                }
            })
            return res
        } catch (error) {
            throw new BadRequestError("Insert member to project Error")
        }


    }
    DeleteSprintInProject = async (projectId, sprintId) => {
        try {
            await Project.updateOne({
                _id: new Types.ObjectId(projectId)
            }, {
                $pull: {
                    SprintIds: sprintId
                }
            })
        } catch (error) {
            throw new BadRequestError("remove sprint in project fail")
        }
    }
    getMemberInProject = async (projectId) => {
        try {
            return await Project.findOne({
                _id: new Types.ObjectId(projectId)
            }).populate("members", "_id username email").select("members")

            // return get
        } catch (error) {
            throw new BadRequestError("Get member in Project Error")
        }
    }

}

module.exports = new ProjectService();