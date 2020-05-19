import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import rootReducer from './store/reducers/rootReducer';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxMulti from 'redux-multi';
import thunk from 'redux-thunk';
import fbConfig from './config/fbConfig';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
				rootReducer, 
				composeEnhancers(applyMiddleware(thunk, reduxMulti))
			)

const app = (
		<Provider store={store}>
			<App />
		</Provider>
	)

ReactDOM.render(app, document.getElementById('root'));
