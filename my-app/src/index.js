import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers'

const createStoreWithMidlleware = applyMiddleware(thunk, logger)(createStore)

const store = createStoreWithMidlleware(rootReducer);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <Route path='/' component={App}/>
        </Router>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
