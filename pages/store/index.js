import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import appActions from './actions';
import state from './state';

let store = createStore(reducer, state, applyMiddleware(thunk));

export { store, appActions };
