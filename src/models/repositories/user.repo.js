'use strict'
const User = require('../user.model');
const { Types } = require('mongoose')




const getUserByEmail = async (email) => {
    return await User.findOne({
        email: email
    })
}


module.exports = {
    getUserByEmail

}