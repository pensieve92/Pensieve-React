import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

import moment from 'moment';

// action type
const INITIALIZE = 'calendar/INITIALIZE';
const NEXT_MONTH = 'calendar/NEXT_MONTH';
const LAST_MONTH = 'calendar/LAST_MONTH';


// action creators
export const initialize = createAction(INITIALIZE);
export const nextMonth = createAction(NEXT_MONTH);
export const lastMonth = createAction(LAST_MONTH);


// initial state = state.calendar
const initialState = Map({    
    thisMonth: Map({
        YYYYMM: moment().format('YYYYMM'),
        calendar: List([])
    }),
    selectMonth: Map({
         
    })
})



// reducer
export default handleActions({
    //[INITIALIZE]: (state, action) => initialState,
    [INITIALIZE]: (state, action) => {
        // 받는 변수 ** 타입확인 잘하기 **
        const { thisMonth, calendar, selectMonth } = action.payload;
        //const thisMonth = action.payload;            
       console.log("--------------module initalize action--------------")  
     
       return state.setIn(['thisMonth','YYYYMM'], thisMonth)
                   .setIn(['thisMonth', 'calendar'], calendar)                    
                   .set('selecMonth', selectMonth)                 
    },  
    [NEXT_MONTH]: (state, action) => {
        const { thisMonth, calendar } = action.payload;   
        // const nextMonth = moment(thisMonth, "YYYYMM").subtract(1, 'months')                 
        console.log(action);
        return state.setIn(['thisMonth','YYYYMM'], thisMonth)
                    .setIn(['thisMonth', 'calendar'], calendar)
                    .setIn(['selectMonth', 'YYYY'], thisMonth.substr(0,4))
                    .setIn(['selectMonth', 'MM'], thisMonth.substr(4))

                    //.setIn(['thisMonth', 'calendar'], calendar);
    },
    [LAST_MONTH]: (state, action) => {
        const { thisMonth, calendar } = action.payload;   
        return state.setIn(['thisMonth','YYYYMM'], thisMonth)
                    .setIn(['thisMonth', 'calendar'], calendar)
                    .setIn(['selectMonth', 'YYYY'], thisMonth.substr(0,4))
                    .setIn(['selectMonth', 'MM'], thisMonth.substr(4))
                    //.setIn(['thisMonth', 'calendar'], calendar);
    },      
}, initialState)
