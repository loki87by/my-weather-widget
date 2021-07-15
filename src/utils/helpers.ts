import { ResponceObject } from "./types";

export const paginationPagesArray = (num: number, arg: number): number[] => {
  const array = [];
  for (let i = 0; i < Math.ceil(num / arg); i++) {
    array.push(i);
  }
  return array;
};

export const devPoint = (temp: number, hum: number): number => {
  return Math.round(temp - (1 - hum / 100) / 0.05);
};

export const getNextElement = (
  cursorPosition: number,
  currentElement: HTMLElement
): Element | null => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter =
    currentElementCoord.y + currentElementCoord.height / 2;
  const nextElement =
    cursorPosition < currentElementCenter
      ? currentElement
      : currentElement.nextElementSibling;
  return nextElement;
};

export const itemsIdArray = (
  locationArray: ResponceObject[]
): ResponceObject[] => {
  const settingsItemsList = Array.from(
    document.querySelectorAll(".Weather-widget-app__settings-element")
  );
  const resultArray: ResponceObject[] = [];
  settingsItemsList.forEach((item) => {
    resultArray.push(locationArray[+item.id.replace(/\D+/gi, "")]);
  });
  return resultArray;
};

export const localSaveData = (data: ResponceObject[]): void => {
  const weatherData = JSON.stringify(data);
  localStorage.removeItem("weather-widget-data");
  localStorage.setItem("weather-widget-data", weatherData);
};
