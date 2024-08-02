import { NextRequest, NextResponse } from "next/server";
const { DOMParser } = require("xmldom");

export async function GET(req: NextRequest, res: NextResponse) {
  const url = "https://www.nba.com/";
  try {
    const response = await fetch(url, { cache: "no-cache" });
    const body = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");

    const element = await doc.getElementsByTagName("div");
    const articleElement = await doc.getElementsByTagName("li");

    const articles: any = [];
    const headlines: any = [];
    const imageMap: any = {};

    for (let a = 0; a < element.length; a++) {
      const el = element[a].childNodes;
      let o: any = {};
      for (let b = 0; b < el.length; b++) {
        if (el[b].tagName === "a") {
          o.title = el[b].textContent.length > 15 && el[b].textContent;
          o.link = el[b].getAttribute("href");
        }
        if (el[b].tagName === "p") {
          o.description = el[b].textContent;
        }
        if (el[b].tagName === "img") {
          const src = el[b].getAttribute("src");
          imageMap[el[b].getAttribute("alt")] = src;
        }
      }

      o.image = imageMap[o.title];
      o.title && o.link && o.description && articles.push(o);
    }

    for (let a = 0; a < articleElement.length; a++) {
      const el = articleElement[a].childNodes;
      for (let i = 0; i < el.length; i++) {
        const { tagName, textContent } = el[i];
        const href = el[i].getAttribute("href");
        if (
          tagName === "a" &&
          textContent.length > 30 &&
          href.includes("news")
        ) {
          const params = { headline: textContent, link: href };
          headlines.push(params);
        }
      }
    }
    const filteredHeadlines = headlines.filter(
      (value: any, index: any, self: any[]) =>
        index ===
        self.findIndex((t: any) => JSON.stringify(t) === JSON.stringify(value))
    );

    return NextResponse.json({ articles, headlines: filteredHeadlines });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
