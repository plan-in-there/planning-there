const express = require('express');
const router = express.Router()

const auth = require('../controllers/auth.controller')
const commons = require('../controllers/commons.controller')
const plans = require('../controllers/events.controller')
const user = require('../controllers/user.controller')
const upload = require('../config/multer.config')
const secure = require('../middlewares/secure.mid')
const match = require('../controllers/match.controller')

router.get('/register', secure.isNotAuthenticated, auth.register)
router.post('/register', secure.isNotAuthenticated, auth.doRegister)
router.get('/login', secure.isNotAuthenticated, auth.login)
router.post('/login', secure.isNotAuthenticated, auth.doLogin)
router.get('/logout', secure.isAuthenticated, auth.logout)
router.get('/authenticate/google', secure.isNotAuthenticated,  auth.loginWithGoogle);
router.get('/authenticate/google/cb', auth.doLoginWithGoogle);
//router.get('/authenticate/facebook', secure.isNotAuthenticated,  auth.loginWithGoogle);
//router.get('/authenticate/facebook/cb', auth.doLoginWithGoogle);

router.get('/', commons.home)
router.get('/privacy-terms', commons.privacyTerms)

router.get('/user-profile/me/edit', secure.isAuthenticated, user.userProfileEdit)
router.post('/user-profile/me/edit', secure.isAuthenticated, upload.single('avatar'), user.userProfileDoEdit)
router.get('/user-profile/my-events', user.matchedEvents)
router.get('/user-profile/:id', user.userProfile)


router.get('/events', plans.list)
router.get('/events/create', plans.create)
router.post('/events/create', upload.single('image'), plans.doCreate)
router.get('/events/:id/edit', plans.edit)
router.post('/events/:id/edit', upload.single('image'),plans.doEdit)
router.get('/events/:id', plans.detail)
router.post('/events/match/:id', match.like)
router.post('/events/:id/delete', plans.delete)

module.exports = router
