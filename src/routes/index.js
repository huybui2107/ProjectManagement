const express = require('express');
const router = express.Router();


router.use('/user', require('./user'))
router.use('/project', require('./project'))
router.use('/sprint', require('./sprint'))
router.use('/column', require('./column'))
router.use('/task', require('./task'))
module.exports = router