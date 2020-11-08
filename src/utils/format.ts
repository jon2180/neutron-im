

/**
 * 聊天内部时间显示需求：
 * 当天：`具体时间`，例如 09:02
 * 当周：`星期 具体时间` 例如 星期二 09:02
 * 当月：`日期 具体时间` 例如 1日 09：02
 * 当年：`月份日期 具体时间` 例如 10月31日 10:31 
 * 往年：`年份月份日期 具体时间` 例如 2019年10月31日 10:31
 * 
 * 消息列表时间：
 * 当天：具体时间
 * 昨天：昨天
 * 当周：星期
 * 当年：月份日期
 * 往年：年份月份日期
 */
export function formatTimestamp(timestamp: string | number) {
  if (timestamp < 50000000000000) {
    return timestamp;
    // throw new RangeError("invalid timestamp");
  }
  let ts: number;
  if (typeof timestamp === "string") {
    ts = parseInt(timestamp, 10);
  } else {
    ts = timestamp;
  }

  const dateNow = new Date();

  const date = new Date(ts);
  let showYear = true;
  if (dateNow.getFullYear() !== date.getFullYear()) {

  }

  console.log(date);
  console.log(showYear);



}
