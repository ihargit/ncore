import express from 'express';
import * as jwt from 'jsonwebtoken';
const router = express.Router();
import UserService from '../services/user';
import userModel from '../models/user';
import createError from 'http-errors';
import logMethodInfoProxy from '../utils/methodProxy';
const userServiceInstance = new UserService(userModel);
const userService  = logMethodInfoProxy(userServiceInstance);

router.route('/')
    .post(async (req, res, next) => {
        const { username, password } = req.body;
        const userData = await userService.getUserByCredentials(username, password);
        if (!userData) {
            return next(createError(403));
        }
        const accessToken = jwt.sign({ user: userData.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return res.json({ accessToken });
    });

export default router;
