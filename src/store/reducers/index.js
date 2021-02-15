import { combineReducers } from 'redux';
import deck from './deck';
import players from './players';

export default combineReducers({ deck, players });
