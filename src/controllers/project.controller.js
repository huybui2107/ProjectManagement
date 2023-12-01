'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response');
const ProjectService = require('../service/project.service');


class ProjectController {
    createProject = async (req, res, next) => {
        new CREATED({
            message: 'Create Ok',
            metadata: await ProjectService.createProject({
                ...req.body,
                userId: req.user.userId
            })
        }).send(res);
    }

    getProjectByUserId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get Ok',
            metadata: await ProjectService.getProjectByUserId({
                id: req.user.userId
            })
        }).send(res);
    }
    insertUserToProject = async (req, res, next) => {
        new SuccessResponse({
            message: 'Insert Ok',
            metadata: await ProjectService.insertMemberToProject(req.params.id, req.body.email)
        }).send(res);
    }
    getMemberInProject = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get member Ok',
            metadata: await ProjectService.getMemberInProject(req.params.id)
        }).send(res);
    }
    // getCountSprintOfProject = async (req , res ,next) =>{
    //     new SuccessResponse({
    //         message :'Get Ok',
    //         metadata : await ProjectService.CountSprintOfProject(req.params)
    //     }).send(res);
    // }

}

module.exports = new ProjectController();