import React, { Component } from 'react';
import styles from './BoardHeader.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class BoardHeader extends Component {
  render () {
    const { calendar, todoList } = this.props;    

    return (
      <div className={cx('BoardHeader')} >  
        <div className={cx('calendar')}>
          {calendar}
        </div>
        <div className={cx('todoList')}>
          {todoList}
        </div>
      </div>  
    )
  }
} 
export default BoardHeader;
