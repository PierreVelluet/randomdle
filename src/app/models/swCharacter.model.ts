export interface SwCharacter {
  name: string;
  height: string;
  mass: string;
  gender: string;
  eye_color: string;
  homeworld: string;
  films: string[];
  species: string;
  status: string;
  [key: string]: string | string[];
}
