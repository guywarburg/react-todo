import { applyMiddleware, createStore } from 'redux';

import  {middleware} from './middlewares/todos.middleware'
import rootReducer from  './reducers/index';

export default createStore(rootReducer, {}, applyMiddleware(middleware));