import express from 'express';
const router = express.Router();
import UserService from '../services/user';
import userModel from '../models/user';
import createError from 'http-errors';
import logMethodInfoProxy from '../utils/methodProxy';
const userServiceInstance = new UserService(userModel);
const userService  = logMethodInfoProxy(userServiceInstance);

router.route('/')
    .post(async (req, res, next) => {
        const userData = await userService.createUser(req.body);
        if (userData instanceof Error && userData.name === 'ValidationError') {
            return next(createError(400, userData.message));
        }
        return userData ? res.json(userData) : next();
    });

export default router;
