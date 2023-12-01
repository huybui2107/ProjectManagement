'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { authentication } = require('../../auth/authUntils');
//singUp
/**
 * @openapi
 * /user/register:
 *  post:
 *    description: Register
 *    tags:
 *      - User
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/register', asyncHandler(UserController.signup));
// login
/**
 * @openapi
 * /user/login:
 *  post:
 *    description: Login
 *    tags:
 *      - User
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/login', asyncHandler(UserController.login));


// authentication 
router.use(authentication)


// router.post('/shop/logout',asyncHandler(AccessController.logout));

/**
 * @openapi
 * /user/refreshToken:
 *  post:
 *    description: Get access token
 *    tags:
 *      - User
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/refreshToken', asyncHandler(UserController.handleRefreshToken));

/**
 * @openapi
 * /user/logout:
 *  post:
 *    description: Logout
 *    tags:
 *      - User
 *    requestBody:
 *       description : Information
 * 
 * 
 */
router.post('/logout', asyncHandler(UserController.logout));
module.exports = router;