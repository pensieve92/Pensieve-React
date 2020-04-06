import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarPane from "components/board/CalendarPane";
import * as calendarActions from 'store/modules/calendar';
import { bindActionCreators } from "redux";
import moment from 'moment';
import { Map, List } from 'immutable';

class CalendarContainer extends Component {

    // 캘린더 날짜 셋팅
    setCalendar = (thisMonth = moment().format('YYYYMM')) => { // null일 경우 오늘날짜를 default값으로 지정
        const daysInMonth =  moment(thisMonth, "YYYYMM").daysInMonth(); // 해당 월의 일수 : 31
        const startDate = thisMonth + "01";             // date: 날짜(num)
        const startDay = parseInt(moment(startDate).format('e')); // day : 요일 [return 0 ~ 6 (String)]
        const boxsInMonth = daysInMonth + startDay; // 최소 박스수: 해당월의 일수 + 시작요일 
    
        // 배열만들기 1차원으로 만들기!! 
        let calendarArray = List([]);
        let date = 1;
        while( date < boxsInMonth + 1){ 
            calendarArray = calendarArray.push(date - startDay);
            date++;
        }

        // 전달의 일수
        const daysInLastMonth =  moment(thisMonth, "YYYYMM").subtract(1, 'months').daysInMonth();       

        // 전달 날짜 업데이트 
        if(startDay > 0) {
        for(let i = 0 ; i < startDay ; i ++){
            calendarArray = calendarArray.set(i, daysInLastMonth - startDay + 1 + i);
            }
        }

        // 다음달 날짜 업데이트
        let nextMonthDate = 1;
        while(calendarArray.size < 42){ 
            calendarArray = calendarArray.push(nextMonthDate);
            nextMonthDate++;
        }

        return calendarArray;
    }

    // 셀렉트 년도 만들기     
    setSelectMonth = () => {
        console.log("--------------setSelectMonth----------");
        let selectMonth = Map({})
        // let yearList = List( [ Map({value: 1}) ])
        let yearList = List([0, 1])
        selectMonth = selectMonth.set(yearList);
        return selectMonth;
    }

    handleInitailize = () => {
        console.log("------------------handleInitalize ------------")
        const { CalendarActions, thisMonth } = this.props; 
        const calendar = this.setCalendar(thisMonth);    

        // const selectMonth = this.setSelectMonth();      
        const {selectMonth} = this.setSelectMonth(); // 이건 전달자체가 안됨
        
       
        CalendarActions.initialize( { thisMonth: thisMonth, calendar: calendar, selectMonth: selectMonth} ); 

        // 전달할려는 변수            ** 변수 타입 확인 잘하기 **
        // CalendarActions.initialize( { thisMonth } ); 
        // {thisMonth} : const { thisMonth } = action.payload
        
        // CalendarActions.initialize( thisMonth ); 
        // thisMonth   : const thisMonth = action.payload
    }

    handleNextMonth = () => {
        const { CalendarActions, thisMonth } = this.props;      
        // thisMonth  = moment(moment(thisMonth, "YYYYMM").add(1, 'months'), 'YYYYMM');
        // console.log("nextMonth: ", nextMonth);
        // calendar = this.setCalendar( moment(moment(thisMonth, "YYYYMM").add(1, 'months'), 'YYYYMM') );
        // CalendarActions.nextMonth( { thisMonth, calendar: this.setCalendar(thisMonth) } );

        const nextMonth = moment(moment(thisMonth, "YYYYMM").add(1, 'months'), 'YYYYMM').format('YYYYMM');
        const nextCalendar = this.setCalendar(moment(moment(thisMonth, "YYYYMM").add(1, 'months'), 'YYYYMM').format('YYYYMM'));

        CalendarActions.nextMonth( { thisMonth: nextMonth, calendar: nextCalendar } );        
    }

    handleLastMonth = () => {       
        const { CalendarActions, thisMonth } = this.props;      
        const nextMonth = moment(moment(thisMonth, "YYYYMM").subtract(1, 'months'), 'YYYYMM').format('YYYYMM');
        const nextCalendar = this.setCalendar(moment(moment(thisMonth, "YYYYMM").subtract(1, 'months'), 'YYYYMM').format('YYYYMM'));

        CalendarActions.lastMonth( { thisMonth: nextMonth, calendar: nextCalendar } );       
    }

    handleSelectMonth = ({selectMonth}) => {       
    }

    render() {       
        console.log("--------------------containder render----------------------------")
        const { thisMonth, calendar, selectMonth } = this.props;        
        const { handleNextMonth, handleLastMonth, handleSelectMonth, handleInitailize } = this;
        console.log("thisMonth", thisMonth)
        console.log("calendar", calendar);
        return (
            <CalendarPane       
                thisMonth = {thisMonth}    
                calendar = {calendar}
                selectMonth = {selectMonth}
                onInitialize = {handleInitailize}
                onNextMonth={handleNextMonth} 
                onLastMonth={handleLastMonth}
                onSelectMonth={handleSelectMonth}
            />
        );
    }
}

export default connect(
    (state) => ({
        // thisMonth: state.get('thisMonth')
        thisMonth: state.calendar.getIn(['thisMonth', 'YYYYMM']),
        calendar: state.calendar.getIn(['thisMonth', 'calendar']),
        selectMonth: state.calendar.get('selectMonth')        
        // thisMonth: state.calendar
    }),
    (dispatch) => ({
        CalendarActions: bindActionCreators(calendarActions, dispatch)
    })
)(CalendarContainer)