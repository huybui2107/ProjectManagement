'use strict'
const Project = require('../project.model');
const { Types } = require('mongoose')




const getProjectById = async (id) => {
    return await Project.findById(new Types.ObjectId(id))
}
const CountSprintOfProject = async (id) => {
    const project = await Project.findById(new Types.ObjectId(id));
    if (!project) throw new BadRequestError("Find project fail")
    return project.SprintIds.length
}


module.exports = {
    getProjectById,
    CountSprintOfProject,

}