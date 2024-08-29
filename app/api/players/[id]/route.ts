import { NextRequest, NextResponse } from "next/server";
const { DOMParser } = require("xmldom");

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const url = `https://www.basketball-reference.com/players/${id}`;
  try {
    const res = await fetch(url);
    const body = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");

    const playerElements = await doc.getElementsByTagName("th");
    const playerData = await doc.getElementsByTagName("td");

    let players = [];

    for (let i = 8; i < playerElements.length; i++) {
      const player: any = { name: playerElements[i].textContent };

      const playerInfoIndex = (i - 8) * 7; // Index for playerData
      player.from = playerData[playerInfoIndex]?.textContent || "--";
      player.to = playerData[playerInfoIndex + 1]?.textContent || "--";
      player.position = playerData[playerInfoIndex + 2]?.textContent || "--";
      player.height = playerData[playerInfoIndex + 3]?.textContent || "--";
      player.weight = playerData[playerInfoIndex + 4]?.textContent || "--";
      player.dob = playerData[playerInfoIndex + 5]?.textContent || "--";
      player.college = playerData[playerInfoIndex + 6]?.textContent || "--";

      players.push(player);
    }

    return NextResponse.json({ players });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
