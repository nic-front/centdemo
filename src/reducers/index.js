import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import home from './homeReducer';

const rootReducer = combineReducers({
	home,
  fuelSavings
});

export default rootReducer;
