import React, { Component } from 'react';
import styles from './CalendarPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

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

  render(){

    const { handleOpen, handleCancel } = this;
    return (
      <div className={cx('CalendarPane')} >    
    <div className={cx('calendarPane-header')}>
      <div className={cx('main')}>
        <Button theme="neon" size="sm">&nbsp; &lt; &nbsp; </Button>
        <div className={cx('title')}>2020.03</div>
        <div className={cx('dropSelectDate')} onClick={handleOpen}>▼</div>
        <Button theme="neon" size="sm">&nbsp; &gt; &nbsp;</Button>        
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
            <li><a>1월</a></li>
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

    <div className={cx('calendarPane-body')}>
      <div className={cx('textDay')}>
        <div className={cx('day')}>Sun</div>        
        <div className={cx('day')}>Mon</div>        
        <div className={cx('day')}>Tue</div>        
        <div className={cx('day')}>Wed</div>        
        <div className={cx('day')}>Thu</div>        
        <div className={cx('day')}>Fri</div>        
        <div className={cx('day')}>Sat</div>                
      </div>
      <div className={cx('numDay')}>
        <div className={cx('day')}>1</div>        
        <div className={cx('day')}>2</div>        
        <div className={cx('day')}>3</div>        
        <div className={cx('day')}>4</div>        
        <div className={cx('day')}>5</div>        
        <div className={cx('day')}>6</div>        
        <div className={cx('day')}>7</div>        
      </div>
      <div className={cx('numDay')}>
        <div className={cx('day')}>8</div>        
        <div className={cx('day')}>9</div>        
        <div className={cx('day')}>10</div>        
        <div className={cx('day')}>11</div>        
        <div className={cx('day')}>12</div>        
        <div className={cx('day')}>13</div>        
        <div className={cx('day')}>14</div>        
      </div>
      <div className={cx('numDay')}>
        <div className={cx('day')}>15</div>        
        <div className={cx('day')}>16</div>        
        <div className={cx('day')}>17</div>        
        <div className={cx('day')}>18</div>        
        <div className={cx('day')}>19</div>        
        <div className={cx('day')}>20</div>        
        <div className={cx('day')}>21</div>        
      </div>
      <div className={cx('numDay')}>
        <div className={cx('day')}>22</div>        
        <div className={cx('day')}>23</div>        
        <div className={cx('day')}>24</div>        
        <div className={cx('day')}>25</div>        
        <div className={cx('day')}>26</div>        
        <div className={cx('day')}>27</div>        
        <div className={cx('day')}>28</div>        
      </div>
      <div className={cx('numDay')}>
        <div className={cx('day')}>29</div>        
        <div className={cx('day')}>30</div>        
        <div className={cx('day')}>31</div>        
        <div className={cx('day')}>1</div>        
        <div className={cx('day')}>2</div>        
        <div className={cx('day')}>3</div>        
        <div className={cx('day')}>4</div>        
      </div>
    </div>    
  </div>
    );
  };
}


  


export default CalendarPane;
