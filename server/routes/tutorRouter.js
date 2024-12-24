const Router = require('express');
const router = new Router();
const tutorController = require('../controllers/tutorController');

router.post('/registration', tutorController.registration);
router.post('/login', tutorController.login);


module.exports = router;
