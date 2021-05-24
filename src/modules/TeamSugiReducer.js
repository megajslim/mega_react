import { handleActions, createAction } from 'redux-actions'
import { pender } from 'redux-pender'
import { Map } from 'immutable'
import { isUndefined } from 'lodash/lang'
import ActionTypes from '../actionTypes'
import * as api from '../utils/api'

const REQ_TEAMSUGIINFO = ActionTypes.req.TeamSugiInfo
const REQ_DELETESUGI = ActionTypes.req.DeleteSufi
const REQ_SAVESUGI = ActionTypes.req.SaveSugi

export const sugiInfo = createAction(REQ_TEAMSUGIINFO, api.getTeamSugi)
export const deleteSugi = createAction(REQ_DELETESUGI, api.deleteTeamSugi)
export const saveSugi = createAction(REQ_SAVESUGI, api.saveTeamSugi)

const initialState = Map({results: Map({}) })

export default handleActions({
    ...pender({
        type: REQ_TEAMSUGIINFO,
        onSuccess: (state, action) => {
            if(isUndefined(action.payload)) {
                return state
            } else {
                let { data: results } = action.payload
                return state.set('results', results)
            }
        },
        onPending: (state, action) => state,
        onFailure: (state, action) => state,
        onCancel: (state, action) => state
    }),

    ...pender({
        type: REQ_DELETESUGI,
        onSuccess: (state, action) => {
            if(isUndefined(action.payload)) {
                return state
            } else {
                let { data: results } = action.payload
                return state.set('results', results)
            }
        },
        onPending: (state, action) => state,
        onFailure: (state, action) => state,
        onCancel: (state, action) => state
    }),

    ...pender({
        type: REQ_SAVESUGI,
        onSuccess: (state, action) => {
            if(isUndefined(action.payload)) {
                return state
            } else {
                let { data: results } = action.payload
                return state.set('results', results)
            }
        },
        onPending: (state, action) => state,
        onFailure: (state, action) => state,
        onCancel: (state, action) => state
    }),

    
}, initialState)