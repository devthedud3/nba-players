import { NextRequest, NextResponse } from "next/server";
const { DOMParser } = require("xmldom");

export async function GET(res: NextResponse, req: NextRequest) {
  const url = "https://www.nba.com/";
  try {
    const response = await fetch(url);
    const body = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");

    const nbaTeams = await doc.getElementsByTagName("img");
    const teams: any = [];

    for (let i = 0; i < nbaTeams.length; i++) {
      const source = nbaTeams[i].getAttribute("src");
      const description = nbaTeams[i].getAttribute("alt");
      source.includes("logos/nba") &&
        teams.push({
          image: source,
          name: description.replace(" Logo", ""),
        });
    }

    console.log(teams);
    return NextResponse.json({ teams });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
