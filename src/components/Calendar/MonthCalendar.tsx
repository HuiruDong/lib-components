import type { CalendarProps } from ".";
import { getAllDays } from "./utils";
import type { DaysType } from "./utils";
import cs from "classnames";
import type { Dayjs } from "dayjs";
import { useContext } from "react";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";

export interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  currMonth: Dayjs;
}

/**
 * 渲染日历
 * @param days
 * @returns
 */
const renderDays = (
  days: DaysType,
  dateRender: MonthCalendarProps["dateRender"],
  dateInnerContent: MonthCalendarProps["dateInnerContent"],
  value: MonthCalendarProps["value"],
  selectHandler: MonthCalendarProps["selectHandler"]
) => {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j];
      row[j] = (
        <div
          className={cs("calendar-month-body-cell", {
            "calendar-month-body-cell-current": item.currentMonth,
          })}
          key={`cell_${j}`}
          onClick={() => selectHandler?.(item.date)}
        >
          {
                    dateRender ? dateRender(item.date) : (
                        <div className="calendar-month-body-cell-date">
                            <div className={
                                cs("calendar-month-body-cell-date-value",
                                    value?.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                                        ? "calendar-month-body-cell-date-selected"
                                        : ""
                                )
                            }>{item.date.date()}</div>
                            <div className="calendar-month-cell-body-date-content">{dateInnerContent?.(item.date)}</div>
                        </div>
                    )
                }
        </div>
      );
    }
    rows.push(row);
  }
  return rows.map((row, index) => (
    <div className="calendar-month-body-row" key={`row_${index}`}>{row}</div>
  ));
};

const MonthCalendar: React.FC<MonthCalendarProps> = ({
  value,
  dateInnerContent,
  dateRender,
  selectHandler,
  currMonth,
}) => {
  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const localeContext = useContext(LocaleContext);
  const CalenderLocale = allLocales[localeContext.locale];

  const allDays = getAllDays(currMonth);

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalenderLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {renderDays(
          allDays,
          dateRender,
          dateInnerContent,
          value,
          selectHandler
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
