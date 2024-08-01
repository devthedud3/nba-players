import { NextRequest, NextResponse } from "next/server";
const { DOMParser } = require("xmldom");

export async function GET(res: NextResponse, req: NextRequest) {
  const url = "https://www.nba.com/";
  try {
    const response = await fetch(url, { cache: "no-cache" });
    const body = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");

    const playerArticles = await doc.getElementsByTagName("img");
    const articles: any = [];

    for (let i = 0; i < playerArticles.length; i++) {
      const source = playerArticles[i].getAttribute("src");
      const description = playerArticles[i].getAttribute("alt");
      source.includes("2024") &&
        description &&
        articles.push({ image: source, description: description });
    }

    console.log(articles);
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
