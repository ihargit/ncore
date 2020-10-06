import chalk from 'chalk';

const requestLogger =  (req, res, next) => {
    const message = [
        `${chalk.green('Method:')} ${req.method}`,
        `${chalk.green('params:')} ${JSON.stringify(req.params)}`
    ].join(', ');
    console.log(message);
    next();
};

export default requestLogger;
