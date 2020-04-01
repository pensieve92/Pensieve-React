import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarPane from "components/board/CalendarPane";
import * as calendarActions from 'store/modules/calendar';
import { bindActionCreators } from "redux";

class CalendarContainer extends Component {
    handleNextMonth = () => {
        const { CalendarActions, thisMonth } = this.props;        
        CalendarActions.nextMonth( { thisMonth } );
    }

    handleLastMonth = () => {
        const { CalendarActions, thisMonth  } = this.props;
        CalendarActions.lastMonth({thisMonth});
    }

    handleSelectMonth = ({selectMonth}) => {
        const { CalendarActions } = this.props;
        CalendarActions.selectMonth({selectMonth});
    }

    render() {       

        const { thisMonth } = this.props;        
        const { handleNextMonth, handleLastMonth, handleSelectMonth } = this;

        return (
            <CalendarPane       
                thisMonth = {thisMonth}         
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
        thisMonth: state.calendar.getIn(['thisMonth', 'YYYYMM'])        
    }),
    (dispatch) => ({
        CalendarActions: bindActionCreators(calendarActions, dispatch)
    })
)(CalendarContainer)