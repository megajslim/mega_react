import { combineReducers, applyMiddleware, createStore } from 'redux'
import penderMiddleware, { penderReducer } from 'redux-pender'
import apiTeamSugiReducer from '../modules/TeamSugiReducer'

const store =  createStore(
    combineReducers({
        pender: penderReducer,
        sugiInfo : apiTeamSugiReducer,
    }),
    applyMiddleware(penderMiddleware())
)
export default store