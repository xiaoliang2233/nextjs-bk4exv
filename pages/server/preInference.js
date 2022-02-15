import Q from 'q';
import { log, getSession, getCache } from './utils';

function preInference(context) {
  return [
    log('preInference start'),
    // some data had stored in servrt, retrive it to take part into the calculation of rule engine.
    getUserDataFromSession,
    // user request data.
    getUserDataFromRequestPayload,
    // create account if all data is collected.
    createAccount,
    // log('preInference end'),
  ].reduce(Q.when, Q(context));
}
function getUserDataFromSession(context) {
  const { req, res } = context;
  const userData = getCache(context);
  Object.assign(context.userData, userData);
  return context;
}
function getUserDataFromRequestPayload(context) {
  const {
    userData,
    requestPayload: { fields },
  } = context;
  Object.assign(userData, {
    ...fields,
  });
  return context;
}

function createAccount(context) {
  const {
    userData: { mobileNumber, email, name },
  } = context;
  if (mobileNumber && email && name) {
    // create account...
    // set to null means create acoount failed, will navigate to error page.
    // see rule.js to see the specific rule.
    context.accountId = Math.random() > 0.5 ? Math.random() : null;
  }
  return context;
}
export default preInference;
