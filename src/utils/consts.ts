import { ContextProps } from "./types";

export const PAGINATION_COUNTER = 3;

export const PAGINATION_SETTINGS_COUNTER = 7;

export const beaufort = (
  num: number,
  translationObject: ContextProps
): string => {
  const {
    calm,
    quietWind,
    lightBreeze,
    weakWind,
    moderateWind,
    freshBreeze,
    strongWind,
    strongerWind,
    veryStrongWind,
    storm,
    heavyStorm,
    cruelStorm,
    hurricane,
  } = translationObject;
  let string;
  if (num <= 0.2) {
    string = calm;
  } else if (num <= 1.5) {
    string = quietWind;
  } else if (num > 1.5 && num <= 3.3) {
    string = lightBreeze;
  } else if (num <= 3.3 && num <= 5.4) {
    string = weakWind;
  } else if (num <= 5.4 && num <= 7.9) {
    string = moderateWind;
  } else if (num <= 7.9 && num <= 10.7) {
    string = freshBreeze;
  } else if (num <= 10.7 && num <= 13.8) {
    string = strongWind;
  } else if (num <= 13.8 && num <= 17.1) {
    string = strongerWind;
  } else if (num <= 17.1 && num <= 20.7) {
    string = veryStrongWind;
  } else if (num <= 20.7 && num <= 24.4) {
    string = storm;
  } else if (num <= 24.4 && num <= 28.4) {
    string = heavyStorm;
  } else if (num <= 28.4 && num <= 32.6) {
    string = cruelStorm;
  } else {
    string = hurricane;
  }
  return string;
};

export const windDirectioon = (
  num: number,
  translationObject: ContextProps
): string => {
  const {
    NNE,
    NE,
    NEE,
    east,
    SEE,
    SE,
    SSE,
    south,
    SSW,
    SW,
    SWW,
    west,
    NWW,
    NW,
    NNW,
    north,
  } = translationObject;
  let string;
  if (num > 11 && num <= 33) {
    string = NNE;
  } else if (num > 33 && num <= 56) {
    string = NE;
  } else if (num > 56 && num <= 78) {
    string = NEE;
  } else if (num > 78 && num <= 101) {
    string = east;
  } else if (num > 101 && num <= 123) {
    string = SEE;
  } else if (num > 123 && num <= 146) {
    string = SE;
  } else if (num > 146 && num <= 168) {
    string = SSE;
  } else if (num > 168 && num <= 191) {
    string = south;
  } else if (num > 191 && num <= 213) {
    string = SSW;
  } else if (num > 213 && num <= 236) {
    string = SW;
  } else if (num > 236 && num <= 258) {
    string = SWW;
  } else if (num > 258 && num <= 281) {
    string = west;
  } else if (num > 281 && num <= 303) {
    string = NWW;
  } else if (num > 303 && num <= 326) {
    string = NW;
  } else if (num > 326 && num <= 348) {
    string = NNW;
  } else {
    string = north;
  }
  return string;
};
