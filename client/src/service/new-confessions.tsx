import { Misdemeanour, MisdemeanourKind } from "../types/misdemeanours.types";

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
