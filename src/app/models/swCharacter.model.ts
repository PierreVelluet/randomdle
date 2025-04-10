export interface Character {
  name: { value: string, status: string };
  height: { value: string, status: string };
  mass: { value: string, status: string };
  gender: { value: string, status: string };
  eye_color: { value: string, status: string };
  homeworld: { value: string, status: string };
  films: { value: string[], status: string };
  species: { value: string, status: string };
  [key: string]: { value: string | string[], status: string };
}
