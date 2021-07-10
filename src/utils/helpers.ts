export const beaufort = (num: number): string => {
  let string;
  if (num <= 0.2) {
    string = "Штиль";
  } else if (num <= 1.5) {
    string = "Тихий ветер";
  } else if (num > 1.5 && num <= 3.3) {
    string = "Лёгкий ветер";
  } else if (num <= 3.3 && num <= 5.4) {
    string = "Слабый ветер";
  } else if (num <= 5.4 && num <= 7.9) {
    string = "Умеренный ветер";
  } else if (num <= 7.9 && num <= 10.7) {
    string = "Свежий ветер";
  } else if (num <= 10.7 && num <= 13.8) {
    string = "Сильный ветер";
  } else if (num <= 13.8 && num <= 17.1) {
    string = "Крепкий ветер";
  } else if (num <= 17.1 && num <= 20.7) {
    string = "Очень крепкий ветер";
  } else if (num <= 20.7 && num <= 24.4) {
    string = "Шторм";
  } else if (num <= 24.4 && num <= 28.4) {
    string = "Сильный шторм";
  } else if (num <= 28.4 && num <= 32.6) {
    string = "Жестокий шторм";
  } else {
    string = "Ураган";
  }
  return string;
};

export const windDirectioon = (num: number): string => {
  let string;
  if (num > 11 && num <= 33) {
    string = "ССВ";
  } else if (num > 33 && num <= 56) {
    string = "СВ";
  } else if (num > 56 && num <= 78) {
    string = "ВВС";
  } else if (num > 78 && num <= 101) {
    string = "В";
  } else if (num > 101 && num <= 123) {
    string = "ВВЮ";
  } else if (num > 123 && num <= 146) {
    string = "ЮВ";
  } else if (num > 146 && num <= 168) {
    string = "ЮЮВ";
  } else if (num > 168 && num <= 191) {
    string = "Ю";
  } else if (num > 191 && num <= 213) {
    string = "ЮЮЗ";
  } else if (num > 213 && num <= 236) {
    string = "ЮЗ";
  } else if (num > 236 && num <= 258) {
    string = "ЗЗЮ";
  } else if (num > 258 && num <= 281) {
    string = "З";
  } else if (num > 281 && num <= 303) {
    string = "ЗЗС";
  } else if (num > 303 && num <= 326) {
    string = "СЗ";
  } else if (num > 326 && num <= 348) {
    string = "ССЗ";
  } else {
    string = "С";
  }
  return string;
};

export const devPoint = (temp: number, hum: number): number => {
  return Math.round(temp - (1 - hum / 100) / 0.05);
};
