import express from 'express';
const router = express.Router();
import GroupService from '../services/group';
import UserGroupService from '../services/userGroup';
import groupModel from '../models/group';
import userGroupModel from '../models/userGroup';
import createError from 'http-errors';
const groupService = new GroupService(groupModel);
const userGroupService = new UserGroupService(userGroupModel);

router.route('/')
    .get(async (req, res, next) => {
        const groupsData = await groupService.getGroups();
        return groupsData
            ? res.json(groupsData)
            : next(createError(404, 'No user groups found'));
    })
    .post(async (req, res, next) => {
        const { action } = req.query;
        if (!action && action !== 'add-users') {
            return next();
        }
        const groupIdOrError = await userGroupService.addUsersToGroup(req.body);
        if (groupIdOrError instanceof Error) {
            const { message, name } = groupIdOrError;
            let errorMessage = message;
            if (name === 'SequelizeForeignKeyConstraintError') {
                errorMessage = 'Error: no group or user(s) with such id(s)';
            }
            if (name === 'SequelizeUniqueConstraintError') {
                errorMessage = 'Error: some group/user pair(s) already exist (duplicates)';
            }
            return next(createError(400, errorMessage));
        }
        const groupData = await groupService.getGroup(groupIdOrError);
        // return group with all users matched
        return groupData
            ? res.json(groupData)
            : next(createError(404, `Group with id ${groupIdOrError} not found`));
    })
    .post(async (req, res, next) => {
        const groupData = await groupService.createGroup(req.body);
        if (groupData instanceof Error && groupData.name === 'ValidationError') {
            return next(createError(400, groupData.message));
        }
        return groupData ? res.json(groupData) : next();
    });

router.route('/:id')
    .get(async (req, res, next) => {
        const groupData = await groupService.getGroup(req.params.id);
        return groupData
            ? res.json(groupData)
            : next(createError(404, `Group with id ${req.params.id} not found`));
    })
    .put(async (req, res, next) => {
        const groupData = await groupService.updateGroup(req.params.id, req.body);
        if (groupData instanceof Error && groupData.name === 'ValidationError') {
            return next(createError(400, groupData.message));
        }
        return groupData
            ? res.json(groupData)
            : next(createError(404, `Group with id ${req.params.id} not found`));
    })
    .delete(async (req, res, next) => {
        const done = await groupService.deleteGroup(req.params.id);
        return done
            ? res.json(done)
            : next(createError(404, `Group with id ${req.params.id} not found`));
    });

export default router;
