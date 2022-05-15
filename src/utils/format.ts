/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import moment from 'moment';

export const isNumber = (num: any) => {
  const testA = /^[0-9]*$/;
  return testA.test(num);
};

export const formatTime = (time: string | number, formatString = 'YYYY/MM/DD HH:mm:ss'): any => {
  if (isNumber(time)) time = +time;
  return moment(time).format(formatString);
};
