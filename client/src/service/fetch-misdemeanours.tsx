import { Misdemeanour } from "../types/misdemeanours.types";

const endpoint = "http://localhost:8080/api/misdemeanours/1";

export async function fetchMisdemeanours(): Promise<Misdemeanour[]> {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json.misdemeanours;
}
