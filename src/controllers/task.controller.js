'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response');
const TaskService = require('../service/task.service');


class TaskController {
    createTask = async (req, res, next) => {
        new CREATED({
            message: 'Create Ok',
            metadata: await TaskService.createTask({
                ...req.body,
                userId: req.user.userId,
                projectId: req.params.idproject
            })
        }).send(res);
    }

    getTaskByColumnId = async (req, res, next) => {
        new SuccessResponse({
            message: 'get task by Column Id',
            metadata: await TaskService.getTaskByColumnId(req.params)
        }).send(res);
    }

    assignTask = async (req, res, next) => {
        new SuccessResponse({
            message: 'assign task sucessfully',
            metadata: await TaskService.assignTask(req.body)
        }).send(res);
    }
    updateTaskInColumn = async (req, res, next) => {
        new SuccessResponse({
            message: 'update task in column sucessfully',
            metadata: await TaskService.updateTaskInColumn({
                ...req.body,
                SprintId: req.params.sprintId
            })
        }).send(res);
    }
    updateTaskTitle = async (req, res, next) => {
        new SuccessResponse({
            message: 'update title sucessfully',
            metadata: await TaskService.updateTitleTask(req.body)
        }).send(res);
    }
    getTaskBySprintId = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Task sucessfully',
            metadata: await TaskService.getTaskBySprintId(req.params)
        }).send(res);
    }
    updateStatus = async (req, res, next) => {
        new SuccessResponse({
            message: 'update status successfully',
            metadata: await TaskService.updateStatus(req.body)
        }).send(res);
    }
    updateDesc = async (req, res, next) => {
        new SuccessResponse({
            message: 'update description successfully',
            metadata: await TaskService.updateDesc(req.body)
        }).send(res);
    }


}

module.exports = new TaskController();