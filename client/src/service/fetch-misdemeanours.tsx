import { Misdemeanour } from "../types/misdemeanours.types";

export interface MisdemeanourFetchData {
  isLoading: boolean;
  misdemeanours: Misdemeanour[];
}

const endpoint = "http://localhost:8080/api/misdemeanours/5";

export async function fetchMisdemeanours(): Promise<MisdemeanourFetchData> {
  const response = await fetch(endpoint);
  const json = await response.json();
  return { isLoading: false, misdemeanours: json.misdemeanours };
}
