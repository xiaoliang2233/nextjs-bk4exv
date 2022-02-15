// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const path = require('path');
const Q = require('q');
import {
  createContext,
  preInference,
  inference,
  postInference,
} from '../server';

export default (req, res) => {
  const context = createContext(req, res);
  return [
    // prepare for inference. most of functions inside it are organize the data
    preInference,
    // use rule engine and supported data to infer which is the next page the user will navigate
    inference,
    // collect data for responsing to client.
    postInference,
  ]
    .reduce(Q.when, Q(context))
    .then(() => {
      console.log('done');
    })
    .catch((err) => {
      console.log('error catch', err);
    });
};
