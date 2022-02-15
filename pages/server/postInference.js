import Q from 'q';
import cookie from 'cookie';
import VDs from '../VD';
import { log, getSession, setCache } from './utils';
import content from './content';

function postInference(context) {
  return [
    // log('postInference start'),
    // prepare viewDescriptor data.
    setViewDescriptor,
    // prepare content.
    setContent,
    // update data in server, for the next inference.
    updateSession,
    // http response.
    responseDataToClient,
    log('postInference end'),
  ].reduce(Q.when, Q(context));
}

function setViewDescriptor(context) {
  const { responsePayload, inferenceResult } = context;
  responsePayload.VD = VDs[inferenceResult];
  responsePayload.inferenceResult = inferenceResult;
  return context;
}

function setContent(context) {
  const { responsePayload, inferenceResult } = context;
  responsePayload.content = {
    ...content.common,
    ...content[inferenceResult],
  };
  return context;
}

function updateSession(context) {
  const { userData, token, responsePayload } = context;
  setCache(token, userData);
  responsePayload.token = token;
  return context;
}

function responseDataToClient(context) {
  const { responsePayload, res } = context;
  // I don't know why this don't work in stackblitz, only worked in local loptop.
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', Math.floor(Math.random() * 10000000), {
      httpOnly: true,
    })
  );
  res.status(200).json(responsePayload);
  return context;
}

export default postInference;
