import { NextRequest, NextResponse } from "next/server";
const { DOMParser } = require("xmldom");

export async function GET(req: NextRequest) {
  const url = `https://www.nba.com/stats/leaders`;
  try {
    const res = await fetch(url);
    const body = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");

    const divEl = await doc.getElementsByTagName("section");

    let players = [];

    let i = 0;
    const newEl = divEl[2].childNodes;
    console.log(newEl[0].childNodes.length);
    while (i < newEl.length) {
      for (let a = 0; a < newEl.length; a++) {
        const tag = newEl[a].tagName;
        console.log(tag, newEl[a].childNodes[0]);
      }
      i++;
    }

    return NextResponse.json({ players });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
