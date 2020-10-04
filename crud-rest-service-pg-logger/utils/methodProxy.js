import chalk from 'chalk';

export default function getMethodProxy(obj) {
    const handler = {
        get(target, propKey) {
            const propValue = Reflect.get(...arguments);
            if (typeof propValue !== 'function') {
                return propValue;
            }
            return function helper() {
                const funcArgs = Object.values(arguments);
                const logMessage = [
                    `${chalk.green('Method:')} ${propKey}`,
                    funcArgs.length ? `${chalk.green('arguments:')} ${funcArgs.join(', ')}` : ''
                ].join(', ');
                console.log(logMessage);
                return propValue.apply(this, arguments);
            };
        }
    };
    return new Proxy(obj, handler);
}
