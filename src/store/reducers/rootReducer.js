import { combineReducers } from 'redux';

import businessBuilder from './businessBuilder';
import stopWatch from './stopWatch';
import auth from './auth';
import siteOptions from './siteOptions';


const rootReducer = combineReducers({
	businessBuilder: businessBuilder,
	stopWatch: stopWatch,
	auth: auth,
	siteOptions: siteOptions
});

export default rootReducer;