import { addPrefix0, formatTimestamp, formatWeek } from './format';

describe('Format Timestamp', () => {
  test('错误参数应该返回原样返回', () => {
    const param = 'fadsf';
    expect(formatTimestamp(param)).toEqual(param);
  });

  const date = new Date();
  // test('同一天时间显示 `hh:mm`', () => {
  //   let ts = date.getTime();
  //   let d = new Date(ts);
  //   expect(formatTimestamp(ts))
  //     .toEqual(`${addPrefix0(d.getHours())}:${addPrefix0(d.getMinutes())}`);
  // })

  // test('昨天时间显示 `昨天 hh:mm`', () => {
  //   let ts = date.getTime() - 24 * 60 * 60 * 1000;
  //   let d = new Date(ts);
  //   expect(formatTimestamp(ts))
  //     .toEqual(`昨天 ${addPrefix0(d.getHours())}:${addPrefix0(d.getMinutes())}`);
  // })

  test('同一周且是昨天时间显示 `day hh:mm`', () => {
    // TODO
    let ts: number;
    if (date.getDay() > 0)
      ts = date.getTime() - 24 * 60 * 60 * 1000 * (date.getDay() - 1);
    else ts = date.getTime();

    const d = new Date(ts);

    expect(formatTimestamp(ts)).toEqual(
      `${formatWeek(d.getDay())} ${addPrefix0(d.getHours())}:${addPrefix0(
        d.getMinutes(),
      )}`,
    );
  });

  test('同一周却不是昨天时间显示 `day hh:mm`', () => {});
});
