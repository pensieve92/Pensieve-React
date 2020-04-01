import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

import moment from 'moment';

// action type
const INITIALIZE = 'calendar/INITIALIZE';
const LAST_MONTH = 'calendar/LAST_MONTH';
const NEXT_MONTH = 'calendar/NEXT_MONTH';


// action creators
export const initialize = createAction(INITIALIZE);
export const nextMonth = createAction(NEXT_MONTH);


// initial state
const initialState = Map({    
    thisMonth: Map({
        YYYYMM: moment().format('YYYYMM'),
        calendar: List([])
    })
})

// reducer
export default handleActions({
    // [INITIALIZE]: (state, action) => initialState,
    // [LAST_MONTH]: (state, action) => {
    //     // state.thisMonth
    // },
    [NEXT_MONTH]: (state, action) => {
        const { thisMonth } = action.payload;    
        const nextMonth = moment(moment(thisMonth, "YYYYMM").add(1, 'months')).format('YYYYMM')
        return state.setIn(['thisMonth','YYYYMM'], nextMonth);
    },    
}, initialState)
