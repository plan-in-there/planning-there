const express = require('express');
const router = express.Router()

const auth = require('../controllers/auth.controller')
const commons = require('../controllers/commons.controller')

const plans = require('../controllers/events.controller')

router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)
router.get('/logout', auth.logout)
router.get('/', commons.home)



router.get('/create-event', plans.create)
router.post('/create-event', plans.doCreate)
module.exports = router