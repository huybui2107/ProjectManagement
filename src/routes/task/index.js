'use strict';
const express = require('express');
const router = express.Router();
const TaskController = require('../../controllers/task.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { authentication } = require('../../auth/authUntils');




// authentication 
router.use(authentication)


/**
 * @openapi
 * /task/project/:idproject:
 *  post:
 *    summary: Create task in project   
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/project/:idproject', asyncHandler(TaskController.createTask));
/**
 * @openapi
 * /task/project/:projectId/sprint/:sprintId:
 *  get:
 *    summary: Get task by Column Id
 *    description: get task
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.get('/project/:projectId/sprint/:sprintId', asyncHandler(TaskController.getTaskByColumnId));
/**
 * @openapi
 * /task/sprint/:sprintId:
 *  get:
 *    summary: Get task by Sprint Id
 *    description: get task
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.get('/sprint/:sprintId', asyncHandler(TaskController.getTaskBySprintId));
/**
 * @openapi
 * /task/assign:
 *  patch:
 *    summary: Assign task for user
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/assign', asyncHandler(TaskController.assignTask));
/**
 * @openapi
 * /task/sprint/:sprintId/column:
 *  patch:
 *    summary: Update task in column
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/sprint/:sprintId/column', asyncHandler(TaskController.updateTaskInColumn));
/**
 * @openapi 
 * /task/title:
 *  patch:
 *    summary: Update title task
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/title', asyncHandler(TaskController.updateTaskTitle));
/**
 * @openapi
 * /task/status:
 *  patch:
 *    summary: Update status task
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/status', asyncHandler(TaskController.updateStatus));
/**
 * @openapi
 * /task/description:
 *  patch:
 *    summary: Update description task
 *    tags:
 *      - Task
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/description', asyncHandler(TaskController.updateDesc));
module.exports = router;