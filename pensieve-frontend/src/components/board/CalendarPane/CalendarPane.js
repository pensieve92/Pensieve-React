import React, { Component } from 'react';
import styles from './CalendarPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import moment from 'moment';
import { List } from 'immutable';


const cx = classNames.bind(styles);

class CalendarPane extends Component {

  handleOpen = () => {    
    const directSelct = document.getElementsByClassName('directSelct');
    for(var i=0; i< directSelct.length; i+=1){
      directSelct[i].style.display = 'block';
    }    
  }

  handleCancel = () => {    
    const directSelct = document.getElementsByClassName('directSelct');
    for(var i=0; i< directSelct.length; i+=1){
      directSelct[i].style.display = 'none';
    }    
  }

  createCalendar = (thisMonth = moment().format('YYYYMM')) => { // null일 경우 오늘날짜를 default값으로 지정
    const daysInMonth =  moment(thisMonth, "YYYYMM").daysInMonth(); // 해당 월의 일수 : 31
    const startDate = thisMonth + "01";             // date: 날짜(num)
    // const startDate = "202004" + "01";             // date: 날짜(num)

    const startDay = parseInt(moment(startDate).format('e')); // day : 요일 [return 0 ~ 6 (String)]
    // moment().format('e'); // 해당일의 첫번째 요일 (일요일: 0 ~ 토요일 : 6 )
    // moment().format('ddd dddd'); // 해당일의 첫번째 요일
    
    const boxsInMonth = daysInMonth + startDay; // 최소 박스수: 해당월의 일수 + 시작요일 
 
    // 배열만들기 1차원으로 만들기!! 
    let calendarArray = List([]);
    let date = 1;
    while( date < boxsInMonth + 1){ 
      calendarArray = calendarArray.push(date - startDay);
      date++;
    }

    // 캘린더 box 가져오기
    // const calendarBox = document.getElementsByClassName('weekWrapper calendar-box');
    const calendarBox = document.querySelectorAll('.weekWrapper .calendar-box');

    // 앞쪽에 값이 undefined 일경우    
    // startDay > 0 일경우 앞에 공백이 생긴다. :: 한 달전의 일수 를 구한다.!!
    const daysInLastMonth =  moment(thisMonth, "YYYYMM").subtract(1, 'months').daysInMonth();    
    // console.log( "지난달: " + moment(thisMonth, "YYYYMM").subtract(1, 'months').daysInMonth());
    // startDay 가 1일경우 daysInLastMonth (0)
    // startDay 가 2일경우 daysInLastMonth-1 (0), daysInLastMonth (1)
    // (startDay > 0) ? daysInLastMonth - startDay + 1 ;

    // 배열 업데이트 
    if(startDay > 0) {
      for(let i = 0 ; i < startDay ; i ++){
        calendarArray = calendarArray.set(i, daysInLastMonth - startDay + 1 + i);
      }
    }

    // 배열값을 박스 순서대로 입력하기
    calendarBox.forEach( 
            (box, index) => box.innerText = (index < boxsInMonth) ? calendarArray.get(index) : calendarArray.get(index - daysInMonth) );   
  }

  handleNextMonth(event){
    event.persist() // react에서 event를 제어하는데 이를 해제 하기위함
    const title = document.querySelector('.main .title');
    const nextMonth =  moment(title.dataset.thismonth, "YYYYMM").add(1, 'months').format('YYYYMM')

    title.dataset.thismonth = nextMonth;
  //   createCalendar(nextMonth); // 함수 어떻게 호출하지??
  //  const {createCalendar} = this.props;
  //  createCalendar(nextMonth)

  //  this.createCalendar(nextMonth)

    console.log("handleNextMonth");
  }

  handleLastMonth(e){
    console.log("handleLastMonth")
  }

  componentDidMount() {
    this.createCalendar();
  } 

  render(){

    const { handleOpen, handleCancel, handleNextMonth, handleLastMonth } = this;
    // createCalendar();
    return (
      <div className={cx('CalendarPane')} >    
    <div className={cx('calendarPane-header')}>
      <div className={cx('main')}>
        <Button theme="neon" size="sm" onClick={handleLastMonth}> &nbsp; &lt; &nbsp; </Button>
        <div className={cx('title')} data-thismonth={moment().format('YYYYMM')}>{moment().format('M')}</div>
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
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>
            <li>2020년</li>            
          </ul>
        </div>
        <div className={cx('selectMonth')}>
          <ul>            
            <li>1월</li>
            <li>2월</li>
            <li>3월</li>
            <li>4월</li>
            <li>5월</li>
            <li>6월</li>
            <li>7월</li>
            <li>8월</li>
            <li>9월</li>
            <li>10월</li>
            <li>11월</li>
            <li>12월</li>
          </ul>
        </div>
      </div>
    </div>

    <div className={cx('calendarPane-body')} id="calendarPane-body">
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
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}>1</div>
          <div className={cx('calendar-box')}>2</div>        
          <div className={cx('calendar-box')}>3</div>        
          <div className={cx('calendar-box')}>4</div>        
          <div className={cx('calendar-box')}>5</div>        
          <div className={cx('calendar-box')}>6</div>        
          <div className={cx('calendar-box')}>7</div>        
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}>1</div>        
          <div className={cx('calendar-box')}>2</div>        
          <div className={cx('calendar-box')}>3</div>        
          <div className={cx('calendar-box')}>4</div>        
          <div className={cx('calendar-box')}>5</div>        
          <div className={cx('calendar-box')}>6</div>        
          <div className={cx('calendar-box')}>7</div>        
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}>8</div>        
          <div className={cx('calendar-box')}>9</div>        
          <div className={cx('calendar-box')}>10</div>        
          <div className={cx('calendar-box')}>11</div>        
          <div className={cx('calendar-box')}>12</div>        
          <div className={cx('calendar-box')}>13</div>        
          <div className={cx('calendar-box')}>14</div>        
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}>15</div>        
          <div className={cx('calendar-box')}>16</div>        
          <div className={cx('calendar-box')}>17</div>        
          <div className={cx('calendar-box')}>18</div>        
          <div className={cx('calendar-box')}>19</div>        
          <div className={cx('calendar-box')}>20</div>        
          <div className={cx('calendar-box')}>21</div>        
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}>22</div>        
          <div className={cx('calendar-box')}>23</div>        
          <div className={cx('calendar-box')}>24</div>        
          <div className={cx('calendar-box')}>25</div>        
          <div className={cx('calendar-box')}>26</div>        
          <div className={cx('calendar-box')}>27</div>        
          <div className={cx('calendar-box')}>28</div>        
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}>29</div>        
          <div className={cx('calendar-box')}>30</div>        
          <div className={cx('calendar-box')}>31</div>        
          <div className={cx('calendar-box')}>1</div>        
          <div className={cx('calendar-box')}>2</div>        
          <div className={cx('calendar-box')}>3</div>        
          <div className={cx('calendar-box')}>4</div>        
        </div>
      </div>
    </div>    
  </div>
    );
  };
}


  


export default CalendarPane;
