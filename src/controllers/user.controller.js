'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response');
const UserService = require('../service/user.service');


class UserController {
    signup = async (req, res, next) => {
        new CREATED({
            message: 'Registered Ok',
            metadata: await UserService.signUp(req.body)
        }).send(res);
    }
    login = async (req, res, next) => {

        new SuccessResponse({
            metadata: await UserService.login(req.body)
        }).send(res);
    }
    handleRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            massage: 'Get token success',
            metadata: await UserService.handleRefreshToken({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        }).send(res);

    }
    logout = async (req, res, next) => {
        new SuccessResponse({
            massage: 'Logout success',
            metadata: await UserService.logout(req.keyStore)
        }).send(res);
    }


}

module.exports = new UserController();