import { Misdemeanour, MisdemeanourKind } from "../types/misdemeanours.types";
import { ConfessionPostResponse } from "../types/confessions.types";
export const newMisdemeanours: Misdemeanour[] = [];

export function addMisdemeanour(misdemeanourKind: MisdemeanourKind) {
  const misdemeanour = {
    citizenId: Math.floor(rand(37) * rand(967)),
    misdemeanour: misdemeanourKind,
    date: new Date().toLocaleDateString(),
  };
  newMisdemeanours.push(misdemeanour);
}

function rand(x: number): number {
  return Math.random() * x;
}

export async function postConfession(
  subject: string,
  reason: string,
  details: string
): Promise<ConfessionPostResponse> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: subject,
      reason: reason,
      details: details,
    }),
  };
  const response = await fetch(
    "http://localhost:8080/api/confess",
    requestOptions
  );
  return await response.json();
}
