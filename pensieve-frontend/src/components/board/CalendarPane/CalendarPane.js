import React, { Component } from 'react';
import styles from './CalendarPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import moment from 'moment';
import { List } from 'immutable';


const cx = classNames.bind(styles);

class CalendarPane extends Component {

  initializeCalendar = () => {
    this.setCalendar();
  }

  // 셀렉트 메뉴 열기
  onOpen = () => {    
    const directSelct = document.getElementsByClassName('directSelct');
    for(var i=0; i< directSelct.length; i+=1){
      directSelct[i].style.display = 'block';
    }    
  }
  // 셀렉트 메뉴 닫기
  onCancel = () => {    
    const directSelct = document.getElementsByClassName('directSelct');
    for(var i=0; i< directSelct.length; i+=1){
      directSelct[i].style.display = 'none';
    }    
  }

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

    // 캘린더 box 가져오기    
    const calendarBox = document.querySelectorAll('.weekWrapper .calendar-box');

    // 배열값을 박스 순서대로 입력하기
    calendarBox.forEach( 
            (box, index) => box.innerText = (index < boxsInMonth) ? calendarArray.get(index) : calendarArray.get(index - daysInMonth) );   

  }

  // onLastMonth(e){} 화살표 함수가 아니라서 this.props 인식을 못함
  // componentDidMount() 때문에 헷갈린것 같다 .....
  handleNextMonth = (e) => {    
    console.log("onNextMonth");
    const { thisMonth, onNextMonth } = this.props;
    // 임시로 현재 데이터 넣기
    // const thisMonth = moment().format('YYYYMM');      
    console.log("beforeThisMonth: ", thisMonth);  
    onNextMonth(thisMonth); // state변경하기
    console.log("afterThisMonth: ", thisMonth);
    this.setCalendar(thisMonth); // 변경한 state에 맞게 달력만들기 // 안되네
  }

  onLastMonth = (e) =>{
    console.log("onLastMonth")
  }

  componentDidMount() {
    this.initializeCalendar();
  } 

 
  render(){

    
    // const { onNextMonth } = this.props; // 위에 화살표 함수로 수정함
    // console.log(onNextMonth);
    const {thisMonth} = this.props;
    const { onOpen, onCancel, handleNextMonth, onLastMonth } = this;
    const { formatMont } = moment(thisMonth).format('M');

    
    return (
      <div className={cx('CalendarPane')} >    
    <div className={cx('calendarPane-header')}>
      <div className={cx('main')}>
        <Button theme="neon" size="sm" onClick={onLastMonth}> &nbsp; &lt; &nbsp; </Button>
    <div className={cx('title')}>{moment(thisMonth, 'YYYYMM').format('M')}</div> {/* moment().format('M') */}
        <div className={cx('dropSelectDate')} onClick={onOpen}>▼</div>
        <Button theme="neon" size="sm" onClick={() => handleNextMonth()}>&nbsp; &gt; &nbsp;</Button>        
      </div>
      <div className={cx('today')}>
        < Button theme="neon" size="sm">오늘</Button>                                                                                                                                                                                                                                                                                         
      </div>
    </div>
    <div className={cx('directSelct')}>
      <div className={cx('directSelct-header')}>
        <div>직접입력</div>
        <div className={cx('close')} onClick={onCancel}>&times;</div>
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
