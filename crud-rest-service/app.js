import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';

import indexRouter from './api/index';
import usersRouter from './api/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    const { message, status, stack } = err;
    res.json({ message, status, stack });
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`App started on port ${port}`));
