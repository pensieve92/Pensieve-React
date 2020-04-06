import React, { Component } from 'react';
import styles from './CalendarPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import moment from 'moment';
import { Map, List } from 'immutable';



const cx = classNames.bind(styles);

class CalendarPane extends Component {
  state = {
    thisMonth: moment().format('YYYYMM'),
    calendar: Array(42).fill({}) // 초기값을 '' 으로 해놔서 배열로 인식된게 아니라 문자열로 인식해서 .map 이나 객체를 꺼내는데 계속 에러가 났었다 ㅠㅠ
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
    // selectYear.scrollIntoView();
    // selectMonth.scrollIntoView();
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


  // 캘린더 날짜 셋팅
  setCalendar = (thisMonth = moment().format('YYYYMM')) => { // null일 경우 오늘날짜를 default값으로 지정
    console.log("--------------------setCalendar------------------------")
    const daysInMonth =  moment(thisMonth, "YYYYMM").daysInMonth(); // 해당 월의 일수 : 31
    const startDate = thisMonth + "01";             // date: 날짜(num)
    const startDay = parseInt(moment(startDate).format('e')); // day : 요일 [return 0 ~ 6 (String)]
    const minDays = daysInMonth + startDay; // 최소 박스수: 해당월의 일수 + 시작요일 
 
    // 배열만들기 1차원으로 만들기!! 
    let dateArray = List([]);
    let date = 1;
    while( date < minDays + 1){ 
      const dateMap = {
        DD: date - startDay,
        MM: thisMonth,
        YYYY: thisMonth,        
        work: 0,  
      };      
      dateArray = dateArray.push(dateMap);      
      date++;
    }
    // 전달의 일수
    const daysInLastMonth =  moment(thisMonth, "YYYYMM").subtract(1, 'months').daysInMonth();       

    // 전달 날짜 업데이트 
    if(startDay > 0) {
      for(let i = 0 ; i < startDay ; i ++){
        const dateMap = {
          DD: daysInLastMonth - startDay + 1 + i,
          YYYY: thisMonth,
          MM: thisMonth,
          work: 0,    
        };
        dateArray = dateArray.set(i, dateMap);
      }      
    }

   // 다음달 날짜 업데이트
   let nextMonthDate = 1; 
   while(dateArray.size < 42){ 
      const dateMap = {
        DD: nextMonthDate,
        YYYY: thisMonth,
        MM: thisMonth,
        work: 0,   
      };
      dateArray = dateArray.push(dateMap);
      nextMonthDate++;
   }

   // 일단보류
   console.log("dateArray: ", dateArray)
  //  console.log("indexOf(1): ",dateArray.indexOf(1))
  //  console.log("indexOf(1): ",dateArray.lastIndexOf(1))   

  // 7개씩 묶기
  // let monthArray = List([]); //최종 배열 (List([List([Map({})])]))
  // for (let i = 0; i < 6; i++) {
  //   let weekArray = List([]);
  //   for (let j = 0; j < 7; j++) {     
  //     weekArray = weekArray.push(dateArray.get(i * 7 + j));
  //   }
  //   monthArray = monthArray.push(weekArray);    
  // }
    console.log(dateArray.get[0])
    const dateArrayToJs = dateArray.toJS();
    console.log(dateArrayToJs[0].DD)
    this.setState({calendar: dateArrayToJs});
  }

  showCalendar = (calendar = this.setCalendar()) => {    
    let showCalendar = '';   

    for (let i = 0; i < calendar.size; i++) {
      showCalendar += i % 7 === 0 ? `<div class={cx('weekWrapper')}>` : ``;
      showCalendar += `<div className={cx('calendar-box')}> ${calendar.get(i)} </div>`
      showCalendar += i % 7 === 6 ? `</div>` : ``;      
    }
    
    return showCalendar;
  }

  handleNextMonth = () => {    
    const nextMonth = moment(moment(this.state.thisMonth, "YYYYMM").add(1, 'months'), 'YYYYMM').format('YYYYMM');
    const nextCalendar = this.setCalendar(nextMonth);

    this.showCalendar(nextCalendar);

    this.setState({
      thisMonth: nextMonth,
      calendar: nextCalendar
    })    
    
  }

  handleLastMonth = () =>{
    const lastMonth = moment(moment(this.state.thisMonth, "YYYYMM").subtract(1, 'months'), 'YYYYMM').format('YYYYMM')
    const lastCalendar = this.setCalendar(lastMonth);

    this.showCalendar(lastCalendar);

    this.setState({
      thisMonth: lastMonth,
      calendar: lastCalendar
    })  
  }

  componentDidMount() { // redux에서 state 가져오기
    this.initializeCalendar();
  } 

 
  render(){
    // render 안에서 화살표함수를 정의 할 수 없다
    // 대신 function을 만들어서 사용한다. !!!!!!
    console.log( "--------------comopent reder()--------------");    
    const { thisMonth, calendar } = this.state;
    const { handleOpen, handleCancel, handleNextMonth, handleLastMonth, showCalendar, handleSelectMonth, setCalendar } = this;    
    

    let years = [];
    let months = [];
    for (let i = 1900; i< parseInt(thisMonth.substr(0,4)) + 21; i++){
      years.push(i);
    }
    for (let i = 1; i < 13; i++) {      
      months.push(i);
    }
    const yearList = years.map(
      year => {
        let years = year + "년"
        return (
        <li 
        key={year}
        onClick={handleSelectMonth}>
          {years}
        </li>
        )
      }
    )

    const monthList = months.map(
      month => (
        <li 
        key={month}
        onClick={handleSelectMonth}>
          {month}월
        </li>
      )
    )
    
    function generate (calendarList = calendar) {
      console.log("----------------generate()------------------- ");
      console.log(calendarList);
      const today = moment();
      const startWeek = today.clone().startOf('month').week();
      const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
      let calendar = [];
      const obj = {value : 1, num: 1, id: 1}
      calendarList.map(
        obj => (
          console.log(obj.DD)
        )
      )
      for (let week = 0; week < 6; week++) {    
        // console.log(calendarList[0].map('DD'))
        console.log(obj);
        console.log(obj.value);
        console.log(calendarList);
        
        // calendarList = calendarList.push({DD: 1});
        calendar.push(
          <div className={cx(`weekWrapper`)} key={week}>            
            {
              // calendarList[10].DD 
              // 알겠다, 초반에 render할때 빈배열을 render하네.. 그래서 undefined가 나왔구나 ㄷㄷ
            }
            {              
              Array(7).fill(0).map((n, i) => {
                // console.log(calendarList[0].DD) 
                const date = calendarList[ week * 7 + i ].DD
                let current ='text'
                // let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
                // let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
                return (
                  // <div className={`box  ${isSelected} ${isGrayed}`} key={i}>
                  <div className={cx(`calendar-box`)} key={i}>
                    {date}
                  </div>
                )
              })
            }
          </div>          
        )    
      }
      // for (let week = startWeek; week <= startWeek+6; week++) {    
      //   calendar.push(
      //     <div className="row" key={week}>
      //       {
      //         Array(7).fill(0).map((n, i) => {
      //           let current = today.clone().week(week).startOf('week').add(n + i, 'day')
      //           let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
      //           let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
      //           return (
      //             // <div className={`box  ${isSelected} ${isGrayed}`} key={i}>
      //             <div className={cx(`weekWrapper`)} key={i}>
      //               <span className={`text`}>{current.format('D')}</span>
      //             </div>
      //           )
      //         })
      //       }
      //     </div>          
      //   )    
      // }
      return calendar;
    }
    
    //   showCalendar += i % 7 === 0 ? `<div class={cx('weekWrapper')}>` : ``;
    //   showCalendar += `<div className={cx('calendar-box')}> ${calendar.get(i)} </div>`
    //   showCalendar += i % 7 === 6 ? `</div>` : ``;      
    // }

    return (    
      <div className={cx('CalendarPane')} >    
    <div className={cx('calendarPane-header')}>
      <div className={cx('main')}>
        <Button theme="neon" size="sm" onClick={handleLastMonth}> &nbsp; &lt; &nbsp; </Button>
    <div className={cx('title')}>{moment(thisMonth, 'YYYYMM').format('YYYY.MM')}</div> {/* moment().format('M') */}
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
            {yearList}                       
          </ul>
        </div>
        <div className={cx('selectMonth')}>
          <ul>    
          {monthList}    
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
      {generate()}          
        {/* <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
        </div>
        <div className={cx('weekWrapper')}>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
          <div className={cx('calendar-box')}></div>
        </div> */}
      </div>
    </div>    
  </div>
    );
  };
}


  


export default CalendarPane;
