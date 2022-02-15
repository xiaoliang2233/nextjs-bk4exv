import Q from 'q';
import nools from 'nools';
import { Context } from './createContext';
import { log } from './utils';

const rule = require('./rule');

function inference(context) {
  return [
    // log('inference start'),
    getFlow,
    useRuleEngineToInferencePage,
    setDefauleVd,
    // log('inference end'),
  ].reduce(Q.when, Q(context));
}

function useRuleEngineToInferencePage(context) {
  const { flow } = context;
  const session = flow.getSession(context);
  return session.match().then(
    function () {
      session.dispose();
      return context;
    },
    (err) => {
      session.dispose();
      console.log('session error', err);
      return context;
    }
  );
}

function getFlow(context) {
  const name = 'selectPage';
  if (nools.hasFlow(name)) {
    nools.deleteFlow(name);
  }
  context.flow = nools.compile(rule, {
    define: {
      Context,
    },
    scope: {
      log: console.log,
    },
    name,
  });
  return context;
}

function setDefauleVd(context) {
  if (!context.inferenceResult) {
    context.inferenceResult = 'mobile';
  }
  return context;
}

export default inference;
