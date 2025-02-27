import type { Dayjs } from 'dayjs';
import LocaleContext from './LocaleContext';
import { useContext } from 'react';
import allLocales from './locale';

interface HeaderProps {
  currMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHander: () => void;
}

const Header: React.FC<HeaderProps> = ({currMonth, prevMonthHandler, nextMonthHandler, todayHander}) => {
  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocales[localeContext.locale];
  
  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>&lt;</div>
        <div className="calendar-header-value"> {currMonth.format(CalendarContext.formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
        <button className="calendar-header-btn" onClick={todayHander}>{CalendarContext.today}</button>
      </div>
    </div>
  );
};

export default Header;
