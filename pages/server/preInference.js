import Q from 'q';
import { log, getSession } from './utils';

function preInference(context) {
  return [
    // log('preInference start'),
    // some data had stored in servrt, retrive it to take part into the calculation of rule engine.
    getUserDataFromSession,
    // user request data.
    getUserDataFromRequestPayload,
    // log('preInference end'),
  ].reduce(Q.when, Q(context));
}
async function getUserDataFromSession(context) {
  const { req, res } = context;
  const { userData = {} } = await getSession(req, res);
  console.log('djaijdaida', userData);
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
export default preInference;
