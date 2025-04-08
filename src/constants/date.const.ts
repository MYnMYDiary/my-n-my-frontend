import dayjs from 'dayjs';

export const CURRENT_YEAR = dayjs().year().toString();
export const CURRENT_MONTH = (dayjs().month()+1).toString();
export const CURRENT_DAY = dayjs().date().toString();

export const CURRENT_DATE = `${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DAY}`;