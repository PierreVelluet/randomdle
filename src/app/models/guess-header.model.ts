import { Character } from "./swCharacter.model";

export interface GuessHeader {
    key: keyof Character;
    label: string;
}