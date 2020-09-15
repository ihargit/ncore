import express from 'express';
const router = express.Router();
import GroupService from '../services/group';
import groupModel from '../models/group';
import createError from 'http-errors';
const groupService = new GroupService(groupModel);

router.route('/')
    .get(async (req, res, next) => {
        const groupsData = await groupService.getGroups();
        return groupsData
            ? res.json(groupsData)
            : next(createError(404, 'No user groups found'));
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
