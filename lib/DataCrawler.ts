const { DOMParser } = require("xmldom");

export async function GetData(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {},
    credentials: "omit",
  });
  const body = await response.text();

  const parser = new DOMParser();
  const html = parser.parseFromString(body, "text/html");

  const code = html.documentElement.nodeName;

  return code;
}
