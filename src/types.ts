export interface Character {
    id: number;
    name: string;
    gender: string | null;
    ability: string;
    minimalDistance: string;
    // Weight is type of number (or float or null), but actually serves as a string (or null)
    weight: string | null;
    born: string;
    inSpaceSince: string | null;
    beerConsumption: number;
    knowsTheAnswer: boolean;
    nemeses: Nemesis[];
}

export interface Nemesis {
    isAlive: boolean;
    years: number | null;
    id: number;
    secrets: Secret[];
}

export interface Secret {
    id: number;
    secretCode: number;
}