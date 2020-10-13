import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from './utils/logger';
import requestLogger from './utils/requestLogger';

import indexRouter from './api/index';
import usersRouter from './api/users';
import groupsRouter from './api/groups';
import loginRouter from './api/login';

const app = express();
const { PORT, NODE_ENV } = process.env;
const inProduction = NODE_ENV === 'prod';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (!inProduction) {
    app.use('*', requestLogger);
}
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/login', loginRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500);
    const { message, status, stack } = err;
    logger.error(message);
    res.json({ message, status, stack: NODE_ENV === 'dev' ? stack : undefined });
});

const port = PORT || '3000';
app.listen(port, () => console.log(`App started on port ${port}`));

function errorHandler(err) {
    logger.error(err.message);
    process.exit(1);
}
process.once('unhandledRejection', errorHandler);
process.once('uncaughtException', errorHandler);

