import './index.scss';
import Header from './Header';
import MonthCalendar from './MonthCalendar';
import type { Dayjs } from 'dayjs';
import cs from 'classnames';
import { useControllableValue } from 'ahooks';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import LocaleContext from './LocaleContext';

export interface CalendarProps {
    value?: Dayjs;
    defaultValue?: Dayjs;
    style?: React.CSSProperties;
    className?: string | string[];
    dateRender?: (currentDate: Dayjs) => React.ReactNode;
    dateInnerContent?: (currentDate: Dayjs) => React.ReactNode;
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({ style, className, locale, ...props }) => {
    const classNames = cs('calendar', className);

    const [currValue, setCurrValue] = useControllableValue<Dayjs>(props, {
        defaultValue: dayjs(),
    });
    const [currMonth, setCurrMonth] = useState<Dayjs>(dayjs());

    const changeDate = (date: Dayjs) => {
        setCurrValue(date);
        setCurrMonth(date);
    };

    const selectHandler = (date: Dayjs) => {
        changeDate(date);
    };

    const prevMonthHandler = () => {
        setCurrMonth(currMonth.subtract(1, 'month'));
    };

    const nextMonthHandler = () => {
        setCurrMonth(currMonth.add(1, 'month'));
    };

    const todayHander = () => {
        const today = dayjs(Date.now());
        changeDate(today);
    };

    useEffect(() => {
        setCurrMonth(currValue);
    }, [currValue]);

    return (
        <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
            <div className={classNames} style={style}>
                <Header
                    currMonth={currMonth}
                    prevMonthHandler={prevMonthHandler}
                    nextMonthHandler={nextMonthHandler}
                    todayHander={todayHander}
                />
                <MonthCalendar {...props} value={currValue} currMonth={currMonth} selectHandler={selectHandler} />
            </div>
        </LocaleContext.Provider>
    );
};

export default Calendar;
