const express = require('express');
const router = express.Router()

const auth = require('../controllers/auth.controller')
const commons = require('../controllers/commons.controller')
const plans = require('../controllers/events.controller')
//const upload = require('../config/multer.config')
router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)
router.get('/logout', auth.logout)
router.get('/', commons.home)
/* router.get('/user-profile/:id/edit', user.userProfileEdit)
router.post('/user-profile/:id/edit', upload.single('avatar'), user.userProfileDoEdit)
router.get('/user-profile/:id', user.userProfile)
 */

router.get('/events', plans.list)

router.get('/events/create', plans.create)
router.post('/events/create', plans.doCreate)

router.get('/events/:id/edit', plans.edit)
router.post('/events/:id', plans.doEdit)

router.get('/events/:id', plans.detail)

module.exports = router