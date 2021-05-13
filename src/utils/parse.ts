export function parseGetParams(
  paramsStr: string
): Readonly<Record<string, string>> | null {
  if (!paramsStr || paramsStr === "" || paramsStr.indexOf("?") < 0) {
    return null;
  }
  const params: Record<string, string> = {};
  const tempArr = paramsStr.split("?");
  const pairs = tempArr[tempArr.length - 1]
    .split("&")
    .map((value) => {
      return value.split("=");
    })
    .filter((value) => {
      return value.length === 2 && value[0] && value[0] !== "";
    });
  for (let value of pairs) {
    if (value.length === 2) params[value[0]] = value[1];
  }
  return params;
}
