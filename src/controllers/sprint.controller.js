'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response');
const SprintService = require('../service/sprint.service');


class SprintController {
    createSprint = async (req, res, next) => {
        new CREATED({
            message: 'Create Ok',
            metadata: await SprintService.createSprint({
                ...req.body,
                projectId: req.params.idproject
            })
        }).send(res);
    }
    GetSprintByProjectId = async (req, res, next) => {
        new SuccessResponse({
            message: 'get all sucessfully',
            metadata: await SprintService.getSprintByProjectId(req.params)
        }).send(res);
    }
    UpdateStatus = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update sucessfully',
            metadata: await SprintService.updateStatus(req.body)
        }).send(res);
    }
    UpdateSprint = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update sucessfully',
            metadata: await SprintService.updateSprint(req.body)
        }).send(res);
    }
    DeleteSprint = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete sucessfully',
            metadata: await SprintService.deleteSprint(req.params)
        }).send(res);
    }


}

module.exports = new SprintController();