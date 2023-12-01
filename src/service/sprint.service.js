'use strict'
const Sprint = require('../models/sprint.model')
const Task = require('../models/sprint.model')
const { createTitleForSprint } = require('../utils/index')
const ProjectService = require('../service/project.service')
const SprintColumnService = require('../service/sprintColumn')
const TaskService = require('../service/task.service')
const { getProjectById, CountSprintOfProject } = require('../models/repositories/project.repo')
const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");
const { Types } = require('mongoose')
class SprintService {
  createSprint = async (data) => {
    console.log(data)
    const project = await getProjectById(data.projectId)
    if (!project) throw new BadRequestError("Find project fail")

    const number = await CountSprintOfProject(data.projectId)



    const newSprint = await Sprint.create({
      title: createTitleForSprint(project.title, number + 1),
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      projectId: data.projectId,
      status: data.status
    })
    if (!newSprint) throw new BadRequestError("create sprint fail")
    await project.updateOne({
      $push: {
        SprintIds: newSprint._id
      }
    })
    project.ColumnIds.map(async (item) => {
      await SprintColumnService.createSprintColumn({
        sprintId: newSprint._id,
        columnId: item
      })
    })

    return newSprint
  }

  getSprintByProjectId = async (id) => {
    // return await Sprint.find({
    //   projectId: new Types.ObjectId(id)
    // }).lean()
    return await Sprint.aggregate([
      {
        $match: {
          projectId: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'Tasks',
          localField: '_id',
          foreignField: 'SprintId',
          as: 'tasks'
        },

      },
      {

        $project: {
          _id: 1,
          title: 1,
          description: 1,
          start_date: 1,
          end_date: 1,
          status: 1,
          "tasks._id": 1,
          "tasks.name": 1,
          "tasks.numberTask": 1,
          "tasks.issue": 1,
          "tasks.description": 1,
          "tasks.status": 1,
          "tasks.owner": 1,

          numberOfDone: {
            $size: {
              $filter: {
                input: '$tasks',
                as: 'task',
                cond: { $eq: ['$$task.status', 'Done'] },
              },
            },
          },
          numberOfProgress: {
            $size: {
              $filter: {
                input: '$tasks',
                as: 'task',
                cond: { $eq: ['$$task.status', 'In Progress '] },
              },
            },
          },
          numberOfToDo: {
            $size: {
              $filter: {
                input: '$tasks',
                as: 'task',
                cond: { $eq: ['$$task.status', 'TO DO'] },
              },
            },
          },
        }
      }



    ])
  }
  updateStatus = async ({ id, status }) => {
    return await Sprint.updateOne({
      _id: new Types.ObjectId(id)
    }, {
      status: status
    }).lean()
  }
  updateSprint = async (data) => {
    const start_date = new Date(data.start_date);
    const end_date = new Date(data.end_date);
    if (start_date > end_date) throw new BadRequestError("The start date cannot be greater than the end date.")
    try {
      const res = Sprint.updateMany({
        _id: new Types.ObjectId(data.sprintId)
      }, {
        $set: {
          title: data.title,
          description: data.desc,
          start_date: data.start_date,
          end_date: data.end_date,
        }
      })
      return res
    } catch (error) {
      throw new BadRequestError("Update sprint Error")
    }
  }
  deleteSprint = async ({ projectId, sprintId }) => {
    try {
      await ProjectService.DeleteSprintInProject(projectId, sprintId)
      await TaskService.deleteTaskBySprintId(sprintId)
      await Sprint.findByIdAndRemove(new Types.ObjectId(sprintId))
    } catch (error) {
      throw new BadRequestError("Delete Sprint Error")
    }
  }

}

module.exports = new SprintService();