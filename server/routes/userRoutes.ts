import express from 'express';
const { getUser, getUsers, deleteUser, updateUser, createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.post('/users/delete/:id', deleteUser);
router.post('/users/update/:id', updateUser);
router.post('/users/add', createUser);

export default router;