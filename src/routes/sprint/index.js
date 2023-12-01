'use strict';
const express = require('express');
const router = express.Router();
const SprintController = require('../../controllers/sprint.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { authentication } = require('../../auth/authUntils');




// authentication 
router.use(authentication)


/**
 * @openapi
 * /sprint/project/:idproject:
 *  post:
 *    summary: Create sprint in project
 *    tags:
 *      - Sprint
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/project/:idproject', asyncHandler(SprintController.createSprint));
/**
 * @openapi
 * /sprint/status:
 *  patch:
 *    summary: Update status sprint
 *    tags:
 *      - Sprint
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/status', asyncHandler(SprintController.UpdateStatus));
/**
 * @openapi
 * /sprint:
 *  patch:
 *    summary: Update sprint
 *    tags:
 *      - Sprint
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/', asyncHandler(SprintController.UpdateSprint));
/**
 * @openapi
 * /sprint/:id:
 *  get:
 *    summary: Get sprint by project id
 *    tags:
 *      - Sprint
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.get('/:id', asyncHandler(SprintController.GetSprintByProjectId));


/**
 * @openapi
 * /sprint/:sprintId/project/:projectId:
 *  delete:
 *    summary: Delete sprint
 *    tags:
 *      - Sprint
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.delete('/:sprintId/project/:projectId', asyncHandler(SprintController.DeleteSprint));
module.exports = router;