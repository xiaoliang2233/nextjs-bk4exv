import chalk from 'chalk';
import nextSession from 'next-session';
import lruCache from 'lru-cache';

function getCacheInstance() {
  if (!global.cache) {
    global.cache = new lruCache({
      max: 10,
      ttl: 1000 * 60,
    });
  }
  return global.cache;
}

function log(eventName) {
  return function (context) {
    console.log(chalk.cyan(`${eventName} log: `));
    console.log(`
    requestPayload: ${chalk.red(stringify(context.requestPayload))}
    userData: ${chalk.yellow(stringify(context.userData))}
    viewDescriptor: ${chalk.green(stringify(context.responsePayload.VD))}
    content: ${chalk.magenta(stringify(context.responsePayload.content))}
    token: ${chalk.magenta(stringify(context.token))}
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

// I don't know why cookie and session can't be set properly in Stackblitz
// so I don't plan use it.
const getSession = nextSession();

function getCache(context) {
  const cache = getCacheInstance();
  const {
    requestPayload: { token },
  } = context;
  if (token && cache.has(token)) {
    context.token = token;
  } else {
    const newToken = Math.floor(Math.random() * 10000000);
    cache.set(newToken, {});
    context.token = newToken;
  }
  return cache.get(token);
}

function setCache(key, value) {
  const cache = getCacheInstance();
  cache.set(key, value);
}

export { log, getSession, getCache, setCache };
