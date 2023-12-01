'use strict';
const express = require('express');
const router = express.Router();
const ColumnController = require('../../controllers/column.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { authentication } = require('../../auth/authUntils');




// authentication 
router.use(authentication)


/**
 * @openapi
 * /column:
 *  post:
 *    summary: Create column in project
 *    tags:
 *      - Column
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/', asyncHandler(ColumnController.createColumn));
/**
 * @openapi
 * /column/:id/title:
 *  get:
 *    summary: Get title in project
 *    tags:
 *      - Column
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.get('/:id/title', asyncHandler(ColumnController.getTitle))
module.exports = router;