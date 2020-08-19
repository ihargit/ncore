import express from 'express';
const router = express.Router();
import UserService from '../services/user';
import userModel from '../models/user';
const userService = new UserService(userModel);

router.get('/:id', (req, res) => {
    const userData = userService.getUser(req.params.id);
    res.json(userData);
});

router.get('/', (req, res) => {
    res.send('Please, specify user id');
});

export default router;
