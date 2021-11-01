export const formatWeek = (function WeekFormatCreater() {
  const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return (week: number) => {
    return weekMap[week % 7];
  };
})();

/**
 *
 */
export function addPrefix0(m: number) {
  const mStr = m.toString();
  return mStr[1] ? m : '0' + m;
}

/**
 * 检查两个时间是否在同一周
 * @param dateNow 之后的时间, 时间戳必须大于 datePrev 参数，否则直接 false
 * @param datePrev 之前的时间， 时间戳必须小于 dateNow 参数，否则直接 false
 */
function isSameWeek(dateNow: Date, datePrev: Date): boolean {
  if (dateNow.getTime() < datePrev.getTime()) return false;
  // TODO 目前只是时间差在一周之内
  if (dateNow.getTime() - datePrev.getTime() >= 7 * 24 * 60 * 60 * 1000)
    return false;

  return dateNow.getDay() > datePrev.getDay();
}

/**
 * 检查两个时间是否在同一周
 * @param dateNow 之后的时间, 时间戳必须大于 datePrev 参数，否则直接 false
 * @param datePrev 之前的时间， 时间戳必须小于 dateNow 参数，否则直接 false
 */
function isSameDay(dateNow: Date, datePrev: Date): boolean {
  if (dateNow.getTime() < datePrev.getTime()) return false;
  // TODO 目前只是时间差在一周之内
  if (dateNow.getTime() - datePrev.getTime() >= 24 * 60 * 60 * 1000)
    return false;

  return dateNow.getDate() === datePrev.getDate();
}

/**
## format timestamp

### 聊天内部时间显示需求：
 
- 当天：`具体时间`，例如 09:02
- 当周：`星期 具体时间` 例如 星期二 09:02
- 当月：`日期 具体时间` 例如 1日 09：02
- 当年：`月份日期 具体时间` 例如 10月31日 10:31
- 往年：`年份月份日期 具体时间` 例如 2019年10月31日 10:31

### 消息列表时间：

- 当天：具体时间
- 昨天：昨天
- 当周：星期
- 当年：月份日期
- 往年：年份月份日期

 * @param timestamp 时间戳
 */
export function formatTimestamp(timestamp: string | number): string {
  // validate param
  if (!Number.isInteger(timestamp)) {
    return timestamp as string;
  }

  if (timestamp < 0) {
    return timestamp.toString();
  }

  // 现在的时间
  const dateNow = new Date();
  const date = new Date(timestamp);

  const isCurrentWeek = isSameWeek(dateNow, date);
  const isCurrentDay = isSameDay(dateNow, date);
  let showYear = false;
  let showMonth = true;

  if (dateNow.getFullYear() !== date.getFullYear()) {
    showYear = true;
    showMonth = true;
  }

  const day = isCurrentWeek
    ? `${formatWeek(date.getDay())}`
    : [
        showYear ? `${date.getFullYear()}年` : '',
        showMonth
          ? `${addPrefix0(date.getMonth() + 1)}月${addPrefix0(
              date.getDate(),
            )}日`
          : '',
      ].join('');

  return `${isCurrentDay ? '' : day} ${addPrefix0(
    date.getHours(),
  )}:${addPrefix0(date.getMinutes())}`;
}
