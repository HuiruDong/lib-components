import type { MonthCalendarProps } from "./MonthCalendar";
import type { Dayjs } from "dayjs";

export type DaysType = Array<{ date: Dayjs; currentMonth: boolean }>;

/**
 * 日历数据，包含当前月、上一个月和下一个月的填充数据
 * @param value
 */
export const getAllDays = (date: MonthCalendarProps["currMonth"]): DaysType => {
  // 当月有多少天，和 new Date(date.getFullYear(), date.getMonth() - 1, 0) 的效果一样
  // const daysInMonth = date.daysInMonth();
  
  // 当月第一天
  const startDate = date.startOf("month");
  // 当月第一天是星期几
  const day = startDate.day();

  // 日历固定是 6 * 7 个格子
  const daysInfo: DaysType = new Array(6 * 7);

  // 渲染上个月的格子
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  // 渲染剩余的格子
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
};
