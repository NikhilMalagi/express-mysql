const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/addUser',userController.addUser);
router.get('/getAllUsers',userController.getAllUser);
router.delete('/deleteUser/:id',userController.deleteUser);
router.delete('/deleteAllUser',userController.deleteAllUser);

module.exports = router;