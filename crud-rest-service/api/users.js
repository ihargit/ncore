import express from 'express';
const router = express.Router();
import UserService from '../services/user';
import userModel from '../models/user';
import createError from 'http-errors';
const userService = new UserService(userModel);

router.route('/')
    .get(async (req, res, next) => {
        const { limit, loginSubstring } = req.query;
        if (!limit && !loginSubstring) {
            return next();
        }
        const usersData = await userService.getAutoSuggestUsers(loginSubstring, limit);
        return usersData
            ? res.json(usersData)
            : next(createError(404, 'No users found'));
    })
    .get(async (req, res, next) => {
        const usersData = await userService.getUsers();
        console.log(usersData);
        return usersData
            ? res.json(usersData)
            : next(createError(404, 'No users found'));
    })
    .post(async (req, res, next) => {
        const userData = await userService.createUser(req.body);
        return userData ? res.json(userData) : next();
    });

router.route('/:id')
    .get(async (req, res, next) => {
        const userData = await userService.getUser(req.params.id);
        return userData
            ? res.json(userData)
            : next(createError(404, `User with id ${req.params.id} not found`));
    })
    .put(async (req, res, next) => {
        const userData = await userService.updateUser(req.params.id, req.body);
        return userData
            ? res.json(userData)
            : next(createError(404, `User with id ${req.params.id} not found`));
    })
    .delete(async (req, res, next) => {
        const done = await userService.deleteUser(req.params.id);
        return done
            ? res.json(done)
            : next(createError(404, `User with id ${req.params.id} not found`));
    });

export default router;
