'use strict'
const Task = require('../models/task.model');
const { BadRequestError } = require("../core/error.response");
const ColumnService = require("../service/column.service")
const SprintServices = require("../service/sprint.service")
const SprintColumnService = require('../service/sprintColumn')
const { Types } = require('mongoose');
const projectService = require('./project.service');
const { createNuberForTask, covertText } = require('../utils/index')
const { getProjectById } = require('../models/repositories/project.repo')
const { getTaskById } = require('../models/repositories/task.repo')
const { getSprintByProjectId } = require('../models/repositories/sprint.repo')
class TaskService {

    createTask = async (data) => {

        const SprintColumn = await SprintColumnService.getColumnByProject(data.projectId, data.SprintId)
        console.log(SprintColumn)
        const sprints = await getSprintByProjectId(data.projectId);
        let count = 0;
        for (let i of sprints) {
            const s = await Task.find({ SprintId: new Types.ObjectId(i._id) }).countDocuments()
            count += s
        }
        const project = await getProjectById(data.projectId)
        if (!project) throw new BadRequestError("Find project fail")

        const newTask = await Task.create({
            name: data.name,
            numberTask: createNuberForTask(project.title, count + 1),
            issue: "Task",
            description: data.description,
            owner: data.userId,
            ColumnId: SprintColumn.columnId,
            SprintId: data.SprintId,
        })
        if (!newTask) throw new BadRequestError("Create task Fail")

        await SprintColumn.updateOne({
            $push: {
                taskIds: newTask._id
            }
        })
        return newTask
    }

    getTaskByColumnId = async ({ projectId, sprintId }) => {
        const columnIds = await projectService.getColumnByProjectId(new Types.ObjectId(projectId));
        const results = columnIds.map(async (column) => {
            const taskIds = await SprintColumnService.getSprintColumn(column.id, sprintId)
            console.log(`check ::`, taskIds)
            const tasks = taskIds.taskIds.map((taskId) => {
                return getTaskById(taskId)
                    .then((task) => { return task })

            })
            return {
                ...column,
                taskIds: taskIds.taskIds,
                tasks: await Promise.all(tasks)
            }

        })

        return await Promise.all(results);
    }
    assignTask = async ({ userId, taskId }) => {
        const task = Task.findById(new Types.ObjectId(taskId)).lean();
        if (!task) throw new BadRequestError("not find task");
        return task.updateOne({
            asignee: new Types.ObjectId(userId)
        })
    }
    updateTaskInColumn = async ({ prevColumnId, taskId, nextColumnId, SprintId }) => {
        const preSprintColumn = await SprintColumnService.getSprintColumn(prevColumnId, SprintId);
        console.log(`Check 1 ::`, preSprintColumn)
        const task = await getTaskById(taskId);

        await preSprintColumn.updateOne({
            $pull: {
                taskIds: new Types.ObjectId(taskId)
            }
        })
        const nextSprintColumn = await SprintColumnService.getSprintColumn(nextColumnId, SprintId);
        await nextSprintColumn.updateOne({
            $push: {
                taskIds: new Types.ObjectId(taskId)
            }
        })
        const column = await ColumnService.getColumnById(nextColumnId)
        const taskUpdate = await task.updateOne({
            ColumnId: new Types.ObjectId(nextColumnId),
            status: covertText(column.title)
        })
        return taskUpdate

    }
    // chua test 
    updateTitleTask = async (taskId, value) => {
        const task = await getTaskById(taskId);
        if (!task) throw new BadRequestError("Task not found");
        const taskUpdate = await task.updateOne({
            title: value
        })
        return taskUpdate;
    }
    countTaskInSprint = async (sprintId, projectId) => {
        const project = await getProjectById(projectId);
        project.SprintIds.map(async (item) => {

        })
    }

    getTaskBySprintId = async ({ sprintId }) => {
        const task = await Task.find({
            SprintId: sprintId
        })

        return task;
    }

    updateStatus = async ({ taskId, status }) => {

        const task = await getTaskById(taskId);
        const updateTask = await task.updateOne({
            status: status
        })
        return updateTask
    }

    updateDesc = async ({ taskId, desc }) => {

        const task = await getTaskById(taskId);
        const updateTask = await task.updateOne({
            description: desc
        })
        return updateTask
    }
    deleteTaskBySprintId = async (SprintId) => {
        try {
            await Task.deleteMany({
                SprintId: new Types.ObjectId(SprintId)
            })
        } catch (error) {
            throw new BadRequestError("Delete task by sprintId Error")
        }
    }

}
module.exports = new TaskService();