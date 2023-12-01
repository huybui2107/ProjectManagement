'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response');
const ColumnService = require('../service/column.service');


class ColumnController {
    createColumn = async (req, res, next) => {
        new CREATED({
            message: 'Create Ok',
            metadata: await ColumnService.createColumn(req.body)
        }).send(res);
    }
    getTitle = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get Title OK',
            metadata: await ColumnService.getTitleOfColumn(req.params)
        }).send(res);
    }
}





module.exports = new ColumnController();