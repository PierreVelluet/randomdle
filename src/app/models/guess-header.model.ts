import { SwCharacter } from "./swCharacter.model";

export interface GuessHeader {
    key: keyof SwCharacter;
    label: string;
}