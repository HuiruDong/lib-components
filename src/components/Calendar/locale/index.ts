import enUS from './en-US';
import zhCN from './zh-CN';
import type { CalendarType } from './interface';

const allLocales: Record<string, CalendarType> = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

export default allLocales;
