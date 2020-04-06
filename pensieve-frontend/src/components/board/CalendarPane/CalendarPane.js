import React, { Component, Fragment } from 'react';
import styles from './CalendarPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import moment from 'moment';
import { Map, List } from 'immutable';



const cx = classNames.bind(styles);

class CalendarPane extends Component {
  state = {
    today: moment(),
    monthOfDay: moment(),
    calendar: Array(42).fill({}) // 초기값을 '' 으로 해놔서 배열로 인식된게 아니라 문자열로 인식해서 .map 이나 객체를 꺼내는데 계속 에러가 났었다 ㅠㅠ // 1차원 객체 배열    
  }

  initializeCalendar = () => {
    console.log("--------------comopent init--------------");
    this.setCalendar();
  }

  // 셀렉트 메뉴 열기
  handleOpen = () => {    
    const directSelct = document.getElementsByClassName('directSelct');
    const selectYear = document.querySelector('.directSelct-body .selectYear ul li.active');
    const selectMonth = document.querySelector('.directSelct-body .selectMonth ul li.active');

    for(var i=0; i< directSelct.length; i+=1){
      directSelct[i].style.display = 'block';
    }    

    // 해당 element 찾아서 scrollIntoView();
    selectYear.scrollIntoView();
    selectMonth.scrollIntoView();
  }
  // 셀렉트 메뉴 닫기
  handleCancel = () => {    
    const directSelct = document.getElementsByClassName('directSelct');
    for(var i=0; i< directSelct.length; i+=1){
      directSelct[i].style.display = 'none';
    }    
  }

  handleSelectMonth = (e) => {
    const selected = e.target
    selected.classList.toggle('active', true);
    console.log(e.target)
  }
  handleSelectYear = (e) => {
    const selected = e.target
    selected.classList.toggle('active', true);
    console.log(e.target)    
  }



  // 캘린더 날짜 셋팅
  setCalendar = ( today = moment() ) => { // null일 경우 오늘날짜를 default값으로 지정
    console.log("--------------------setCalendar------------------------")    

    const monthOfDay = today.clone();    
    const startWeek = monthOfDay.clone().startOf('month').week();
    // const endWeek = monthOfDay.clone().endOf('month').week() === 1 ? 53 : monthOfDay.clone().endOf('month').week();

    let calendar = [];
    for (let week = startWeek; week < startWeek + 6; week++){
      for (let date = 0; date < 7; date++){	
        calendar.push(
          {
            YYYYMMDD: monthOfDay.clone().week(week).startOf('week').add( date, 'day').format('YYYYMMDD'),
            YYYY: monthOfDay.clone().week(week).startOf('week').add( date, 'day').format('YYYY'),
            M: monthOfDay.clone().week(week).startOf('week').add( date, 'day').format('M'),
            D: monthOfDay.clone().week(week).startOf('week').add( date, 'day').format('D')
          }
        )
      }	
    }
    this.setState( {
       calendar: calendar,
       monthOfDay: monthOfDay
     } );
  }

  handleNextMonth = () => {    
    const monthOfDay = this.state.monthOfDay;
    const nextMonth = monthOfDay.add(1, 'month');
    this.setCalendar(nextMonth)
  }

  handleLastMonth = () => {
    const monthOfDay = this.state.monthOfDay;
    const lastMonth = monthOfDay.subtract(1, 'month');
    this.setCalendar(lastMonth)
  }

  componentDidMount() { // redux에서 state 가져오기
    this.initializeCalendar();
  } 

 
  render(){
    // render 안에서 화살표함수를 정의 할 수 없다
    // 대신 function을 만들어서 사용한다. !!!!!!
    console.log( "--------------comopent reder()--------------");    
    const { calendar, monthOfDay } = this.state;
    const { handleOpen, handleCancel, handleNextMonth, handleLastMonth, handleSelectMonth, handleSelectYear, setCalendar } = this;    
    
    function generateSelectYear(selectedYear = monthOfDay) {
      const today = moment();      
      const maxYear = parseInt(today.clone().startOf('year').add(20, 'year').format('YYYY'));      
      let yearList = [];
      for(let year = 1900; year <= maxYear; year++ ){
        yearList.push(         
          <Fragment>
            {
               Array(1).fill('0').map((n,i) => {
                let isActived = year === parseInt(selectedYear.format('YYYY')) ? 'active' : '';
                const text = year + '년';
                return (
                  <li key={year} onClick={handleSelectYear} className={cx(`${isActived}`)}> 
                    {text}
                  </li>
                )
               })
            }         
          </Fragment>    
        )
      }
     return yearList;
    }

    function generateSelectMonth( selectedMonth = monthOfDay) {
      let monthList = [];
      for(let month = 1; month <= 12; month++ ){
        monthList.push(   
          <Fragment>
            {
               Array(1).fill('0').map((n,i) => {
                let isActived = month === parseInt(selectedMonth.format('M')) ? 'active' : '';
                const text = month + '월';
                return (
                  <li key={month} onClick={handleSelectMonth} className={cx(`${isActived}`)}> 
                    {text}
                  </li>
                )
               })
            }         
          </Fragment>      
        )
      }
     return monthList;
    }

    function generateCalendar (thisMonth = monthOfDay, calendarList = calendar) {
      console.log("----------------generate()------------------- ");
      let calendar = [];
      for (let week = 0; week < 6; week++) {
        calendar.push(
          <div className={cx(`weekWrapper`)} key={week}>            
            {
              // calendarList[10].DD 
              // 알겠다, 초반에 render할때 빈배열을 render하네.. 그래서 undefined가 나왔구나 ㄷㄷ
            }
            {              
              Array(7).fill(0).map((n, i) => {
                const date = calendarList[ week * 7 + i ].D
                const month = calendarList[ week * 7 + i ].M
                // let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
                let isGrayed = month === thisMonth.format('M') ? '' : 'grayed';
                return (
                  <div className={cx(`calendar-box ${isGrayed}`)} key={i}>{date}</div>
                )
              })
            }
          </div>          
        )    
      }  
      return calendar;
    }  
    return (    
      <div className={cx('CalendarPane')} >    
    <div className={cx('calendarPane-header')}>
      <div className={cx('main')}>
        <Button theme="neon" size="sm" onClick={handleLastMonth}> &nbsp; &lt; &nbsp; </Button>
        <div className={cx('title')}>{monthOfDay.format('YYYY.MM')}</div> {/*moment(thisMonth, 'YYYYMM').format('YYYY.MM')  */}
        <div className={cx('dropSelectDate')} onClick={handleOpen}>▼</div>
        <Button theme="neon" size="sm" onClick={handleNextMonth}>&nbsp; &gt; &nbsp;</Button>        
      </div>
      <div className={cx('today')}>
        < Button theme="neon" size="sm">오늘</Button>                                                                                                                                                                                                                                                                                         
      </div>
    </div>
    <div className={cx('directSelct')}>
      <div className={cx('directSelct-header')}>
        <div>직접입력</div>
        <div className={cx('close')} onClick={handleCancel}>&times;</div>
      </div>
      <div className={cx('directSelct-body')}>
        <div className={cx('selectYear')}>
          <ul>  
            {generateSelectYear()}
          </ul>
        </div>
        <div className={cx('selectMonth')}>
          <ul>    
            {generateSelectMonth()}    
          </ul>
        </div>
      </div>
    </div>

    <div className={cx('calendarPane-body')}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
      <div className={cx('dayWrapper')}>
        <div className={cx('calendar-box')}>Sun</div>        
        <div className={cx('calendar-box')}>Mon</div>        
        <div className={cx('calendar-box')}>Tue</div>        
        <div className={cx('calendar-box')}>Wed</div>        
        <div className={cx('calendar-box')}>Thu</div>        
        <div className={cx('calendar-box')}>Fri</div>        
        <div className={cx('calendar-box')}>Sat</div>                
      </div>
      <div className={cx('dateWrapper')}>     
        {generateCalendar()}
      </div>
    </div>    
  </div>
    );
  };
}


  


export default CalendarPane;
