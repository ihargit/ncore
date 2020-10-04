import chalk from 'chalk';

export default function getMethodProxy(obj) {
    const handler = {
        get(target, propKey) {
            const propValue = Reflect.get(...arguments);
            if (typeof propValue !== 'function') {
                return propValue;
            }
            return async function helper() {
                const funcArgs = Object.values(arguments);
                const logMessage = [
                    `${chalk.green('Method:')} ${propKey}`,
                    funcArgs.length ? `${chalk.green('arguments:')} ${funcArgs.join(', ')}` : ''
                ].join(', ');
                console.log(logMessage);
                try {
                    return await propValue.bind(this, arguments);
                } catch (e) {
                    const errorMessage = [
                        `${chalk.red('Method:')} ${propKey}`,
                        funcArgs.length ? `${chalk.red('arguments:')} ${funcArgs.join(', ')}` : '',
                        `${chalk.red('Error message:')} ${e.message}`
                    ].join(', ');
                    console.log(errorMessage);
                    throw e;
                }
            };
        }
    };
    return new Proxy(obj, handler);
}
