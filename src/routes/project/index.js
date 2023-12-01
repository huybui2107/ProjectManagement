'use strict';
const express = require('express');
const router = express.Router();
const ProjectController = require('../../controllers/project.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { authentication } = require('../../auth/authUntils');




// authentication 
router.use(authentication)
/**
 * @openapi
 * /project:
 *  get:
 *    summary: Get project by user id
 *    tags:
 *      - Project
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.get('/', asyncHandler(ProjectController.getProjectByUserId));

// router.post('/shop/logout',asyncHandler(AccessController.logout));

/**
 * @openapi
 * /project:
 *  post:
 *    summary: Create project
 *    tags:
 *      - Project
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/', asyncHandler(ProjectController.createProject));


/**
 * @openapi
 * /project/:id:
 *  patch:
 *    summary: Insert member to project
 *    tags:
 *      - Project
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.patch('/:id', asyncHandler(ProjectController.insertUserToProject));


/**
 * @openapi
 * /project/:id/member:
 *  get:
 *    summary: Get member in project
 *    tags:
 *      - Project
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.get('/:id/member', asyncHandler(ProjectController.getMemberInProject));
// router.get('/countsprint/:id',asyncHandler(ProjectController.getCountSprintOfProject));
module.exports = router;