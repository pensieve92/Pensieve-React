import React from 'react';
import styles from './BoardWrapper.scss';
import classNames from 'classnames/bind';
import BaordHeader from 'components/board/BoardHeader';
import CalendarPane from 'components/board/CalendarPane';
import TodoListPane from 'components/board/TodoListPane';

const cx = classNames.bind(styles);

const BoardWrapper = () => (
  <div className={cx('BoardWrapper')} >     
    <BaordHeader 
      calendar = {<CalendarPane />}
      todoList = {<TodoListPane />}
    />     
    <div className={cx('board-body')} >boardBody</div>
  </div>
);

export default BoardWrapper;
