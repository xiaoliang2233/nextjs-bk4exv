import chalk from 'chalk';
import nextSession from 'next-session';

function log(eventName) {
  return function (context) {
    console.log(chalk.cyan(`${eventName} log: `));
    console.log(`
    requestPayload: ${chalk.red(stringify(context.requestPayload))}
    userData: ${chalk.yellow(stringify(context.userData))}
    viewDescriptor: ${chalk.green(stringify(context.responsePayload.VD))}
    content: ${chalk.magenta(stringify(context.responsePayload.content))}
    `);
    console.log(
      chalk.underline.bgRed(
        'inferenceResult: ',
        context.inferenceResult || 'undefined'
      )
    );
    return context;
  };
}

function stringify(data) {
  return JSON.stringify(data, '\n', 2);
}

// I don't know why cookie and session can't set properly.
// use memory instead.
const getSession = nextSession();

export { log, getSession };
