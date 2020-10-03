import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';

import indexRouter from './api/index';
import usersRouter from './api/users';
import groupsRouter from './api/groups';

const app = express();
const { PORT, NODE_ENV } = process.env;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500);
    const { message, status, stack } = err;
    res.json({ message, status, stack: NODE_ENV === 'dev' ? stack : undefined });
});

const port = PORT || '3000';
app.listen(port, () => console.log(`App started on port ${port}`));
